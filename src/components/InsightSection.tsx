import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import birdsImage from '@/assets/birds-teamwork.jpg';

export const InsightSection = () => {
  return (
    <section id="insights" className="section-standard bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src={birdsImage}
                alt="Flock of birds flying together representing teamwork and growth"
                className="w-full h-auto rounded-2xl shadow-card hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-subtle opacity-5 rounded-2xl"></div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <h2 className="heading-section">
                More than a numbers game.
              </h2>
              <p className="text-corporate text-xl leading-relaxed">
                Growth is a process. We know that from our own experience as a business, 
                having expanded globally while maintaining our core values and commitment to excellence. 
                Our proven methodologies combine data-driven insights with human-centered design 
                to create sustainable competitive advantages.
              </p>
              <p className="text-corporate">
                Whether you're scaling operations, entering new markets, or transforming 
                digitally, we provide the strategic guidance and tactical execution 
                needed to achieve your ambitious goals.
              </p>
            </div>

            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg group"
            >
              Explore our insights
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};