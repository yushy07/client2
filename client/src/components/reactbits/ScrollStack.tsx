'use client';

import React, { Children } from 'react';
import './ScrollStack.css';

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemScale?: number;
  itemStackDistance?: number;
  baseScale?: number;
}

export const ScrollStackItem: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className = '',
  style
}) => {
  return (
    <div className={`scroll-stack-card ${className}`} style={style}>
      {children}
    </div>
  );
};

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemScale = 0.04,
  itemStackDistance = 20,
  baseScale = 0.9
}) => {
  const childArray = Children.toArray(children);

  return (
    <div className={`scroll-stack-container ${className}`}>
      {childArray.map((child, index) => {
        const topOffset = 100 + index * itemStackDistance;
        const scaleVal = 1 - (childArray.length - 1 - index) * itemScale;

        return (
          <div
            key={index}
            style={{
              position: 'sticky',
              top: `${topOffset}px`,
              transform: `scale(${Math.max(baseScale, scaleVal)})`,
              zIndex: index + 1
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default ScrollStack;
