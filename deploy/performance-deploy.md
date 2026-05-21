# Senz Production Loading Checklist

## 1. Build and upload

```bash
pnpm build
```

Upload `dist/public` to the server path used by nginx, for example:

```text
/var/www/senz-website/dist/public
```

The files under `dist/public/assets` are Vite content-hashed. They are safe to cache for a year.

The files under `dist/public/manus-storage` must also use versioned names. If a video changes, create a new filename, for example:

```text
senz_hero_home_v13_720p_a1b2c3d4.mp4
```

Then update `client/src/lib/videos.ts` and rebuild. Do not replace an existing cached filename with different bytes.

## 2. Install nginx config

Copy `deploy/nginx-senz.conf` to the server:

```bash
sudo cp deploy/nginx-senz.conf /etc/nginx/sites-available/senz
sudo ln -sf /etc/nginx/sites-available/senz /etc/nginx/sites-enabled/senz
sudo nginx -t
sudo systemctl reload nginx
```

Edit these values first:

```nginx
server_name 124.222.202.18;
root /var/www/senz-website/dist/public;
```

## 3. Confirm headers

Run from your local machine:

```bash
curl -I http://124.222.202.18/
curl -I http://124.222.202.18/assets/index-xxxx.js
curl -I http://124.222.202.18/manus-storage/senz_hero_home_v12_lite_de2b59ad.mp4
```

Expected:

```text
/                         Cache-Control: no-cache
/assets/...               Cache-Control: public, max-age=31536000, immutable
/manus-storage/...        Cache-Control: public, max-age=31536000, immutable
video/mp4                 Accept-Ranges: bytes
JS/CSS/HTML               Content-Encoding: gzip or br when requested
```

To test gzip:

```bash
curl -H "Accept-Encoding: gzip" -I http://124.222.202.18/assets/index-xxxx.js
```

## 4. CDN recommendation

For fastest clear video startup, put `/manus-storage` on object storage + CDN.

Recommended layout:

```text
HTML/API:          http://124.222.202.18
JS/CSS:            http://124.222.202.18/assets/... or CDN
Images/videos:     https://cdn.your-domain.com/manus-storage/...
```

CDN cache rules:

```text
/manus-storage/*   cache 365 days
/assets/*          cache 365 days
/index.html        no-cache
```

If using Tencent Cloud COS + CDN, upload the contents of `dist/public/manus-storage` to COS and configure the CDN origin to that bucket. Then set your app media base URL to the CDN domain or rewrite `/manus-storage/` at nginx to the CDN origin.

## 5. Minimum video rules

Use clear but small hero video:

```text
H.264
720p
no audio
faststart
2-4 MB max for first-screen hero
```

Example ffmpeg command:

```bash
ffmpeg -i input.mp4 \
  -vf "scale=1280:-2,fps=30" \
  -an \
  -c:v libx264 \
  -preset medium \
  -crf 28 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  output_720p.mp4
```
