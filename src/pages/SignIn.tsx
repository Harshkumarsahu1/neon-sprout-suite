import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90">
            <img src="/logo.svg" alt="Attack Capital" className="h-8 w-8" />
            <span className="text-lg font-semibold">Attack Capital</span>
          </Link>
          <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
            <a href="/">← Back to Home</a>
          </Button>
        </div>
      </header>

      <section className="mx-auto flex max-w-3xl items-center justify-center px-6 py-16">
        <Card className="w-full max-w-md border-slate-200">
          <CardContent className="p-6">
            <h1 className="mb-1 text-2xl font-semibold">Sign in</h1>
            <p className="mb-6 text-slate-600">Welcome back. Please enter your details.</p>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@firm.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">Sign in</Button>
            </form>

            <p className="mt-4 text-center text-sm text-slate-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-indigo-700 hover:underline">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default SignIn;
