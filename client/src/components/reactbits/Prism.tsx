'use client';

import React, { useEffect, useRef } from 'react';
import './Prism.css';

export interface PrismProps {
  height?: number;
  baseWidth?: number;
  animationType?: 'rotate' | 'hover' | '3drotate';
  glow?: number;
  noise?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  hoverStrength?: number;
  inertia?: number;
  bloom?: number;
  timeScale?: number;
  className?: string;
}

const VERTEX_SHADER = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform vec2 uResolution;
uniform float uGlow;
uniform float uNoise;
uniform float uHueShift;
uniform float uColorFreq;
uniform vec2 uPointer;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.0, 0.33, 0.67) + uHueShift;
  return a + b * cos(6.28318 * (c * t * uColorFreq + d));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
  
  // Angle & distance for triangular prism raymarch feel
  float angle = atan(uv.y, uv.x) + uTime * 0.4 + uPointer.x * 0.5;
  float dist = length(uv);

  // 3-fold prism symmetry
  float tri = cos(floor(0.5 + angle / 2.0943951) * 2.0943951 - angle) * dist;
  
  // Caustic prism refraction rings
  float ring = sin(tri * 8.0 - uTime * 1.5);
  ring = abs(ring);
  ring = pow(0.08 / max(ring, 0.001), 1.2) * uGlow;

  vec3 col = palette(dist + ring * 0.2 + uTime * 0.1);
  col *= ring;

  // Subtle film grain noise
  if (uNoise > 0.0) {
    float n = (random(uv + fract(uTime)) - 0.5) * uNoise * 0.15;
    col += n;
  }

  float alpha = clamp(length(col) * 0.9, 0.0, 1.0);
  fragColor = vec4(col, alpha);
}
`;

export const Prism: React.FC<PrismProps> = ({
  glow = 1.2,
  noise = 0.3,
  hueShift = 0.1,
  colorFrequency = 1.0,
  timeScale = 0.6,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true });
    if (!gl) return;

    // Compile shader helper
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Quad geometry
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(prog, 'uTime');
    const uResLoc = gl.getUniformLocation(prog, 'uResolution');
    const uGlowLoc = gl.getUniformLocation(prog, 'uGlow');
    const uNoiseLoc = gl.getUniformLocation(prog, 'uNoise');
    const uHueLoc = gl.getUniformLocation(prog, 'uHueShift');
    const uColFreqLoc = gl.getUniformLocation(prog, 'uColorFreq');
    const uPointerLoc = gl.getUniformLocation(prog, 'uPointer');

    let animationFrameId: number | null = null;
    let isVisible = false;
    let startTime = performance.now();
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerRef.current.targetX = x;
      pointerRef.current.targetY = y;
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });

    const drawFrame = () => {
      const now = performance.now();
      const elapsed = ((now - startTime) / 1000) * timeScale;

      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.05;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.05;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uGlowLoc, glow);
      gl.uniform1f(uNoiseLoc, noise);
      gl.uniform1f(uHueLoc, hueShift);
      gl.uniform1f(uColFreqLoc, colorFrequency);
      gl.uniform2f(uPointerLoc, pointerRef.current.x, pointerRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = null;
        return;
      }
      drawFrame();
      animationFrameId = requestAnimationFrame(loop);
    };

    const startAnimation = () => {
      if (animationFrameId === null && isVisible && !document.hidden && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    if (prefersReducedMotion) {
      drawFrame();
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden && !prefersReducedMotion) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.01, rootMargin: '80px 0px' }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else if (isVisible) {
        startAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopAnimation();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handlePointerMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [glow, noise, hueShift, colorFrequency, timeScale]);

  return (
    <div ref={containerRef} className={`prism-container ${className}`}>
      <canvas ref={canvasRef} className="prism-canvas" />
    </div>
  );
};

export default Prism;
