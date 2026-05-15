import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SolutionDetail from "./pages/SolutionDetail";
import PlatformPage from "./pages/PlatformPage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import IntroSplash from "@/components/site/IntroSplash";

/** 旧「新闻中心」独立页已并入关于深至，保留 /news 链接兼容 */
function LegacyNewsRedirect() {
  if (typeof window !== "undefined") window.location.replace("/about#news");
  return null;
}

/** 仅处理带 #hash 的锚点滚动（无 hash 的滚顶由 PageShell / SolutionDetail 的 useLayoutEffect 负责） */
function ScrollMaster() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const raw = hash.replace("#", "");
    const id = ["stories", "csr", "media"].includes(raw) ? "news" : raw;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [location]);
  return null;
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/platform" component={PlatformPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/news" component={LegacyNewsRedirect} />
      <Route path="/careers" component={CareersPage} />
      <Route path="/solutions/patient">
        <SolutionDetail audience="patient" />
      </Route>
      <Route path="/solutions/doctor">
        <SolutionDetail audience="doctor" />
      </Route>
      <Route path="/solutions/industry">
        <SolutionDetail audience="industry" />
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollMaster />
          <IntroSplash />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
