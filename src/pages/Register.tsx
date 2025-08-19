
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import AnimatedButton from '@/components/AnimatedButton';
import { toast } from '@/hooks/use-toast';
import { Star, Sparkles, Heart, Mail, User, Users, Code, Lightbulb } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teamName: '',
    teamSize: '1',
    trackInterest: '',
    experience: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (formStep === 0 && (!formData.name || !formData.email)) {
      toast({
        title: "Please fill all fields",
        description: "Name and email are required to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (formStep < 2) {
      setFormStep(prev => prev + 1);
    } else {
      // Submit form
      toast({
        title: "Registration successful!",
        description: "Welcome aboard! You're all set for the hackathon.",
        variant: "default",
      });
      navigate('/');
    }
  };

  const handlePrevStep = () => {
    if (formStep > 0) {
      setFormStep(prev => prev - 1);
    }
  };

  const FormStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {[0, 1, 2].map(step => (
        <div 
          key={step}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 
            ${formStep === step ? 'bg-hackathon-pink text-white scale-110' : 
            formStep > step ? 'bg-hackathon-cyan text-white' : 'bg-white border-2 border-hackathon-pink/30 text-hackathon-blue'}
          `}
        >
          {step === 0 && <User className="w-5 h-5" />}
          {step === 1 && <Users className="w-5 h-5" />}
          {step === 2 && <Code className="w-5 h-5" />}
          
          {formStep === step && (
            <span className="absolute -top-2 -right-2">
              <Sparkles className="w-4 h-4 text-hackathon-yellow animate-pulse-glow" />
            </span>
          )}
          
          {step < formStep && (
            <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <svg className="w-3 h-3 text-hackathon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
  <div className="relative min-h-screen mesh-gradient overflow-hidden pt-24 sm:pt-28">
      <FloatingElements className="opacity-70" />
      
      <div className="container mx-auto px-4 py-10 md:py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header with cute elements */}
          <div className="text-center mb-10 md:mb-12 relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hackathon-blue mb-3 tracking-tight relative inline-block leading-tight">
              Join the <span className="text-hackathon-pink wavy-underline">Adventure</span>
              <span className="absolute -top-4 -right-8">
                <Star className="w-8 h-8 text-hackathon-yellow animate-pulse-glow" />
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-6 max-w-lg mx-auto leading-relaxed">
              Ready to code, create, and collaborate? Register now to secure your spot in our hackathon!
            </p>
            
            <div className="absolute left-10 top-0 transform -rotate-12">
              <Heart className="w-6 h-6 text-hackathon-pink opacity-60 animate-float" />
            </div>
            <div className="absolute right-10 top-12 transform rotate-12">
              <Lightbulb className="w-6 h-6 text-hackathon-yellow opacity-70 animate-pulse-glow" />
            </div>
          </div>
          
          {/* Registration form with bouncy card effect */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-500 perspective-1000 relative border border-hackathon-lightblue/40">
            {/* Moving dots background for card */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    backgroundColor: ['#FF5B65', '#5ECDE3', '#FFD100'][i % 3],
                    animation: `floating ${3 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
            
            <div className="p-6 md:p-8 relative">
              <FormStepIndicator />
              
              <div className="overflow-hidden">
                {/* Step 1: Personal Info */}
                <div 
                  className={`transition-all duration-500 transform ${
                    formStep === 0 ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] absolute opacity-0'
                  }`}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-hackathon-blue mb-6 flex items-center">
                    <User className="mr-2 text-hackathon-pink" />
                    Personal Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-hackathon-blue/10 focus:border-hackathon-cyan focus:outline-none transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hackathon-blue/30 group-hover:text-hackathon-pink transition-colors duration-300">
                          <User className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-hackathon-blue/10 focus:border-hackathon-cyan focus:outline-none transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hackathon-blue/30 group-hover:text-hackathon-pink transition-colors duration-300">
                          <Mail className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2: Team Info */}
                <div 
                  className={`transition-all duration-500 transform ${
                    formStep === 1 ? 'translate-x-0 opacity-100' : formStep < 1 ? 'translate-x-[100%] absolute opacity-0' : 'translate-x-[-100%] absolute opacity-0'
                  }`}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-hackathon-blue mb-6 flex items-center">
                    <Users className="mr-2 text-hackathon-pink" />
                    Team Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="teamName">
                        Team Name
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-hackathon-blue/10 focus:border-hackathon-cyan focus:outline-none transition-all duration-300"
                        placeholder="Enter your team name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="teamSize">
                        Team Size
                      </label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-hackathon-blue/10 focus:border-hackathon-cyan focus:outline-none transition-all duration-300 bg-white"
                      >
                        <option value="1">Solo (1 person)</option>
                        <option value="2">Duo (2 people)</option>
                        <option value="3">Trio (3 people)</option>
                        <option value="4">Squad (4 people)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Step 3: Hackathon Info */}
                <div 
                  className={`transition-all duration-500 transform ${
                    formStep === 2 ? 'translate-x-0 opacity-100' : 'translate-x-[100%] absolute opacity-0'
                  }`}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-hackathon-blue mb-6 flex items-center">
                    <Code className="mr-2 text-hackathon-pink" />
                    Hackathon Details
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="trackInterest">
                        Preferred Track
                      </label>
                      <select
                        id="trackInterest"
                        name="trackInterest"
                        value={formData.trackInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-hackathon-blue/10 focus:border-hackathon-cyan focus:outline-none transition-all duration-300 bg-white"
                      >
                        <option value="">Select a track</option>
                        <option value="ai">AI & Machine Learning</option>
                        <option value="web3">Web3 & Blockchain</option>
                        <option value="health">Healthcare Tech</option>
                        <option value="game">Game Development</option>
                        <option value="sustainability">Environmental Sustainability</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="experience">
                        Hackathon Experience
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-hackathon-blue/10 focus:border-hackathon-cyan focus:outline-none transition-all duration-300"
                        placeholder="Tell us about your previous hackathon experience..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation buttons with cute animations */}
              <div className="mt-8 flex justify-between items-center gap-4">
                {formStep > 0 ? (
                  <AnimatedButton
                    variant="outline"
                    onClick={handlePrevStep}
                    className="px-6"
                  >
                    Back
                  </AnimatedButton>
                ) : (
                  <div></div> 
                )}
                
                <AnimatedButton
                  variant="primary"
                  onClick={handleNextStep}
                  withConfetti={formStep === 2}
                  className="px-6 md:px-8"
                >
                  {formStep < 2 ? 'Continue' : 'Register'}
                  {formStep < 2 && (
                    <svg className="w-5 h-5 ml-1 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {formStep === 2 && <Sparkles className="w-5 h-5 ml-1" />}
                </AnimatedButton>
              </div>
            </div>
          </div>
          
          {/* Cute elements at bottom of page */}
          <div className="text-center mt-8 opacity-70 text-xs md:text-sm">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-hackathon-pink"></div>
              <div className="w-2 h-2 rounded-full bg-hackathon-cyan"></div>
              <div className="w-2 h-2 rounded-full bg-hackathon-yellow"></div>
            </div>
            <p className="mt-4 text-gray-600">Join us for 48 hours of coding, fun, and innovation!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
