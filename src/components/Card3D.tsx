
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Card3DProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const Card3D: React.FC<Card3DProps> = ({ title, description, icon, color }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 10;
      const rotateXValue = ((centerY - e.clientY) / (rect.height / 2)) * 10;
      
      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <StyledWrapper $color={color} ref={cardRef} style={{ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}>
      <div className="cards">
        <figure className="card">
          {typeof icon === 'string' && icon.length <= 2 ? (
            <div className="card_icon_placeholder" style={{ backgroundColor: color }}>{icon}</div>
          ) : (
            <div className="card_icon">{icon}</div>
          )}
          <figcaption className="card_title">{title}</figcaption>
          <div className="card_description">{description}</div>
        </figure>
      </div>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  $color: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  height: 100%;
  width: 100%;
  transition: transform 0.3s ease;
  
  .cards {
    perspective: 1000px;
    height: 100%;
  }

  .card {
    width: 100%;
    height: 100%;
    background: #16161d;
    border: 2px solid ${props => props.$color || '#555555'};
    border-radius: 12px;
    padding: 1.5rem;
    position: relative;
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform .5s;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, ${props => props.$color}10 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s;
  }

  .card:hover::before {
    opacity: 0.3;
  }

  .card_icon_placeholder {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    transform-style: preserve-3d;
    transition: transform .5s;
    position: relative;
  }

  .card:hover .card_icon_placeholder {
    transform: translateZ(30px);
  }

  .card_icon {
    font-size: 1rem;
    color: ${props => props.$color || '#FFFFFF'};
    margin-bottom: 0.75rem;
    transform-style: preserve-3d;
    transition: transform .5s;
    position: relative;
  }

  .card:hover .card_icon {
    transform: translateZ(30px);
  }

  .card_title {
    color: #fff;
    position: relative;
    margin-bottom: 1rem;
    transform-style: preserve-3d;
    transition: transform .5s;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
  }

  .card:hover .card_title {
    transform: translateZ(50px);
  }

  .card_description {
    color: #cccccc;
    position: relative;
    font-size: 0.9rem;
    line-height: 1.5;
    transform-style: preserve-3d;
    transition: transform .5s;
  }

  .card:hover .card_description {
    transform: translateZ(25px);
  }
`;

export default Card3D;
