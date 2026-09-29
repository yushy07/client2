import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { CategoryPage } from "./pages/CategoryPage";
import { ColourFinderPage } from "./pages/ColourFinderPage";
import { RoomInspirationPage } from "./pages/RoomInspirationPage";
import { SurfaceStudioPage } from "./pages/SurfaceStudioPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
