import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-geometric.png';

export const HeroSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('insights');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-hero flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                We can help you...
              </h2>
              <h1 className="space-y-2">
                <div className="heading-hero">Grow,</div>
                <div className="heading-hero">Protect,</div>
                <div className="heading-hero">
                  <span className="text-accent">Innovate</span>
                </div>
              </h1>
              <p className="text-corporate max-w-lg">
                Empowering global businesses with innovative solutions, strategic growth initiatives, 
                and comprehensive protection frameworks for the digital age.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg">
                Discover Solutions
              </Button>
              <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg">
                Schedule Consultation
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={heroImage}
                alt="Abstract geometric design representing innovation and growth"
                className="w-full max-w-lg h-auto animate-float hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-accent opacity-10 rounded-2xl blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <button
            onClick={scrollToNextSection}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
          >
            <span className="text-sm font-medium">Discover More</span>
            <ArrowDown className="h-6 w-6 animate-bounce group-hover:text-accent" />
          </button>
        </div>
      </div>
    </section>
  );
};