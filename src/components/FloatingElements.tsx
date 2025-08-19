
import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementsProps {
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ className }) => {
  const shapes = [
    { color: 'bg-hackathon-pink', size: 'w-16 h-16', shape: 'rounded-tr-3xl' },
    { color: 'bg-hackathon-yellow', size: 'w-12 h-12', shape: 'rounded-full' },
    { color: 'bg-hackathon-cyan', size: 'w-20 h-20', shape: 'shape-tl-full rounded-br-full' },
    { color: 'bg-hackathon-blue', size: 'w-14 h-14', shape: 'rounded-bl-3xl' },
    { color: 'bg-hackathon-orange', size: 'w-10 h-10', shape: 'triangle' },
    { color: 'bg-hackathon-pink', size: 'w-8 h-8', shape: 'star' },
  ];

  return (
  <div className={cn("fixed inset-0 pointer-events-none z-0 overflow-hidden", className)} aria-hidden="true">
      {shapes.map((shape, index) => {
        return (
          <div
            key={index}
            className={cn(
              shape.color,
              shape.size,
              shape.shape !== 'triangle' && shape.shape !== 'star' ? shape.shape : '',
              "absolute opacity-30 filter blur-sm transition-transform duration-3000",
              `floating floating-delay-${index % 4 + 1}`
            )}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              transition: 'transform 3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {shape.shape === 'triangle' && (
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-current border-r-[20px] border-r-transparent" />
            )}
            {shape.shape === 'star' && (
              <div className="star-shape relative">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d="M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z" />
                </svg>
              </div>
            )}
          </div>
        );
      })}

      {/* Fixed positioned decorative elements */}
  <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 rounded-full border-2 border-dashed border-hackathon-pink opacity-20 animate-spin-slow" />
  <div className="hidden sm:block absolute bottom-20 right-10 w-32 h-32 rounded-full border-2 border-dotted border-hackathon-yellow opacity-20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
  <div className="hidden sm:block absolute top-1/2 right-1/4 w-24 h-24 rounded-full border-2 border-dotted border-hackathon-cyan opacity-15 animate-bounce-gentle" />
      
      {/* Cute cloud elements */}
      <div className="absolute top-1/3 left-1/5 w-16 h-8 bg-white opacity-10 rounded-full before:content-[''] before:absolute before:top-[-50%] before:left-[25%] before:w-8 before:h-8 before:bg-white before:rounded-full after:content-[''] after:absolute after:top-[-40%] after:left-[60%] after:w-6 after:h-6 after:bg-white after:rounded-full floating floating-delay-2" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-hackathon-pink to-transparent opacity-20" />
      <div className="absolute bottom-0 right-1/3 w-px h-60 bg-gradient-to-t from-transparent via-hackathon-cyan to-transparent opacity-20" />
      <div className="absolute top-1/3 right-1/2 w-px h-40 bg-gradient-to-b from-transparent via-hackathon-yellow to-transparent opacity-20" />
      
      {/* Animated dots */}
      <div className="absolute top-1/4 right-20 w-3 h-3 rounded-full bg-hackathon-yellow opacity-40 animate-pulse-glow hover-float" />
      <div className="absolute bottom-1/3 left-40 w-2 h-2 rounded-full bg-hackathon-cyan opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 right-1/3 w-4 h-4 rounded-full bg-hackathon-pink opacity-25 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/5 w-2 h-2 rounded-full bg-hackathon-orange opacity-35 animate-pulse-glow" style={{ animationDelay: '2s' }} />
      
      {/* Stars animation effect */}
  {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full animate-blinking-stars"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            backgroundColor: ['#ffffff', '#FFD100', '#FF5B65', '#5ECDE3'][Math.floor(Math.random() * 4)],
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
