import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import professionalImage from '@/assets/professional-person.jpg';

export const RecruitmentSection = () => {
  return (
    <section className="section-standard bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <img
                src={professionalImage}
                alt="Professional team member representing career opportunities"
                className="w-full h-auto hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-accent opacity-5"></div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="heading-section">
                Join our global community
              </h2>
              <h3 className="text-3xl font-bold text-muted-foreground">
                Elevate your career. Define your Future.
              </h3>
              <p className="text-corporate text-xl leading-relaxed">
                Be part of a team that shapes the future of business transformation. 
                We offer unparalleled opportunities for professional growth, innovative projects, 
                and the chance to work with industry leaders across the globe.
              </p>
              <p className="text-corporate">
                From emerging talent to seasoned professionals, we provide a collaborative 
                environment where diverse perspectives drive breakthrough solutions and 
                meaningful impact.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg group"
              >
                Explore and apply now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">10k+</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};