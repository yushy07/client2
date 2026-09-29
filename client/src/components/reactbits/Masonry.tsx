'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Masonry.css';

export interface MasonryItem {
  id: string | number;
  img: string;
  url?: string;
  height?: number;
  title?: string;
  subtitle?: string;
}

export interface MasonryProps {
  items: MasonryItem[];
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  className?: string;
  onItemClick?: (item: MasonryItem) => void;
}

export const Masonry: React.FC<MasonryProps> = ({
  items = [],
  duration = 0.5,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 1.03,
  blurToFocus = true,
  className = '',
  onItemClick
}) => {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const initialY = animateFrom === 'bottom' ? 40 : animateFrom === 'top' ? -40 : 0;
  const initialX = animateFrom === 'left' ? -40 : animateFrom === 'right' ? 40 : 0;

  return (
    <div className={`reactbits-masonry ${className}`}>
      {items.map((item, index) => {
        const isHovered = hoveredId === item.id;
        const isOtherHovered = hoveredId !== null && !isHovered;

        return (
          <motion.div
            key={item.id}
            className="masonry-item-card"
            style={{
              height: item.height || 300,
              filter: blurToFocus && isOtherHovered ? 'blur(3px) brightness(0.7)' : 'none',
              opacity: isOtherHovered ? 0.7 : 1,
              transform: isHovered && scaleOnHover ? `scale(${hoverScale})` : 'scale(1)',
              zIndex: isHovered ? 20 : 1
            }}
            initial={{ opacity: 0, x: initialX, y: initialY }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration,
              delay: index * stagger,
              ease: [0.25, 1, 0.5, 1]
            }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              if (item.url) {
                window.location.href = item.url;
              }
              onItemClick?.(item);
            }}
          >
            <img src={item.img} alt={item.title || `Item ${index + 1}`} className="masonry-item-image" loading="lazy" />
            {(item.title || item.subtitle) && (
              <div className="masonry-item-overlay">
                <div>
                  {item.title && <h4 className="text-white font-semibold text-base">{item.title}</h4>}
                  {item.subtitle && <p className="text-white/70 text-xs mt-0.5">{item.subtitle}</p>}
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Masonry;
