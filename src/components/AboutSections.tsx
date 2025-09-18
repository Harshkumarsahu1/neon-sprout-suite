import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Briefcase, TrendingUp, MapPin } from 'lucide-react';

export const AboutSections = () => {
  return (
    <div className="bg-background">
      {/* Our People Section */}
      <section className="section-standard bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-section">Our People</h2>
            <p className="text-corporate max-w-3xl mx-auto">
              Our team combines deep legal expertise with strategic capital insights, 
              delivering unparalleled value to our clients across complex legal and financial landscapes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="card-corporate text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Expert Partners</h3>
              <p className="text-muted-foreground">
                Seasoned legal professionals with decades of experience in corporate law, 
                mergers & acquisitions, and capital markets.
              </p>
            </div>
            
            <div className="card-corporate text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Strategic Advisors</h3>
              <p className="text-muted-foreground">
                Financial strategists who understand the intersection of legal compliance 
                and capital optimization for growth-stage companies.
              </p>
            </div>
            
            <div className="card-corporate text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Industry Specialists</h3>
              <p className="text-muted-foreground">
                Sector-specific expertise across technology, healthcare, finance, 
                and emerging markets with proven track records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-standard">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-section">What We Do</h2>
              <p className="text-corporate mb-8">
                Attack Capital provides comprehensive legal and financial services for companies 
                navigating complex growth, protection, and innovation challenges. Our integrated 
                approach ensures legal compliance while maximizing capital efficiency.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Legal Advisory</h3>
                    <p className="text-muted-foreground">
                      Corporate structuring, regulatory compliance, and risk management 
                      for high-growth companies and investment funds.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Capital Strategy</h3>
                    <p className="text-muted-foreground">
                      Fundraising support, investment structuring, and strategic 
                      capital allocation for optimal growth trajectories.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">M&A Excellence</h3>
                    <p className="text-muted-foreground">
                      End-to-end merger and acquisition support, from due diligence 
                      to post-transaction integration and optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-accent rounded-2xl p-12 text-center">
                <div className="bg-white/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Global Reach</h3>
                <p className="text-white/90 mb-6">
                  Operating across major financial centers with local expertise 
                  and global perspective.
                </p>
                <div className="grid grid-cols-2 gap-4 text-white/80 text-sm">
                  <div>New York</div>
                  <div>London</div>
                  <div>Singapore</div>
                  <div>Dubai</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Thinking Section */}
      <section className="section-standard bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-section">Our Thinking</h2>
            <p className="text-corporate max-w-3xl mx-auto">
              Insights and perspectives on the evolving landscape of legal technology, 
              capital markets, and strategic business transformation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="card-corporate hover-lift">
              <div className="w-full h-48 bg-gradient-accent rounded-xl mb-6"></div>
              <div className="text-sm text-accent font-medium mb-2">Legal Tech</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                The Future of Legal Due Diligence
              </h3>
              <p className="text-muted-foreground mb-4">
                How AI and automation are transforming the M&A due diligence process, 
                reducing timelines while improving accuracy.
              </p>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-accent hover:text-accent/80">
                Read More <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </article>
            
            <article className="card-corporate hover-lift">
              <div className="w-full h-48 bg-gradient-accent rounded-xl mb-6"></div>
              <div className="text-sm text-accent font-medium mb-2">Capital Markets</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Private Equity Trends 2024
              </h3>
              <p className="text-muted-foreground mb-4">
                Market dynamics, regulatory changes, and emerging opportunities 
                shaping the private equity landscape.
              </p>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-accent hover:text-accent/80">
                Read More <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </article>
            
            <article className="card-corporate hover-lift">
              <div className="w-full h-48 bg-gradient-accent rounded-xl mb-6"></div>
              <div className="text-sm text-accent font-medium mb-2">Strategy</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Cross-Border M&A Complexity
              </h3>
              <p className="text-muted-foreground mb-4">
                Navigating regulatory frameworks and cultural considerations 
                in international merger and acquisition transactions.
              </p>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-accent hover:text-accent/80">
                Read More <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </article>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="section-standard">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-section">Careers</h2>
              <p className="text-corporate mb-8">
                Join a team where legal excellence meets strategic innovation. 
                We're looking for ambitious professionals who thrive in dynamic, 
                high-growth environments and want to shape the future of legal and capital services.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Competitive compensation and equity packages</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Flexible remote and hybrid work arrangements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Professional development and continuing education</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Access to cutting-edge legal technology platforms</span>
                </div>
              </div>
              
              <Button className="btn-accent">
                View Open Positions <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="card-corporate">
                <h3 className="text-lg font-semibold text-primary mb-2">Senior Associate - M&A</h3>
                <p className="text-muted-foreground mb-4">
                  Lead complex merger and acquisition transactions for mid-market companies. 
                  5+ years experience required.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-accent font-medium">New York • Full-time</span>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              </div>
              
              <div className="card-corporate">
                <h3 className="text-lg font-semibold text-primary mb-2">Capital Markets Analyst</h3>
                <p className="text-muted-foreground mb-4">
                  Support fundraising and investment activities for growth-stage clients. 
                  Strong financial modeling skills essential.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-accent font-medium">London • Full-time</span>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              </div>
              
              <div className="card-corporate">
                <h3 className="text-lg font-semibold text-primary mb-2">Legal Technology Specialist</h3>
                <p className="text-muted-foreground mb-4">
                  Drive digital transformation initiatives and implement legal tech solutions. 
                  Technical background preferred.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-accent font-medium">Remote • Full-time</span>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};