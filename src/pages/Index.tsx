
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Tracks from '@/components/Tracks';
import Judges from '@/components/Judges';
import FAQ from '@/components/FAQ';
import Team from '@/components/Team';
import FloatingElements from '@/components/FloatingElements';
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
  <div className="relative min-h-screen home-bg">
      <FloatingElements />
      <Navbar />
      <main>
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
        <div className="reveal-section">
          <Judges />
        </div>
        <div className="reveal-section">
          <Team />
        </div>
        <div className="reveal-section">
          <FAQ />
        </div>
      </main>
      <footer className="bg-hackathon-blue text-white py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">SemiColon</h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">A 36-hour hackathon experience designed to inspire innovation and collaboration.</p>
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
              <p className="text-white/70 mb-2 text-sm md:text-base">Email: info@semicolon.dev</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors interactive-button">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors interactive-button">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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