import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import astronautAnimation from './Ania.json'; // Import the Lottie animation file

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set the target date to 30 days from now
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: astronautAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <section className="relative min-h-screen pt-24 sm:pt-28 overflow-hidden mesh-gradient flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 max-w-xl order-2 lg:order-1">
            <div className="space-y-2">
              <div className="inline-block animate-bounce-gentle">
                <span className="bg-white/90 text-hackathon-pink px-4 py-1 rounded-full text-sm font-medium">
                  Coming Soon
                </span>
              </div>
              <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
<span className="text-hackathon-blue">
    SemiColon <span className="text-hackathon-black">;</span>
  </span>                <span className="block text-hackathon-pink wavy-underline">Hackathon</span>
              </h1>
              <p className="text-slate-700 text-base md:text-lg lg:text-xl mt-4 leading-relaxed">
                Join us for an exciting 36-hour journey of innovation, creativity, and collaboration. Build something amazing with fellow developers!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:items-stretch">
              <Link to="/register" className="sm:flex-1">
                <PikachuButtonWrapper>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36px" height="36px">
                      <rect width={36} height={36} x={0} y={0} fill="#fdd835" />
                      <path fill="#e53935" d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z" />
                      <path fill="#b71c1c" d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z" />
                      <path fill="#212121" d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z" />
                      <path fill="#01579b" d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z" />
                      <path fill="#212121" d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z" />
                      <path fill="#81d4fa" d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z" />
                      <path fill="#212121" d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z" />
                      <path fill="#e1f5fe" d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z" />
                    </svg>
                    <span className="now">now!</span>
                    <span className="play">Register</span>
                  </button>
                </PikachuButtonWrapper>
              </Link>
              <div className="sm:flex-1">
                <RotatedButtonWrapper>
                  <button className="button">
                    <span>Learn More</span>
                  </button>
                </RotatedButtonWrapper>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 sm:gap-4" aria-label="Countdown to hackathon start">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="glass-card p-2 sm:p-4 rounded-xl text-center hover:transform hover:scale-105 transition-transform duration-300">
                  <div className="text-xl sm:text-3xl font-bold text-hackathon-blue mb-1">
                    {value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 capitalize">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[260px] xs:h-[300px] md:h-[480px] lg:h-[520px] w-full order-1 lg:order-2">
            {/* Lottie Animation replacing the SVG */}
            <LottieWrapper className="absolute inset-0 flex items-center justify-center">
              <Lottie 
                options={defaultOptions}
                height="100%"
                width="100%"
                isStopped={false}
                isPaused={false}
              />
              
              {/* Add a glowing effect behind the animation */}
              <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-hackathon-yellow rounded-full opacity-30 animate-pulse-glow"></div>
            </LottieWrapper>

            {/* Planet */}
            <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-hackathon-cyan rounded-full opacity-50 animate-bounce-gentle"></div>
            
            {/* Stars */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse-glow"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
  <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-hackathon-blue" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

// Styled component for the Pikachu button
const PikachuButtonWrapper = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 10px;
    color: white;
    text-shadow: 2px 2px rgb(116, 116, 116);
    text-transform: uppercase;
    cursor: pointer;
    border: solid 2px black;
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 17px;
    background-color: hsl(49deg 98% 60%);
    border-radius: 50px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
    width: 100%;
    height: 50px;
  }

  button:active {
    transform: scale(0.9);
    transition: all 100ms ease;
  }

  button svg {
    transition: all 0.5s ease;
    z-index: 2;
  }

  .play {
    transition: all 0.5s ease;
    transition-delay: 300ms;
  }

  button:hover svg {
    transform: scale(3) translate(50%);
  }

  .now {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    transition: all 0.5s ease;
    z-index: 2;
  }

  button:hover .now {
    transform: translateX(10px);
    transition-delay: 300ms;
  }

  button:hover .play {
    transform: translateX(200%);
    transition-delay: 300ms;
  }
`;

// Styled component for the rotated button
const RotatedButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .button {
    width: 150px;
    padding: 0;
    border: none;
    transform: rotate(5deg);
    transform-origin: center;
    font-family: "Gochi Hand", cursive;
    text-decoration: none;
    font-size: 15px;
    cursor: pointer;
    padding-bottom: 3px;
    border-radius: 5px;
    box-shadow: 0 2px 0 #494a4b;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background-color: #5cdb95;
  }

  .button span {
    background: #f1f5f8;
    display: block;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #494a4b;
  }

  .button:active {
    transform: translateY(5px);
    padding-bottom: 0px;
    outline: 0;
  }
`;

// Styled component for the Lottie animation container
const LottieWrapper = styled.div`
  position: relative;
  z-index: 1;
  
  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  animation: floating 5s ease-in-out infinite;
`;

export default Hero;