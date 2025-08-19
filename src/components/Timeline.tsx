
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  day: 1 | 2;
  color: string;
}

const Timeline: React.FC = () => {
  const [activeEventIndex, setActiveEventIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollLeft(scrollLeft);
      setScrollMax(scrollWidth - clientWidth);
    }
  };

  // Initialize scroll state on mount and window resize
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scrollBy = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ 
        left: amount, 
        behavior: 'smooth' 
      });
    }
  };

  const events: TimelineEvent[] = [
    {
      time: "9:00 AM",
      title: "Registration & Check-in",
      description: "Check in, get your swag bag, and set up your workspace.",
      day: 1,
      color: "bg-hackathon-blue"
    },
    {
      time: "10:30 AM",
      title: "Opening Ceremony",
      description: "Welcome address, sponsor introductions, and rules explanation.",
      day: 1,
      color: "bg-hackathon-pink"
    },
    {
      time: "12:00 PM",
      title: "Team Formation",
      description: "Find team members and brainstorm project ideas.",
      day: 1,
      color: "bg-hackathon-yellow"
    },
    {
      time: "1:00 PM",
      title: "Hacking Begins!",
      description: "Start building your projects and bring your ideas to life.",
      day: 1,
      color: "bg-hackathon-cyan"
    },
    {
      time: "6:00 PM",
      title: "Dinner & Workshop",
      description: "Enjoy dinner and attend optional workshops on various technologies.",
      day: 1,
      color: "bg-hackathon-orange"
    },
    {
      time: "9:00 AM",
      title: "Breakfast",
      description: "Recharge with a nutritious breakfast to keep the momentum going.",
      day: 2,
      color: "bg-hackathon-blue"
    },
    {
      time: "12:00 PM",
      title: "Submission Deadline",
      description: "Finalize your projects and submit them for judging.",
      day: 2,
      color: "bg-hackathon-pink"
    },
    {
      time: "2:00 PM",
      title: "Project Presentations",
      description: "Present your projects to judges and other participants.",
      day: 2,
      color: "bg-hackathon-yellow"
    },
    {
      time: "4:00 PM",
      title: "Awards Ceremony",
      description: "Winners announcement and prize distribution.",
      day: 2,
      color: "bg-hackathon-cyan"
    }
  ];

  return (
  <section id="timeline" className="py-16 md:py-20 bg-hackathon-lightblue/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-hackathon-cyan/20 text-hackathon-blue font-medium text-sm mb-4">
            Event Schedule
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="block text-hackathon-blue">Timeline</span>
            <span className="block text-hackathon-pink wavy-underline">48 Hours of Innovation</span>
          </h2>
          <p className="text-yellow-400 text-base md:text-lg">
            Here's what to expect during our action-packed SemiColon hackathon weekend. Scroll through the timeline and click on events for more details.
          </p>
        </div>

        <div className="relative">
          {/* Day tabs */}
          <div className="flex max-w-3xl mx-auto mb-8 gap-4">
            <div className="flex-1 bg-white p-4 rounded-xl shadow-sm text-center animate-fade-in hover:shadow-md transition-shadow duration-300">
              <div className="text-xl font-bold text-hackathon-blue">Day 1</div>
              <div className="text-sm text-slate-500">Saturday</div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-xl shadow-sm text-center animate-fade-in hover:shadow-md transition-shadow duration-300" style={{animationDelay: '0.2s'}}>
              <div className="text-xl font-bold text-hackathon-blue">Day 2</div>
              <div className="text-sm text-slate-500">Sunday</div>
            </div>
          </div>
          
          {/* Timeline track */}
          <div
            className="timeline-track overflow-x-auto"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            <div className="min-w-max pb-8 pt-2 px-4">
              {/* Timeline rail */}
              <div className="relative">
                <div className="absolute top-16 left-0 right-0 h-1 bg-gray-200 rounded"></div>
                
                <div className="flex">
                  {events.map((event, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "relative px-3 min-w-[160px]",
                        event.day === 2 ? "mt-24" : ""
                      )}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div 
                        className={cn(
                          "absolute top-16 w-4 h-4 rounded-full transform -translate-x-2 -translate-y-1.5 cursor-pointer transition-all duration-300",
                          event.color,
                          activeEventIndex === index ? "scale-150 animate-pulse" : "scale-100"
                        )}
                        onClick={() => setActiveEventIndex(activeEventIndex === index ? null : index)}
                      ></div>
                      
                      <div className="text-sm font-medium mb-1">{event.time}</div>
                      
                      <div 
                        className={cn(
                          "bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-300 transform",
                          activeEventIndex === index ? "shadow-md border-t-4 scale-105" : "hover:shadow-md hover:scale-102",
                          activeEventIndex === index ? border(event.color) : "",
                          "animate-fade-in"
                        )}
                        style={{animationDelay: `${index * 0.15}s`}}
                        onClick={() => setActiveEventIndex(activeEventIndex === index ? null : index)}
                      >
                        <h4 className="font-bold text-hackathon-blue">{event.title}</h4>
                        <div 
                          className={cn(
                            "overflow-hidden text-sm text-slate-600 transition-all duration-300",
                            activeEventIndex === index ? "mt-2 max-h-20 opacity-100" : "max-h-0 opacity-0"
                          )}
                        >
                          {event.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicators - Fixed these to properly scroll left/right */}
          <div className="hidden sm:flex justify-between w-full absolute top-1/2 -translate-y-1/2 pointer-events-none">
            <button 
              className={cn(
                "pointer-events-auto ml-2 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg text-hackathon-blue transition-all duration-200",
                scrollLeft <= 10 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-hackathon-lightblue hover:scale-110"
              )}
              disabled={scrollLeft <= 10}
              onClick={() => scrollBy(-300)}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              className={cn(
                "pointer-events-auto mr-2 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg text-hackathon-blue transition-all duration-200",
                scrollLeft >= scrollMax - 10 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-hackathon-lightblue hover:scale-110"
              )}
              disabled={scrollLeft >= scrollMax - 10}
              onClick={() => scrollBy(300)}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const border = (color: string) => {
  switch (color) {
    case "bg-hackathon-blue": return "border-hackathon-blue";
    case "bg-hackathon-pink": return "border-hackathon-pink";
    case "bg-hackathon-yellow": return "border-hackathon-yellow";
    case "bg-hackathon-cyan": return "border-hackathon-cyan";
    case "bg-hackathon-orange": return "border-hackathon-orange";
    default: return "border-hackathon-blue";
  }
};

export default Timeline;
