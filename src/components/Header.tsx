import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' }
  ];

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold text-primary">Attack Capital</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </button>
              <button 
                onClick={() => openAuth('signin')}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openAuth('signin')}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Sign In
              </Button>
              <Button 
                size="sm"
                onClick={() => openAuth('signup')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => openAuth('signin')}
                  >
                    Sign In
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => openAuth('signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};