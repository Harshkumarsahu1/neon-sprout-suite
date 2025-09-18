import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side - Logo */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">AC</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Attack Capital</h3>
              <p className="text-primary-foreground/80 text-sm">Legal & Capital Solutions</p>
            </div>
          </div>

          {/* Right Side - Contact Button */}
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg group"
          >
            Contact us
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Attack Capital. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};