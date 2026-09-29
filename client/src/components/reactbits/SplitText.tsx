'use client';

import React, { useMemo } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // ms delay between items
  duration?: number; // duration of each item in seconds
  splitType?: 'chars' | 'words';
  from?: { opacity?: number; y?: number; x?: number; scale?: number };
  to?: { opacity?: number; y?: number; x?: number; scale?: number };
  textAlign?: 'left' | 'center' | 'right';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 50,
  duration = 0.6,
  splitType = 'chars',
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  textAlign = 'left',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const items = useMemo(() => {
    const textStr = typeof text === 'string' ? text : String(text || '');
    if (!textStr) return [];
    if (splitType === 'words') {
      return textStr.split(' ');
    }
    return textStr.split('');
  }, [text, splitType]);

  const Tag = motion[tag] as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <Tag
      className={`inline-block ${className}`}
      style={{ textAlign, willChange: 'transform, opacity' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delay / 1000
          }
        }
      }}
    >
      {items.map((item, index) => {
        const isSpace = item === ' ';
        return (
          <motion.span
            key={index}
            className="inline-block will-change-[transform,opacity]"
            variants={{
              hidden: from,
              visible: {
                ...to,
                transition: {
                  duration,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
            onAnimationComplete={
              index === items.length - 1 ? onLetterAnimationComplete : undefined
            }
          >
            {isSpace ? '\u00A0' : item}
            {splitType === 'words' && index < items.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Tag>
  );
};

export default SplitText;
