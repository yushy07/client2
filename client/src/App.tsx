import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, type ComponentType } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AdminReviewsPage = lazy(() => import("./pages/AdminReviewsPage"));
const lazyNamed = <T extends Record<K, ComponentType<any>>, K extends keyof T>(
  loader: () => Promise<T>,
  name: K,
) => lazy(() => loader().then((module) => ({ default: module[name] })));
const CategoryPage = lazyNamed(() => import("./pages/CategoryPage"), "CategoryPage");
const ColourFinderPage = lazyNamed(() => import("./pages/ColourFinderPage"), "ColourFinderPage");
const RoomInspirationPage = lazyNamed(() => import("./pages/RoomInspirationPage"), "RoomInspirationPage");
const SurfaceStudioPage = lazyNamed(() => import("./pages/SurfaceStudioPage"), "SurfaceStudioPage");
const AboutPage = lazyNamed(() => import("./pages/AboutPage"), "AboutPage");
const ContactPage = lazyNamed(() => import("./pages/ContactPage"), "ContactPage");

function RouteFallback() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading page"
      className="min-h-screen flex items-center justify-center bg-[#071311] text-white"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
        <span className="text-xs uppercase tracking-widest text-[#D4AF37]/80 font-sans font-medium">Jaymurti Traders</span>
      </div>
    </main>
  );
}

function Router() {
  return (
    <Switch>
      {/* Home */}
      <Route path="/" component={Home} />

      {/* Product Categories */}
      <Route path="/paint-products">
        {() => <CategoryPage routePath="/paint-products" />}
      </Route>
      <Route path="/interior-paints">
        {() => <CategoryPage routePath="/interior-paints" />}
      </Route>
      <Route path="/exterior-paints">
        {() => <CategoryPage routePath="/exterior-paints" />}
      </Route>
      <Route path="/waterproofing">
        {() => <CategoryPage routePath="/waterproofing" />}
      </Route>
      <Route path="/enamels">
        {() => <CategoryPage routePath="/enamels" />}
      </Route>
      <Route path="/wood-finishes">
        {() => <CategoryPage routePath="/wood-finishes" />}
      </Route>
      <Route path="/wall-textures">
        {() => <CategoryPage routePath="/wall-textures" />}
      </Route>
      <Route path="/wallpapers">
        {() => <CategoryPage routePath="/wallpapers" />}
      </Route>
      <Route path="/paint-tools">
        {() => <CategoryPage routePath="/paint-tools" />}
      </Route>

      {/* Colour Finder & Studios */}
      <Route path="/colour-finder" component={ColourFinderPage} />
      <Route path="/room-inspiration" component={RoomInspirationPage} />
      <Route path="/surface-studio" component={SurfaceStudioPage} />

      {/* Showroom & Contact */}
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />

      {/* Legal & 404 */}
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/admin/reviews" component={AdminReviewsPage} />
      <Route path="/404" component={NotFound} />

      {/* Final Fallback Route */}
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
          <Suspense fallback={<RouteFallback />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
