import React, { useState } from 'react';
import styled from 'styled-components';

const About: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  const cards = [
    {
      title: "Innovation",
      description: "Push the boundaries of what's possible with cutting-edge technologies. Build something that hasn't been built before.",
      icon: "💡",
      color: "#FF5B65"
    },
    {
      title: "Collaboration",
      description: "Form teams with diverse skills. Collaborate with designers, developers, and problem solvers to create something amazing.",
      icon: "🤝",
      color: "#FFD100"
    },
    {
      title: "Learning",
      description: "Expand your skills through workshops and mentorship. Learn from industry experts and fellow participants.",
      icon: "🧠",
      color: "#5ECDE3"
    },
    {
      title: "Networking",
      description: "Connect with like-minded individuals, sponsors, and potential employers. Build relationships that last beyond the event.",
      icon: "🌐",
      color: "#31A8FF"
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
