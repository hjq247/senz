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
import NewsPage from "./pages/NewsPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import IntroSplash from "@/components/site/IntroSplash";

/** 仅处理带 #hash 的锚点滚动（无 hash 的滚顶由 PageShell / SolutionDetail 的 useLayoutEffect 负责） */
function ScrollMaster() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
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
      <Route path="/news" component={NewsPage} />
      <Route path="/careers" component={CareersPage} />
      <Route path="/contact" component={ContactPage} />
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
