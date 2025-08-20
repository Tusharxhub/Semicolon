import React, { useState } from 'react';
import styled from 'styled-components';

const About: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Ultra dynamic "crazy" hover / motion + particle burst (optimized for smoother 60fps)
  if (typeof document !== 'undefined' && !document.getElementById('crazy-card-styles')) {
    const style = document.createElement('style');
    style.id = 'crazy-card-styles';
    style.innerHTML = `
      #about .grid > div {
        position: relative;
        overflow: hidden;
        transform: perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0);
        transition: transform .25s cubic-bezier(.22,.61,.36,1), box-shadow .45s;
        will-change: transform;
        --glow: 0 0 0 rgba(255,255,255,0);
        backface-visibility:hidden;
        contain: layout paint style;
      }

      @media (prefers-reduced-motion: reduce) {
        #about .grid > div { transition:none !important; animation:none !important; }
        #about .grid > div:before,
        #about .grid > div:after { animation:none !important; }
      }

      #about .grid > div:hover {
        transform: perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
      }

      #about .grid > div:before {
        content:"";
        position:absolute;
        inset:-3px;
        padding:3px;
        border-radius:inherit;
        background:
          conic-gradient(from var(--grad-angle,0deg),
            #ff2a2a,
            #ff00c8,
            #3a82ff,
            #00ffa8,
            #ffef5e,
            #ff2a2a);
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: spinBorder 10s linear infinite;
        opacity:.8;
        pointer-events:none;
        filter: drop-shadow(0 0 4px rgba(255,255,255,.25));
      }

      #about .grid > div:after {
        content:"";
        position:absolute;
        inset:0;
        background:
          radial-gradient(circle at var(--pointer-x,50%) var(--pointer-y,50%),
            rgba(255,255,255,.32),
            rgba(255,255,255,0) 60%);
        mix-blend-mode: overlay;
        opacity:.55;
        transition: opacity .35s;
        pointer-events:none;
      }

      #about .grid > div:not(.crazy-hover):after { opacity:0; }

      #about .grid > div.crazy-hover {
        animation: wobble 1s ease-in-out;
        box-shadow:
          0 14px 28px -10px rgba(0,0,0,.32),
          0 0 0 1px rgba(255,255,255,.08),
          0 0 18px -4px rgba(255,0,200,.45);
      }

      #about .grid > div .content-box { position: relative; z-index: 2; }

      #about .grid > div .icon {
        display:inline-block;
        transition: transform .2s ease;
        transform:
          translate3d(var(--mx,0),var(--my,0), 55px)
          scale(var(--iconScale,1))
          rotate(var(--iconRot,0deg));
        filter: drop-shadow(0 3px 5px rgba(0,0,0,.35));
        will-change: transform;
      }

      #about .grid > div.crazy-hover .icon {
        animation: popSpin .6s cubic-bezier(.55,1.5,.4,1);
      }

      #about .grid > div .spark {
        position:absolute;
        top:50%; left:50%;
        width:10px; height:10px;
        background:
          radial-gradient(circle at 30% 30%, #fff, rgba(255,255,255,0) 70%);
        border-radius:50%;
        translate:-50% -50%;
        animation: spark .9s ease-out forwards;
        pointer-events:none;
        mix-blend-mode: screen;
        filter:
          drop-shadow(0 0 4px #fff)
          drop-shadow(0 0 8px #ff58ff);
      }

      @keyframes spark {
        0% { transform: translate(0,0) scale(1); opacity:1; }
        65% { opacity:1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity:0; }
      }

      @keyframes spinBorder { to { --grad-angle: 360deg; } }

      @keyframes wobble {
        0% { transform: perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(1); }
        35% { transform: perspective(1100px) rotateX(calc(var(--rx,0deg)*1.15)) rotateY(calc(var(--ry,0deg)*1.15)) scale(1.02); }
        55% { transform: perspective(1100px) rotateX(calc(var(--rx,0deg)*.85)) rotateY(calc(var(--ry,0deg)*.85)) scale(.995); }
        100% { transform: perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(1); }
      }

      @keyframes popSpin {
        0% { transform: translate3d(var(--mx,0),var(--my,0),55px) scale(.45) rotate(-25deg); }
        55% { transform: translate3d(var(--mx,0),var(--my,0),55px) scale(1.18) rotate(12deg); }
        80% { transform: translate3d(var(--mx,0),var(--my,0),55px) scale(.94) rotate(-6deg); }
        100% { transform: translate3d(var(--mx,0),var(--my,0),55px) scale(1) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // Optimized JS driven interactive tilt + particles (rAF throttled for 60fps)
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const els = Array.from(document.querySelectorAll('#about .grid > div')) as HTMLElement[];
    const cleanups: (() => void)[] = [];

    els.forEach(el => {
      let rect = el.getBoundingClientRect();
      let frame = 0;
      let px = 0, py = 0;
      let needsUpdate = false;

      const recalcRect = () => { rect = el.getBoundingClientRect(); };

      const apply = () => {
        frame = 0;
        const dx = px - 0.5;
        const dy = py - 0.5;
        el.style.setProperty('--rx', `${(-dy * 18).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(dx * 22).toFixed(2)}deg`);
        el.style.setProperty('--mx', `${dx * 36}px`);
        el.style.setProperty('--my', `${dy * 36}px`);
        el.style.setProperty('--pointer-x', `${(px * 100).toFixed(2)}%`);
        el.style.setProperty('--pointer-y', `${(py * 100).toFixed(2)}%`);
        needsUpdate = false;
      };

      const requestFrame = () => {
        if (!frame) frame = requestAnimationFrame(apply);
      };

      const handleMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        px = x / rect.width;
        py = y / rect.height;
        if (!needsUpdate) {
          needsUpdate = true;
          requestFrame();
        }
      };

      const handleEnter = () => {
        recalcRect();
        el.classList.add('crazy-hover');
        // particle burst (batch append for lower layout cost)
        const frag = document.createDocumentFragment();
        for (let i = 0; i < 14; i++) {
          const s = document.createElement('span');
          s.className = 'spark';
          const angle = (Math.PI * 2 * i) / 14 + (Math.random() * 0.4);
            const distance = 55 + Math.random() * 55;
          s.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
          s.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
          s.style.animationDelay = (Math.random() * 0.12).toString() + 's';
          frag.appendChild(s);
          setTimeout(() => s.remove(), 950);
        }
        el.appendChild(frag);
      };

      const handleLeave = () => {
        el.classList.remove('crazy-hover');
        el.style.removeProperty('--rx');
        el.style.removeProperty('--ry');
        el.style.removeProperty('--mx');
        el.style.removeProperty('--my');
      };

      const handleResize = () => recalcRect();

      el.addEventListener('mousemove', handleMove, { passive: true });
      el.addEventListener('mouseenter', handleEnter, { passive: true });
      el.addEventListener('mouseleave', handleLeave, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('scroll', handleResize, { passive: true });

      cleanups.push(() => {
        el.removeEventListener('mousemove', handleMove);
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
        if (frame) cancelAnimationFrame(frame);
      });
    });

    return () => cleanups.forEach(f => f());
  }, []);

  const cards = [
    {
      title: "Innovation",
      description: "Power-up ideas that feel like grabbing a Super Mushroom and leveling up instantly.",
      icon: "🍄",
      color: "linear-gradient(135deg,#ff2a2a 0%,#b30000 100%), repeating-linear-gradient(45deg,rgba(255,255,255,0.18)0 6px,rgba(0,0,0,0)6px 12px)"
    },
    {
      title: "Collaboration",
      description: "Break brick walls together—pair up, share 1‑UPs, and clear tough stages as a squad.",
      icon: "🧱",
      color: "repeating-linear-gradient(0deg,#8b4513 0 14px,#6a3210 14px 28px), repeating-linear-gradient(90deg,#9c5120 0 14px,#6a3210 14px 28px)"
    },
    {
      title: "Learning",
      description: "Collect stars of knowledge—each mechanic mastered is a new world unlocked.",
      icon: "⭐",
      color: "radial-gradient(circle at 30% 30%,#ffe87a 0%,#ffc400 60%,#c79200 100%), repeating-linear-gradient(45deg,rgba(255,255,255,0.4)0 4px,rgba(255,255,255,0)4px 8px)"
    },
    {
      title: "Networking",
      description: "Dive down warp pipes into new realms—meet mentors, sponsors, and future co‑founders.",
      icon: "🛠️",
      color: "linear-gradient(180deg,#0c8f35 0%,#087128 40%,#044d18 100%), repeating-linear-gradient(90deg,rgba(255,255,255,0.15)0 6px,rgba(0,0,0,0)6px 12px)"
    }
  ];

  return (
  <section id="about" className="py-16 md:py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-hackathon-lightblue text-hackathon-blue font-medium text-sm mb-4">
            About SemiColon ;
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            What makes our hackathon
            <span className="block text-hackathon-pink wavy-underline">Extraordinary</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Hover over the cards below to discover what makes HackX a unique and exciting hackathon experience that you won't want to miss!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12 md:mb-16">
          {cards.map((card, index) => (
            <StyledCard key={index} color={card.color}>
              <div className="content-box">
                <span className="icon">{card.icon}</span>
                <h3 className="title">{card.title}</h3>
                <p className="description">{card.description}</p>
              </div>
            </StyledCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const StyledCard = styled.div<{ color: string }>`
  width: 100%;
  min-height: 260px;
  @media (max-width: 640px) {
    min-height: 220px;
    padding: 16px;
  }
  background: ${({ color }) => color};
  border-radius: 12px;
  box-shadow: rgba(142, 142, 142, 0.3) 0px 30px 30px -10px;
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  transform-style: preserve-3d;
  position: relative;
  perspective: 1000px;
  cursor: pointer;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    transform: rotate3d(0.5, 1, 0, 20deg) scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 50px 50px -10px;
  }

  .content-box {
    color: white;
    transform: translateZ(50px);
  }

  .icon {
    font-size: 40px;
    display: block;
    margin-bottom: 10px;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
    @media (max-width: 640px) {
      font-size: 18px;
    }
  }

  .description {
    font-size: 14px;
    opacity: 0.9;
    @media (max-width: 640px) {
      font-size: 12px;
    }
  }
`;

export default About;
