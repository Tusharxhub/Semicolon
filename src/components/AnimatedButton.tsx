
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  withConfetti?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
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

  const sizeStyles = {
    sm: 'text-sm px-4 py-1.5',
    md: 'text-base px-6 py-2',
    lg: 'text-lg px-8 py-3',
  };

  const generateConfetti = () => {
    return Array.from({ length: 20 }).map((_, index) => {
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 3 + 2}s`;
      const size = `${Math.random() * 10 + 5}px`;
      const color = [
        'bg-hackathon-pink', 
        'bg-hackathon-yellow', 
        'bg-hackathon-blue',
        'bg-hackathon-cyan'
      ][Math.floor(Math.random() * 4)];
      
      return (
        <div
          key={index}
          className={`absolute rounded-full ${color}`}
          style={{
            left,
            top: '0',
            width: size,
            height: size,
            animation: `confetti ${animationDuration} ease-in-out forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      );
    });
  };

  return (
    <div className="relative inline-block">
      <button
        className={cn(
          'relative rounded-full transition-all duration-200 font-medium',
          'overflow-hidden',
          variantStyles[variant],
          sizeStyles[size],
          isPressed && 'transform scale-95',
          isHovered && 'transform scale-105',
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
      {showConfetti && <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {generateConfetti()}
      </div>}
    </div>
  );
};

export default AnimatedButton;
