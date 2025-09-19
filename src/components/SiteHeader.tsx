import React from 'react';
import { Button } from '@/components/ui/button';

const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Attack Capital" className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-wide text-slate-900">Attack Capital • Legal AI</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          <a href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Dashboard</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
            <a href="/signin">Sign in</a>
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <a href="/signup">Sign up</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
