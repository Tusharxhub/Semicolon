
import React, { useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const FAQ = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Apply staggered animation
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    faqItems.forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      faqItems.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  const faqItems = [
    {
      question: "What is SemiColon Hackathon?",
      answer: "SemiColon is a 36-hour hackathon where participants collaborate to build innovative projects. It's an opportunity to learn, create, network, and have fun with fellow tech enthusiasts."
    },
    {
      question: "Who can participate?",
      answer: "SemiColon is open to students, professionals, and anyone interested in technology and innovation. Participants of all skill levels are welcome!"
    },
    {
      question: "Do I need to know how to code?",
      answer: "While coding skills are helpful, we welcome participants with various backgrounds. Teams need diverse skills including design, project management, and business development. Non-coders can contribute significantly!"
    },
    {
      question: "How do teams work?",
      answer: "Teams consist of 2-4 members. You can form your own team before the event or join a team during our team formation session. We'll help everyone find the right team!"
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, chargers, any devices you'll need for development, and your enthusiasm! We'll provide food, drinks, and a workspace with internet access."
    },
    {
      question: "Will there be prizes?",
      answer: "Yes! We have exciting prizes for winning teams across different categories. Details will be announced closer to the event date."
    },
    {
      question: "Is there a registration fee?",
      answer: "Registration is completely free! We want to make SemiColon accessible to everyone interested in participating."
    },
    {
      question: "Will food be provided?",
      answer: "Yes! We'll provide meals, snacks, and beverages throughout the 36-hour event to keep you energized and focused."
    }
  ];

  return (
    <section id="faq" ref={faqRef} className="py-16 md:py-20 bg-gradient-to-b from-white to-hackathon-lightblue/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12 transform transition-all duration-700 hover:scale-105">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-hackathon-blue leading-tight relative inline-block">
            Frequently Asked <span className="text-hackathon-pink">Questions</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackathon-blue via-hackathon-pink to-hackathon-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Everything you need to know about the SemiColon hackathon experience. 
            Can't find your answer? Feel free to contact us!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={cn(
                  "faq-item border border-hackathon-lightblue/50 rounded-xl overflow-hidden",
                  "bg-white shadow-sm hover:shadow-md transition-all duration-500 opacity-0 translate-y-10 focus-within:ring-2 focus-within:ring-hackathon-pink/40",
                  "hover:border-hackathon-pink/50"
                )}
              >
                <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 text-left font-medium text-hackathon-blue hover:text-hackathon-pink transition-colors duration-300">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 text-slate-600 text-sm md:text-base animate-slide-down">
                  <div className="transform transition-all duration-500 hover:translate-x-1 md:hover:translate-x-2 leading-relaxed">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-10 text-center">
            <p className="text-slate-600 mb-4 text-sm md:text-base">Still have questions?</p>
            <button className="bg-hackathon-blue text-white px-5 md:px-6 py-3 rounded-full hover:bg-hackathon-pink transition-colors duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;