import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSections } from "@/components/AboutSections";
import { InsightSection } from "@/components/InsightSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { RecruitmentSection } from "@/components/RecruitmentSection";
import { Footer } from "@/components/Footer";
import Dashboard from "./pages/Dashboard";
import Bots from "./pages/Bots";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LandingPage = () => (
  <>
    <Header />
    <main className="pt-16">
      <HeroSection />
      <AboutSections />
      <InsightSection />
      <CaseStudiesSection />
      <RecruitmentSection />
    </main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Bots />} />
            <Route path="bots" element={<Bots />} />
            <Route path="logs" element={<Logs />} />
            <Route path="analytics" element={<Logs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
