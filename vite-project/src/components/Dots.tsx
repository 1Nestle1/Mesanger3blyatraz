import React, { useRef, useEffect } from 'react';

interface VerticalTripleDotProps {
  size?: number;        // radius of each dot (default: 2)
  spacing?: number;     // vertical spacing between centers (default: 4)
  color?: string;       // dot color (default: '#ffffff' — white)
  className?: string;   // optional class for canvas element
  style?: React.CSSProperties;
}

const VerticalTripleDot: React.FC<VerticalTripleDotProps> = ({
  size = 4,
  spacing = 10,
  color = '#ffffff',
  className = '',
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use devicePixelRatio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const radius = size;
    const width = size * 3; // canvas width
    const height = size * 2 + spacing * 2; // total height for 3 dots

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw 3 vertical dots
    const centerX = width / 2;
    const startY = radius; // first dot at top

    for (let i = 0; i < 3; i++) {
      const y = startY + i * spacing;
      ctx.beginPath();
      ctx.arc(centerX, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }, [size, spacing, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`triple-dot-canvas ${className}`}
      style={style}
      aria-label="More options"
      role="img"
    />
  );
};

export default VerticalTripleDot;