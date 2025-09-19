import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SiteHeader from '@/components/SiteHeader';

const Index = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      {/* Hero (minimal) */}
      <section className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-24">
          <div className="max-w-2xl">
            <Badge className="mb-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Legal Intake</Badge>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Capture case details with an AI receptionist
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Pre‑call context, in‑call case lookup, and post‑call logs—ready to use with OpenMic.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="bg-indigo-600 text-white hover:bg-indigo-700">
                <a href="/dashboard">Open Dashboard</a>
              </Button>
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                <a href="#features">See features</a>
              </Button>
            </div>
          </div>
          <Card className="w-full max-w-md border-slate-200">
            <CardContent className="p-6">
              <ul className="space-y-3 text-slate-700" id="features">
                <li>• Pre‑call webhook for client/case context</li>
                <li>• Custom function getCaseById during calls</li>
                <li>• Post‑call transcript, summary, questions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact / Join (concise) */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <Card className="border-slate-200">
          <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Join our community</h2>
              <p className="mt-1 text-slate-600">Get legal AI updates and best practices. No spam.</p>
            </div>
            <form className="flex w-full max-w-md gap-3 md:w-auto">
              <input
                type="email"
                required
                placeholder="you@firm.com"
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-slate-600">
          <p>© {new Date().getFullYear()} Attack Capital • Legal AI Intake</p>
          <div className="flex gap-6 text-sm">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
