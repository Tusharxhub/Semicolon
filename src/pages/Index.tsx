
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
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-white/70 mb-2 text-sm md:text-base">Email: auhackathon2025@gmail.com</p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/semicolon_2k25" className="text-white/70 hover:text-white transition-colors interactive-button">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors interactive-button">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4v13h-4V8zm7.5 0h3.8v1.84h.06c.53-.95 1.84-1.96 3.79-1.96 4.05 0 4.8 2.67 4.8 6.15V21h-4v-5.52c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93V21h-4V8z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors interactive-button">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
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