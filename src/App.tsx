import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Simple loading component
const PageLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-fc-green border-t-transparent"></div>
      <p className="text-fc-green">Загрузка...</p>
    </div>
  </div>
);

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Team = lazy(() => import("./pages/Team"));
const News = lazy(() => import("./pages/News"));
const Matches = lazy(() => import("./pages/Matches"));
const Tournaments = lazy(() => import("./pages/Tournaments"));
const Media = lazy(() => import("./pages/Media"));
const Contacts = lazy(() => import("./pages/Contacts"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin routes
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const PlayersManagement = lazy(() => import("./pages/admin/PlayersManagement"));
const CoachesManagement = lazy(() => import("./pages/admin/CoachesManagement"));
const TeamsManagement = lazy(() => import("./pages/admin/TeamsManagement"));
const NewsManagement = lazy(() => import("./pages/admin/NewsManagement"));
const MediaManagement = lazy(() => import("./pages/admin/MediaManagement"));
const MatchesManagement = lazy(() => import("./pages/admin/MatchesManagement"));

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: 1000
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/fd">
          <Suspense fallback={<PageLoading />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/team" element={<Team />} />
              <Route path="/news" element={<News />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/tournaments/:id" element={<Tournaments />} />
              <Route path="/media" element={<Media />} />
              <Route path="/contacts" element={<Contacts />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<AdminHome />} />
                <Route path="players" element={<PlayersManagement />} />
                <Route path="coaches" element={<CoachesManagement />} />
                <Route path="teams" element={<TeamsManagement />} />
                <Route path="tournaments" element={<AdminHome />} />
                <Route path="news" element={<NewsManagement />} />
                <Route path="media" element={<MediaManagement />} />
                <Route path="matches" element={<MatchesManagement />} />
              </Route>

              {/* 404 and fallback routes */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
