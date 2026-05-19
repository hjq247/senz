#!/usr/bin/env bash
# 一键启动后端 API（默认端口 3050，启动前释放该端口）
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PORT="${PORT:-3050}"
APP_NAME="${PM2_APP_NAME:-senz-api}"
LOG_DIR="$ROOT/logs"

mkdir -p "$LOG_DIR"

if [[ -f "$ROOT/.env" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ROOT/.env"
  set +a
fi

export PORT
export HOST="${HOST:-0.0.0.0}"
export NODE_ENV="${NODE_ENV:-production}"

free_port() {
  local pids=""
  if command -v lsof >/dev/null 2>&1; then
    pids="$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)"
  elif command -v fuser >/dev/null 2>&1; then
    fuser -k "${PORT}/tcp" 2>/dev/null || true
    sleep 1
    return
  else
    echo "需要安装 lsof: sudo apt install -y lsof"
    exit 1
  fi

  if [[ -n "$pids" ]]; then
    echo "释放端口 ${PORT}，结束进程: ${pids}"
    # shellcheck disable=SC2086
    kill -9 $pids 2>/dev/null || true
    sleep 1
  else
    echo "端口 ${PORT} 未被占用"
  fi
}

if [[ ! -f "$ROOT/dist/index.js" ]]; then
  echo "未找到 dist/index.js，请先执行: pnpm build"
  exit 1
fi

free_port

if command -v pm2 >/dev/null 2>&1; then
  pm2 delete "$APP_NAME" 2>/dev/null || true
  pm2 start "$ROOT/dist/index.js" --name "$APP_NAME" --update-env
  pm2 save 2>/dev/null || true
  echo ""
  echo "已用 pm2 启动: ${APP_NAME}"
  echo "  端口: ${PORT}"
  echo "  健康检查: curl http://127.0.0.1:${PORT}/api/health"
  echo "  查看日志: pm2 logs ${APP_NAME}"
else
  PID_FILE="$ROOT/.api.pid"
  if [[ -f "$PID_FILE" ]]; then
    OLD_PID="$(cat "$PID_FILE")"
    kill -9 "$OLD_PID" 2>/dev/null || true
    rm -f "$PID_FILE"
  fi
  nohup node "$ROOT/dist/index.js" >>"$LOG_DIR/api.log" 2>&1 &
  echo $! >"$PID_FILE"
  echo ""
  echo "已后台启动 node (pid $(cat "$PID_FILE"))"
  echo "  端口: ${PORT}"
  echo "  日志: ${LOG_DIR}/api.log"
  echo "  健康检查: curl http://127.0.0.1:${PORT}/api/health"
fi
