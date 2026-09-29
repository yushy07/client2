'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './BounceCards.css';

export interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  transformStyles?: string[];
  enableHover?: boolean;
}

const DEFAULT_TRANSFORMS = [
  'rotate(10deg) translate(-140px, -10px)',
  'rotate(4deg) translate(-70px, 10px)',
  'rotate(-2deg) translate(0px, -5px)',
  'rotate(-8deg) translate(70px, 15px)',
  'rotate(6deg) translate(140px, -10px)'
];

export const BounceCards: React.FC<BounceCardsProps> = ({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 300,
  animationDelay = 0.2,
  animationStagger = 0.08,
  transformStyles = DEFAULT_TRANSFORMS,
  enableHover = true
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cardWidth = Math.min(containerWidth * 0.45, 180);
  const cardHeight = cardWidth * 1.35;

  return (
    <div
      className={`bounce-cards-container ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, i) => {
        const defaultTransform = transformStyles[i % transformStyles.length];
        const isHovered = hoveredIdx === i;
        const hasHoveredOther = hoveredIdx !== null && !isHovered;

        return (
          <motion.div
            key={i}
            className="bounce-card"
            style={{
              width: cardWidth,
              height: cardHeight,
              zIndex: isHovered ? 40 : 10 + i
            }}
            initial={{ scale: 0, opacity: 0, y: 100 }}
            whileInView={{
              scale: 1,
              opacity: 1,
              y: 0
            }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: animationDelay + i * animationStagger
            }}
            animate={
              enableHover
                ? isHovered
                  ? { scale: 1.15, rotate: 0, y: -20 }
                  : hasHoveredOther
                    ? { scale: 0.92, opacity: 0.65 }
                    : {}
                : {}
            }
            onMouseEnter={() => enableHover && setHoveredIdx(i)}
            onMouseLeave={() => enableHover && setHoveredIdx(null)}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                transform: isHovered ? 'none' : defaultTransform,
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <img
                src={src}
                alt={`Bounce card ${i + 1}`}
                className="bounce-card-img"
                loading="lazy"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BounceCards;
