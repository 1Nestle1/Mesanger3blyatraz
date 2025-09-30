import React, { useRef } from "react";
import { gsap } from "gsap";
import { createNoise3D } from "simplex-noise";
import style from "./sosal.module.css";

// utils: hex → rgb
function hexToRgb(hex: string): [number, number, number] {
  const val = parseInt(hex.slice(1), 16);
  return [(val >> 16) & 255, (val >> 8) & 255, val & 255];
}

// utils: hsl → rgb
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// 🔑 теперь Config приходит как проп
interface ContourAnimationProps {
  config: {
    contourLevels: number;
    noiseScale: number;
    animationSpeed: number;
    resolution: number;
    useCustomColors: number;
    colors: string[];
    colorHue: number;
    colorSpread: number;
  };
}

const ContourAnimation: React.FC<ContourAnimationProps> = ({ config }) => {
  const noise3D = useRef(createNoise3D());
  const time = useRef(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const initCanvas = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      cleanupRef.current?.();
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // 🎨 Build palette
    const palette: [number, number, number][] = config.useCustomColors
      ? config.colors.map(hexToRgb)
      : Array.from({ length: config.contourLevels }, (_, level) => {
          const hue =
            config.colorHue +
            (level / config.contourLevels) * config.colorSpread;
          return hslToRgb(hue / 360, 1, 0.6);
        });

    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y += config.resolution) {
        for (let x = 0; x < canvas.width; x += config.resolution) {
          const n =
            noise3D.current!(
              x * config.noiseScale,
              y * config.noiseScale,
              time.current
            ) *
              0.5 +
            0.5;

          const contourVal = Math.min(
            config.contourLevels - 1,
            Math.floor(n * config.contourLevels)
          );

          const colorIndex = config.useCustomColors
            ? Math.floor(
                (contourVal / (config.contourLevels - 1)) *
                  (config.colors.length - 1)
              )
            : contourVal;

          const [r, g, b] = palette[colorIndex];

          for (let dy = 0; dy < config.resolution; dy++) {
            for (let dx = 0; dx < config.resolution; dx++) {
              const px = ((y + dy) * canvas.width + (x + dx)) * 4;
              data[px] = r;
              data[px + 1] = g;
              data[px + 2] = b;
              data[px + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const render = () => {
      time.current += config.animationSpeed;
      draw();
    };

    gsap.ticker.add(render);
    gsap.ticker.fps(30);

    window.addEventListener("resize", resize);

    cleanupRef.current = () => {
      gsap.ticker.remove(render);
      window.removeEventListener("resize", resize);
    };
  };

  return <canvas ref={initCanvas} className={style.background} />;
};

export default ContourAnimation;
