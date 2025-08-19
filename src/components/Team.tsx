import React, { useState, useEffect, useRef } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  }
};

type TeamCategory = {
  id: string;
  label: string;
  members: TeamMember[];
};

const Team = () => {
  const [activeCategory, setActiveCategory] = useState<string>("organizers");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const teamRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Open modal with animation
  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setTimeout(() => setIsModalOpen(true), 50);
  };
  
  // Close modal with animation
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };
  
  useEffect(() => {
    // Intersection observer for section entry animation
    const observeSection = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slideInUp');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      if (teamRef.current) {
        observer.observe(teamRef.current);
      }
      
      return () => {
        if (teamRef.current) {
          observer.unobserve(teamRef.current);
        }
      };
    };
    
    // Animation for team members when they come into view
    const animateTeamMembers = () => {
      const teamCards = document.querySelectorAll('.team-member-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Apply staggered animation
            setTimeout(() => {
              entry.target.classList.add('animate-fadeIn');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      teamCards.forEach(card => {
        observer.observe(card);
      });
      
      return () => {
        teamCards.forEach(card => {
          observer.unobserve(card);
        });
      };
    };
    
    // Animate tabs entry
    const animateTabs = () => {
      if (tabsRef.current) {
        tabsRef.current.classList.add('animate-tabsEntry');
      }
    };
    
    observeSection();
    animateTeamMembers();
    animateTabs();
    
    // Re-animate when tab changes
    const tabs = document.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
      tab.addEventListener('click', animateTeamMembers);
    });
    
    // Close modal when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('click', animateTeamMembers);
      });
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCategory]);
  
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  
  // Define animations
  useEffect(() => {
    // Add necessary styles for custom animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInUp {
        from {
          transform: translateY(50px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes tabsEntry {
        from {
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes pulseCard {
        0% {
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
      }
      
      @keyframes rotateIn {
        from {
          transform: rotate(-10deg) scale(0.9);
          opacity: 0;
        }
        to {
          transform: rotate(0) scale(1);
          opacity: 1;
        }
      }
      
      @keyframes modalEntry {
        from {
          transform: translateY(-50px) scale(0.9);
          opacity: 0;
        }
        to {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
      
      @keyframes modalExit {
        from {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        to {
          transform: translateY(-20px) scale(0.95);
          opacity: 0;
        }
      }
      
      @keyframes backdropEntry {
        from {
          backdrop-filter: blur(0);
          background-color: rgba(0, 0, 0, 0);
        }
        to {
          backdrop-filter: blur(5px);
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      
      @keyframes floatAvatar {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
        100% {
          transform: translateY(0);
        }
      }
      
      .animate-slideInUp {
        animation: slideInUp 0.8s ease forwards;
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.6s ease forwards;
      }
      
      .animate-tabsEntry {
        animation: tabsEntry 0.6s ease forwards;
      }
      
      .animate-rotateIn {
        animation: rotateIn 0.5s ease forwards;
      }
      
      .animate-modalEntry {
        animation: modalEntry 0.4s ease forwards;
      }
      
      .animate-modalExit {
        animation: modalExit 0.3s ease forwards;
      }
      
      .animate-backdropEntry {
        animation: backdropEntry 0.4s ease forwards;
      }
      
      .animate-floatAvatar {
        animation: floatAvatar 3s ease-in-out infinite;
      }
      
      .card-pulse:hover {
        animation: pulseCard 1.5s infinite;
      }
      
      .card-hover-3d {
        transition: transform 0.3s ease;
      }
      
      .float-social {
        transform: translateY(0);
        transition: transform 0.3s ease;
      }
      
      .float-social:hover {
        transform: translateY(-5px);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const teamCategories: TeamCategory[] = [
    {
      id: "organizers",
      label: "Organizers",
      members: [
        {
          name: "Alex Chen",
          role: "Lead Organizer",
          bio: "Tech enthusiast with 5+ years of event management experience. Alex has successfully organized over 20 hackathons and tech conferences across the country. His passion for community building and technology innovation drives the vision for SemiColon.",
          image: "/placeholder.svg",
          socials: {
            twitter: "#",
            linkedin: "#",
            github: "#"
          }
        },
        {
          name: "Samira Khan",
          role: "Program Director",
          bio: "Former hackathon champion turned community leader, Samira brings her unique perspective to program design. She ensures participants have the perfect balance of challenge, learning, and fun throughout the event.",
          image: "/placeholder.svg",
          socials: {
            twitter: "#",
            linkedin: "#"
          }
        },
        {
          name: "Marcus Johnson",
          role: "Operations Manager",
          bio: "Logistics expert making sure everything runs smoothly. From venue management to food service coordination, Marcus handles all the behind-the-scenes details that make the hackathon experience seamless for all participants.",
          image: "/placeholder.svg",
          socials: {
            linkedin: "#",
            github: "#"
          }
        },
        {
          name: "Leila Wong",
          role: "Community Manager",
          bio: "Passionate about building inclusive tech communities, Leila oversees all participant communications and social media engagement. She's dedicated to creating a welcoming environment where everyone feels empowered to contribute.",
          image: "/placeholder.svg",
          socials: {
            twitter: "#",
            linkedin: "#",
            github: "#"
          }
        }
      ]
    },
    {
      id: "tech",
      label: "Tech Team",
      members: [
        {
          name: "David Park",
          role: "Technical Lead",
          bio: "Full-stack developer and cloud architecture expert with over 8 years of experience. David designed the infrastructure powering the hackathon platform and manages all technical aspects of the event experience.",
          image: "/placeholder.svg",
          socials: {
            github: "#",
            linkedin: "#"
          }
        },
        {
          name: "Aisha Patel",
          role: "DevOps Engineer",
          bio: "Infrastructure specialist ensuring smooth deployment of all hackathon systems. Aisha's expertise in automation and system reliability keeps the technical foundation of SemiColon running without a hitch.",
          image: "/placeholder.svg",
          socials: {
            github: "#",
            twitter: "#"
          }
        },
        {
          name: "Carlos Rodriguez",
          role: "Frontend Engineer",
          bio: "UI/UX specialist with an eye for detail. Carlos crafted the intuitive interfaces that participants and organizers use throughout the hackathon, focusing on accessibility and user experience excellence.",
          image: "/placeholder.svg",
          socials: {
            github: "#",
            linkedin: "#"
          }
        }
      ]
    },
    {
      id: "management",
      label: "Management",
      members: [
        {
          name: "Grace Liu",
          role: "Executive Director",
          bio: "Visionary leader with extensive experience in tech innovation and event management. Grace oversees the strategic direction of SemiColon and maintains relationships with key stakeholders in the technology community.",
          image: "/placeholder.svg",
          socials: {
            linkedin: "#",
            twitter: "#"
          }
        },
        {
          name: "Omar Hassan",
          role: "Partnerships Manager",
          bio: "Building relationships with sponsors and community partners to ensure SemiColon has the resources needed for success. Omar's background in business development helps connect participants with valuable industry connections.",
          image: "/placeholder.svg",
          socials: {
            linkedin: "#"
          }
        }
      ]
    },
    {
      id: "sponsors",
      label: "Faculty Coordinator",
      members: [
        {
          name: "Julia Martinez",
          role: "Lead Sponsor Liaison",
          bio: "Connecting teams with resources and mentorship opportunities throughout the event. Julia works closely with industry partners to provide participants with the support they need to bring their ideas to life.",
          image: "/placeholder.svg",
          socials: {
            linkedin: "#",
            twitter: "#"
          }
        },
        {
          name: "Raj Patel",
          role: "Industry Mentor",
          bio: "Helping teams refine their projects for real-world impact. With 15 years of product management experience, Raj guides participants through the process of turning creative concepts into viable products.",
          image: "/placeholder.svg",
          socials: {
            linkedin: "#",
            github: "#"
          }
        },
        {
          name: "Sophia Kim",
          role: "Technical Mentor",
          bio: "AI specialist offering guidance on cutting-edge technology implementation. Sophia's research background helps teams integrate advanced machine learning capabilities into their hackathon projects.",
          image: "/placeholder.svg",
          socials: {
            github: "#",
            twitter: "#"
          }
        }
      ]
    }
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Animate the tab switch with a special effect
    const content = document.querySelector(`[data-state="active"][role="tabpanel"]`);
    if (content) {
      content.classList.add('animate-rotateIn');
      setTimeout(() => {
        content.classList.remove('animate-rotateIn');
      }, 500);
    }
    
    if (selectedMember) {
      closeModal();
    }
  };

  // Dynamic 3D tilt effect 
  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) scale(1.02)`;
  };
  
  const handleCardReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  // Member detail modal
  const MemberModal = () => {
    if (!selectedMember) return null;
    
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isModalOpen ? 'animate-backdropEntry' : 'animate-modalExit'}`}>
        <div 
          ref={modalRef}
          className={`bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${isModalOpen ? 'animate-modalEntry' : 'animate-modalExit'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="animate-floatAvatar">
                <Avatar className="w-full h-auto aspect-square rounded-md border-4 border-slate-200 shadow-md overflow-hidden">
                  <AvatarImage src={selectedMember.image} alt={selectedMember.name} className="object-cover" />
                  <AvatarFallback className="text-4xl bg-slate-700 text-white w-full h-full">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex justify-center space-x-4 mt-4">
                {selectedMember.socials.twitter && (
                  <a 
                    href={selectedMember.socials.twitter} 
                    className="text-slate-600 hover:text-blue-500 transition-colors float-social"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                )}
                {selectedMember.socials.linkedin && (
                  <a 
                    href={selectedMember.socials.linkedin} 
                    className="text-slate-600 hover:text-blue-700 transition-colors float-social"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {selectedMember.socials.github && (
                  <a 
                    href={selectedMember.socials.github} 
                    className="text-slate-600 hover:text-slate-900 transition-colors float-social"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{selectedMember.name}</h3>
                  <p className="text-lg font-medium text-slate-600 mb-4">{selectedMember.role}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 transition-transform transform hover:rotate-90 duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="border-t border-slate-200 my-4"></div>
              
              <div className="prose max-w-none">
                <h4 className="text-lg font-medium text-slate-800 mb-2">About</h4>
                <p className="text-slate-600">{selectedMember.bio}</p>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-slate-800 mb-2">Contact</h4>
                  <button 
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded mt-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onClick={() => alert(`Contact ${selectedMember.name} at contact@semicolon.dev`)}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
  <section id="team" ref={teamRef} className="py-16 md:py-20 bg-slate-50 opacity-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 text-slate-800 relative inline-block leading-tight">
            Meet the Team
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800 transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left"></div>
          </h2>
          <div className="w-24 h-1 bg-slate-800 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            The passionate people behind SemiColon who are working hard to create an amazing hackathon experience for you.
          </p>
        </div>

        <div ref={tabsRef} className="opacity-0">
          <Tabs defaultValue="organizers" className="w-full" onValueChange={handleCategoryChange}>
            <div className="flex justify-center mb-12">
              <TabsList className="bg-slate-200 p-1 rounded">
                {teamCategories.map(category => (
                  <TabsTrigger 
                    key={category.id}
                    value={category.id}
                    className={cn(
                      "rounded px-6 py-2 transition-all duration-300",
                      "data-[state=active]:bg-white data-[state=active]:shadow-sm",
                      "data-[state=active]:text-slate-800",
                      "hover:scale-110 transition-transform duration-300"
                    )}
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {teamCategories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {category.members.map((member, idx) => (
                    <Card 
                      key={idx} 
                      className="team-member-card opacity-0 translate-y-10 cursor-pointer transition-all duration-500 border-slate-200 card-hover-3d card-pulse"
                      onClick={() => openModal(member)}
                      onMouseMove={handleCardTilt}
                      onMouseLeave={handleCardReset}
                    >
                      <CardContent className="p-0 overflow-hidden">
                        <div className="relative overflow-hidden">
                          <div className="aspect-square overflow-hidden">
                            <Avatar className="w-full h-full rounded-none">
                              <AvatarImage src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                              <AvatarFallback className="w-full h-full text-3xl bg-slate-700 text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6 relative">
                          <h3 className="text-xl font-semibold text-slate-800 mb-1 transition-all duration-300 hover:translate-x-1">{member.name}</h3>
                          <p className="text-slate-600 font-medium mb-3">{member.role}</p>
                          <p className="text-slate-500 text-sm line-clamp-2">{member.bio}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex space-x-2">
                              {member.socials.twitter && (
                                <a 
                                  href={member.socials.twitter} 
                                  className="text-slate-400 hover:text-slate-700 transition-colors float-social" 
                                  onClick={e => e.stopPropagation()}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                  </svg>
                                </a>
                              )}
                              {member.socials.linkedin && (
                                <a 
                                  href={member.socials.linkedin} 
                                  className="text-slate-400 hover:text-slate-700 transition-colors float-social" 
                                  onClick={e => e.stopPropagation()}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11
                                    -11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                  </svg>
                                </a>
                              )}
                              {member.socials.github && (
                                <a 
                                  href={member.socials.github} 
                                  className="text-slate-400 hover:text-slate-700 transition-colors float-social" 
                                  onClick={e => e.stopPropagation()}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                  </svg>
                                </a>
                              )}
                            </div>
                            <button className="text-xs uppercase tracking-wider text-slate-600 hover:text-slate-900 font-semibold flex items-center space-x-1 transition-all duration-300 hover:translate-x-1">
                              <span>View</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      {selectedMember && <MemberModal />}
    </section>
  );
};

export default Team;