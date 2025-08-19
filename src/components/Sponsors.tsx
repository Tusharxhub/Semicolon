
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const sponsorLogos = [
  { name: 'TechCorp', color: 'bg-hackathon-blue' },
  { name: 'InnovateLabs', color: 'bg-hackathon-pink' },
  { name: 'CloudSolutions', color: 'bg-hackathon-yellow' },
  { name: 'QuantumAI', color: 'bg-hackathon-cyan' },
  { name: 'NextGenTech', color: 'bg-hackathon-orange' },
  { name: 'ByteForge', color: 'bg-hackathon-blue' },
  { name: 'CodeFusion', color: 'bg-hackathon-pink' },
  { name: 'DataSphere', color: 'bg-hackathon-yellow' },
  { name: 'VisionaryLabs', color: 'bg-hackathon-cyan' },
  { name: 'TechNova', color: 'bg-hackathon-orange' },
];

const Sponsors: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Magnetic button effect for sponsor cards
  useEffect(() => {
    const sponsors = document.querySelectorAll('.magnetic-button');
    
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      target.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    };
    
    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = 'translate(0px, 0px)';
    };
    
    sponsors.forEach((sponsor) => {
      sponsor.addEventListener('mousemove', handleMouseMove);
      sponsor.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      sponsors.forEach((sponsor) => {
        sponsor.removeEventListener('mousemove', handleMouseMove);
        sponsor.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <section id="sponsors" className="py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block leading-tight">
            Our Sponsors
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-hackathon-pink via-hackathon-yellow to-hackathon-cyan"></div>
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            These amazing partners make our hackathon possible.
          </p>
        </div>
        
        <div className="marquee-container py-8 md:py-10">
          <div className="marquee-content">
            {sponsorLogos.map((sponsor, index) => (
              <Card key={index} className="sponsor-card magnetic-button glass-card border-2 hover:border-hackathon-pink hover-float min-w-[180px] sm:min-w-[220px]">
                <CardContent className="flex flex-col items-center justify-center p-6 md:p-8 h-36 md:h-40 w-48 sm:w-56 md:w-64">
                  <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4", sponsor.color)}>
                    <span className="text-xl md:text-2xl font-bold text-white">{sponsor.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-sm md:text-base">{sponsor.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="marquee-container py-8 md:py-10 mt-4 md:mt-6">
          <div className="marquee-content" style={{ animationDirection: 'reverse' }}>
            {sponsorLogos.slice().reverse().map((sponsor, index) => (
              <Card key={index} className="sponsor-card magnetic-button glass-card border-2 hover:border-hackathon-cyan hover-float min-w-[180px] sm:min-w-[220px]">
                <CardContent className="flex flex-col items-center justify-center p-6 md:p-8 h-36 md:h-40 w-48 sm:w-56 md:w-64">
                  <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4", sponsor.color)}>
                    <span className="text-xl md:text-2xl font-bold text-white">{sponsor.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-sm md:text-base">{sponsor.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-12 left-6 w-20 h-20 rounded-full border-2 border-dashed border-hackathon-yellow opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-12 right-6 w-12 h-12 rounded-full border-2 border-dotted border-hackathon-pink opacity-20 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        
        {/* Interactive floating stars */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-hackathon-yellow rounded-full animate-blinking-stars"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
