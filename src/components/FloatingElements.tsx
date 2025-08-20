
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementsProps { className?: string }

const FloatingElements: React.FC<FloatingElementsProps> = ({ className }) => {
  const ref = useRef<{ shapes: any[]; stars: any[] }>();
  if (!ref.current) {
    const rand = () => Math.random();
    const shapes = [
      { color: 'bg-hackathon-pink', size: 'w-16 h-16', shape: 'rounded-tr-3xl' },
      { color: 'bg-hackathon-yellow', size: 'w-12 h-12', shape: 'rounded-full' },
      { color: 'bg-hackathon-cyan', size: 'w-20 h-20', shape: 'rounded-br-full rounded-tl-full' },
      { color: 'bg-hackathon-blue', size: 'w-14 h-14', shape: 'rounded-bl-3xl' },
      { color: 'bg-hackathon-orange', size: 'w-10 h-10', shape: 'triangle' },
      { color: 'bg-hackathon-pink', size: 'w-8 h-8', shape: 'star' }
    ].map(s => ({ ...s, top: `${rand() * 80 + 10}%`, left: `${rand() * 80 + 10}%`, rotate: `${rand() * 360}deg` }));
    const stars = Array.from({ length: 12 }).map(() => ({
      top: `${rand() * 100}%`, left: `${rand() * 100}%`, size: `${rand() * 2 + 1}px`,
      color: ['#ffffff', '#FFD100', '#FF5B65', '#5ECDE3'][Math.floor(rand() * 4)],
      delay: `${(rand() * 5).toFixed(2)}s`, opacity: (rand() * 0.5 + 0.2).toFixed(2)
    }));
    ref.current = { shapes, stars };
  }
  const { shapes, stars } = ref.current!;
  return (
    <div className={cn('fixed inset-0 pointer-events-none z-0 overflow-hidden', className)} aria-hidden='true'>
      {shapes.map((shape, i) => (
        <div key={i} className={cn(
          shape.color, shape.size,
          shape.shape !== 'triangle' && shape.shape !== 'star' ? shape.shape : '',
          'absolute opacity-30 filter blur-sm hidden xs:block will-change-transform floating',
          `floating-delay-${i % 4 + 1}`
        )} style={{ top: shape.top, left: shape.left, transform: `rotate(${shape.rotate})` }}>
          {shape.shape === 'triangle' && <div className='w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-current border-r-[20px] border-r-transparent' />}
          {shape.shape === 'star' && (<div className='star-shape relative'><svg viewBox='0 0 24 24' className='w-full h-full fill-current'><path d='M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z' /></svg></div>)}
        </div>
      ))}
      <div className='hidden sm:block absolute top-20 left-10 w-20 h-20 rounded-full border-2 border-dashed border-hackathon-pink opacity-20 animate-spin-slow' />
      <div className='hidden sm:block absolute bottom-20 right-10 w-32 h-32 rounded-full border-2 border-dotted border-hackathon-yellow opacity-20 animate-spin-slow' style={{ animationDirection: 'reverse' }} />
      <div className='hidden sm:block absolute top-1/2 right-1/4 w-24 h-24 rounded-full border-2 border-dotted border-hackathon-cyan opacity-15 animate-bounce-gentle' />
      <div className="hidden xs:block absolute top-1/3 left-1/5 w-16 h-8 bg-white opacity-10 rounded-full before:content-[''] before:absolute before:top-[-50%] before:left-[25%] before:w-8 before:h-8 before:bg-white before:rounded-full after:content-[''] after:absolute after:top-[-40%] after:left-[60%] after:w-6 after:h-6 after:bg-white after:rounded-full floating floating-delay-2" />
      <div className='absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-hackathon-pink to-transparent opacity-20' />
      <div className='absolute bottom-0 right-1/3 w-px h-60 bg-gradient-to-t from-transparent via-hackathon-cyan to-transparent opacity-20' />
      <div className='absolute top-1/3 right-1/2 w-px h-40 bg-gradient-to-b from-transparent via-hackathon-yellow to-transparent opacity-20' />
      <div className='absolute top-1/4 right-20 w-3 h-3 rounded-full bg-hackathon-yellow opacity-40 animate-pulse-glow hover-float' />
      <div className='absolute bottom-1/3 left-40 w-2 h-2 rounded-full bg-hackathon-cyan opacity-30 animate-pulse-glow' style={{ animationDelay: '1s' }} />
      <div className='absolute top-2/3 right-1/3 w-4 h-4 rounded-full bg-hackathon-pink opacity-25 animate-pulse-glow' style={{ animationDelay: '1.5s' }} />
      <div className='absolute top-1/2 left-1/5 w-2 h-2 rounded-full bg-hackathon-orange opacity-35 animate-pulse-glow' style={{ animationDelay: '2s' }} />
      {stars.map((s, i) => (
        <div key={i} className='absolute rounded-full animate-blinking-stars hidden xs:block'
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, backgroundColor: s.color, animationDelay: s.delay, opacity: s.opacity }} />
      ))}
    </div>
  );
};

export default FloatingElements;
