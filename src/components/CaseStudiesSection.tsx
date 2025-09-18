import { useState } from 'react';
import sportsImage from '@/assets/case-sports.jpg';
import financeImage from '@/assets/case-finance.jpg';
import techImage from '@/assets/case-technology.jpg';
import infrastructureImage from '@/assets/case-infrastructure.jpg';

const caseStudies = [
  {
    id: 1,
    title: 'Fueling global expansion for sports and talent giant',
    category: 'Sports & Entertainment',
    image: sportsImage,
    description: 'Strategic growth initiatives across 15 international markets'
  },
  {
    id: 2,
    title: 'Digital transformation in financial services',
    category: 'Financial Services',
    image: financeImage,
    description: 'End-to-end fintech solution driving 300% user growth'
  },
  {
    id: 3,
    title: 'Enterprise technology modernization',
    category: 'Technology',
    image: techImage,
    description: 'Cloud-first architecture supporting massive scale'
  },
  {
    id: 4,
    title: 'Smart infrastructure development',
    category: 'Infrastructure',
    image: infrastructureImage,
    description: 'Sustainable urban planning with IoT integration'
  }
];

export const CaseStudiesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-standard bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-section">Case Studies</h2>
          <p className="text-corporate mt-4 max-w-2xl mx-auto">
            Discover how we've helped industry leaders transform their businesses 
            and achieve unprecedented growth across diverse sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="card-case-study group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    {study.category}
                  </span>
                  <h3 className={`font-bold leading-tight transition-all duration-300 ${
                    hoveredIndex === index ? 'text-lg glow-text' : 'text-base'
                  }`}>
                    {study.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {study.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-accent hover:text-accent/80 font-semibold text-lg transition-colors">
            View All Case Studies →
          </button>
        </div>
      </div>
    </section>
  );
};