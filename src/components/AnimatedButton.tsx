
import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  withConfetti?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = React.memo(({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  withConfetti = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    
    if (withConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    
    setTimeout(() => setIsPressed(false), 150);
    
    if (onClick) {
      onClick();
    }
  };

  const variantStyles = {
    primary: 'bg-hackathon-pink text-white hover:shadow-lg hover:shadow-hackathon-pink/30',
    secondary: 'bg-hackathon-blue text-white hover:shadow-lg hover:shadow-hackathon-blue/30',
    outline: 'bg-transparent border-2 border-hackathon-pink text-hackathon-pink hover:bg-hackathon-pink/10',
  };

  // Responsive size styles
  const sizeStyles = {
    sm: 'text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5',
    md: 'text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2',
    lg: 'text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3',
  };

  const generateConfetti = useMemo(() => {
    if (!withConfetti) return null;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return null;
    return Array.from({ length: 14 }).map((_, index) => {
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 2 + 1.5}s`;
      const size = `${Math.random() * 8 + 4}px`;
      const color = [
        'bg-hackathon-pink', 
        'bg-hackathon-yellow', 
        'bg-hackathon-blue',
        'bg-hackathon-cyan'
      ][Math.floor(Math.random() * 4)];
      return (
        <div
          key={index}
          className={`absolute rounded-full ${color} will-change-transform will-change-opacity`}
          style={{
            left,
            top: '0',
            width: size,
            height: size,
            animation: `confetti ${animationDuration} ease-in-out forwards`,
            animationDelay: `${Math.random() * 0.4}s`,
          }}
        />
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfetti]);

  return (
  <div className="relative inline-block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg will-change-transform">
      <button
        className={cn(
      'relative rounded-full transition-colors duration-200 font-medium w-full select-none',
          'overflow-hidden',
          variantStyles[variant],
          sizeStyles[size],
      // scale only for capable devices (avoid layout shift)
      !window.matchMedia?.('(prefers-reduced-motion: reduce)') && isPressed ? 'translate-y-px' : '',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        <span 
          className={cn(
            'absolute inset-0 bg-white opacity-0 transition-opacity duration-300',
            isPressed && 'animate-pulse opacity-20'
          )} 
        />
      </button>
    {showConfetti && generateConfetti && <div className="absolute inset-0 overflow-hidden pointer-events-none">{generateConfetti}</div>}
    </div>
  );
});

export default AnimatedButton;
