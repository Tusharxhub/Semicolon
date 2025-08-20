
import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Route-level code splitting
const Index = lazy(() => import(/* webpackPrefetch: true */ './pages/Index'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LearnMore = lazy(() => import('./pages/LearnMore'));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Web Vitals logging (basic)
    if ('PerformanceObserver' in window) {
      try {
        const vitals = [
          { name: 'largest-contentful-paint', entryType: 'largest-contentful-paint' },
          { name: 'layout-shift', entryType: 'layout-shift' },
          { name: 'event', entryType: 'event' }
        ];
        vitals.forEach(v => {
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
              if ((entry as any).hadRecentInput) return; // ignore CLS after user input
              // Minimal console logging; could be sent to analytics endpoint
              // eslint-disable-next-line no-console
              console.log('[WebVital]', v.name, entry);
            });
          });
          observer.observe({ type: v.entryType as any, buffered: true });
        });
      } catch {}
    }

    // Respect prefers-reduced-motion by pausing certain animations via a class
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      document.documentElement.classList.toggle('prm', media.matches);
    };
    apply();
    media.addEventListener('change', apply, { passive: true });
    return () => media.removeEventListener('change', apply);
  }, []);

  // Idle prefetch for secondary routes (improves subsequent navigation speed)
  useEffect(() => {
    const idle = (cb: () => void) => (window.requestIdleCallback ? (window as any).requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 400));
    const id = idle(() => {
      // Fire & forget route code preloads
      import('./pages/Register');
      import('./pages/LearnMore');
      import('./pages/NotFound');
    });
    return () => (window.cancelIdleCallback ? (window as any).cancelIdleCallback(id) : clearTimeout(id));
  }, []);

  // Prewarm below‑the‑fold heavy homepage sections once index route mounts (executed here so it runs for initial landing path '/')
  useEffect(() => {
    if (location.pathname === '/') {
      const t = setTimeout(() => {
        import('@/components/Judges');
        import('@/components/Team');
        import('@/components/FAQ');
      }, 1200); // small delay to avoid competing with initial render
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-sm text-slate-500 animate-pulse">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/learn" element={<LearnMore />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
