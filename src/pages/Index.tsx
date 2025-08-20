
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Tracks from '@/components/Tracks';
import FloatingElements from '@/components/FloatingElements';
import { Suspense, lazy } from 'react';

// Lazy load heavier below-the-fold sections
const Judges = lazy(() => import('@/components/Judges'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Team = lazy(() => import('@/components/Team'));
import { toast } from '@/hooks/use-toast';

const Index = () => {
  useEffect(() => {
    // Show welcome toast
    toast({
      title: "Welcome to SemiColon!",
      description: "Scroll down to explore our hackathon experience",
      variant: "default",
    });

    // Add hover interactions for better interactivity
    const interactiveElements = document.querySelectorAll('.interactive-button');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('hover:scale-105', 'transition-transform');
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove('hover:scale-105');
      });
    });

    // Add fade-in animations on scroll with IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    const revealElements = document.querySelectorAll('.reveal-section');
    revealElements.forEach(element => {
      element.classList.add('opacity-0');
      observer.observe(element);
    });
    
    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  const openNewTab = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback
      window.location.href = url;
    }
  };

  return (
  <div className="relative min-h-screen home-bg no-scroll-x">
      <FloatingElements />
      <Navbar />
  <main className="overflow-x-hidden">
        <Hero />
        <div className="reveal-section">
          <About />
        </div>
        <div className="reveal-section">
          <Timeline />
        </div>
        <div className="reveal-section">
          <Tracks />
        </div>
        <Suspense fallback={<div className="text-center py-10 text-sm text-slate-400">Loading sections...</div>}>
          <div className="reveal-section">
            <Judges />
          </div>
          <div className="reveal-section">
            <Team />
          </div>
          <div className="reveal-section">
            <FAQ />
          </div>
        </Suspense>
      </main>
      <footer className="bg-hackathon-blue text-white py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">SemiColon</h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">A 24-hour hackathon experience designed to inspire innovation and collaboration.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li><a href="#about" className="text-white/70 hover:text-white transition-colors">About</a></li>
                <li><a href="#timeline" className="text-white/70 hover:text-white transition-colors">Timeline</a></li>
                <li><a href="#tracks" className="text-white/70 hover:text-white transition-colors">Tracks</a></li>
                <li><a href="#judges" className="text-white/70 hover:text-white transition-colors">Judges</a></li>
                <li><a href="#team" className="text-white/70 hover:text-white transition-colors">Team</a></li>
                <li><a href="#faq" className="text-white/70 hover:text-white transition-colors">FAQ</a></li>
                
              </ul>
            </div>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 leading-none tracking-tight bg-gradient-to-r from-white via-hackathon-pink to-hackathon-yellow bg-clip-text text-transparent drop-shadow-sm">Contact</h3>
              <p className="text-white/60 text-sm md:text-base mb-6 max-w-xs">Reach out or follow us. We answer fast & love collaborations.</p>
              <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-sm">
                <a href="https://www.instagram.com/semicolon_2k25" aria-label="Instagram" target="_blank" rel="noopener noreferrer" onClick={(e)=>openNewTab(e,'https://www.instagram.com/semicolon_2k25')} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center w-14 h-14 md:w-16 md:h-16 text-white/80 hover:text-white hover:border-hackathon-pink/50 transition-all duration-300 hover:shadow-lg hover:shadow-hackathon-pink/30 hover:scale-105">
                  <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/semi-colon-92993137b/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" onClick={(e)=>openNewTab(e,'https://www.linkedin.com/in/semi-colon-92993137b/')} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center w-14 h-14 md:w-16 md:h-16 text-white/80 hover:text-white hover:border-hackathon-pink/50 transition-all duration-300 hover:shadow-lg hover:shadow-hackathon-pink/30 hover:scale-105">
                  <svg className="w-8 h-8 md:w-9 md:h-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4v13h-4V8zm7.5 0h3.8v1.84h.06c.53-.95 1.84-1.96 3.79-1.96 4.05 0 4.8 2.67 4.8 6.15V21h-4v-5.52c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93V21h-4V8z"/></svg>
                </a>
                <a href="mailto:auhackathon2025@gmail.com?subject=SemiColon%20Hackathon%20Inquiry&body=Hi%20SemiColon%20Team,%0D%0A%0D%0AI'd%20like%20to%20learn%20more%20about%20...%0D%0A%0D%0AThanks,%0D%0A" aria-label="Email" target="_blank" rel="noopener noreferrer" onClick={(e)=>openNewTab(e,'mailto:auhackathon2025@gmail.com?subject=SemiColon%20Hackathon%20Inquiry&body=Hi%20SemiColon%20Team,%0D%0A%0D%0AI\'d%20like%20to%20learn%20more%20about%20...%0D%0A%0D%0AThanks,%0D%0A')} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center w-14 h-14 md:w-16 md:h-16 text-white/80 hover:text-white hover:border-hackathon-pink/50 transition-all duration-300 hover:shadow-lg hover:shadow-hackathon-pink/30 hover:scale-105">
                  <svg className="w-9 h-9 md:w-11 md:h-11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" ry="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 11.3 13a1 1 0 0 0 1.4 0L21 7.5" /></svg>
                </a>
                {/* <a href="mailto:auhackathon2025@gmail.com" className="col-span-3 mt-2 md:mt-3 group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-hackathon-pink/50 transition-colors text-xs md:text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" ry="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 11.3 13a1 1 0 0 0 1.4 0L21 7.5" /></svg>
                  <span>auhackathon2025@gmail.com</span>
                </a> */}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs md:text-sm text-white/50">
            © 2025 SemiColon. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;