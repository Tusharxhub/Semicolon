import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Judge {
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
}

const Judges: React.FC = () => {
  const judges: Judge[] = [
    {
      name: "Alex Johnson",
      role: "CTO",
      company: "TechInnovate",
      image: "/placeholder.svg",
      bio: "Alex has over 15 years of experience in the tech industry and has been a judge for numerous hackathons. They specialize in AI and cloud architecture."
    },
    {
      name: "Samantha Park",
      role: "Founder",
      company: "EcoSolutions",
      image: "/placeholder.svg",
      bio: "Samantha is a serial entrepreneur who has founded three successful startups in the sustainability space. She brings a unique perspective on scalable eco-friendly solutions."
    },
    {
      name: "Michael Chen",
      role: "Lead Engineer",
      company: "BlockchainX",
      image: "/placeholder.svg",
      bio: "Michael is a blockchain expert who has contributed to several open-source projects. He's passionate about decentralized applications and Web3 technology."
    },
    {
      name: "Olivia Williams",
      role: "Design Director",
      company: "UXMasters",
      image: "/placeholder.svg",
      bio: "Olivia has designed award-winning user experiences for global brands. She'll be evaluating projects based on their usability and design innovation."
    },
    {
      name: "David Kwame",
      role: "VC Partner",
      company: "Future Fund",
      image: "/placeholder.svg",
      bio: "David is a venture capitalist specializing in early-stage tech startups. He has a keen eye for identifying solutions with market potential."
    },
    {
      name: "Priya Mehta",
      role: "AI Research Lead",
      company: "DataSense",
      image: "/placeholder.svg",
      bio: "Priya leads AI research at DataSense and has published numerous papers on machine learning. She'll be looking for technically innovative solutions."
    }
  ];

  return (
  <section id="judges" className="py-16 md:py-20 bg-hackathon-lightblue/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-hackathon-pink/20 text-hackathon-blue font-medium text-sm mb-4">
            Meet The Experts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="block text-hackathon-blue">Our Distinguished</span>
            <span className="block text-hackathon-pink wavy-underline">Judges & Mentors</span>
          </h2>
          <p className="text-yellow-400 text-base md:text-lg">
            Hover over the cards to learn more about our expert judges and mentors who will be evaluating your projects and providing guidance.
          </p>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {judges.map((judge, index) => (
            <FlipCard key={index}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={judge.image} alt={judge.name} className="w-24 h-24 rounded-full mb-4" />
                  <h3 className="font-bold text-xl">{judge.name}</h3>
                  <p>{judge.role} at {judge.company}</p>
                </div>
                <div className="flip-card-back">
                  <p className="text-sm">{judge.bio}</p>
                </div>
              </div>
            </FlipCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FlipCard = styled.div`
  perspective: 1000px;
  border-radius: 10px;
  padding: 5px;
  background: linear-gradient(45deg, #ff9f5b, #ff3b77, #6b57ff, #3bb4ff);
  background-size: 300% 300%;
  animation: ${gradientAnimation} 3s linear infinite;
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 300px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  &:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .flip-card-front {
    background: #fff;
    color: #000;
  }
  .flip-card-back {
    background: #ff9f5b;
    color: white;
    transform: rotateY(180deg);
  }
`;

export default Judges;
