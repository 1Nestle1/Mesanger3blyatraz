import React, { useRef } from "react";
import { gsap } from "gsap";
import { createNoise3D } from "simplex-noise";

import style from "./sosal.module.css";


// 🎛 CONFIG
const CONFIG = {
  contourLevels: 15,       // always controls number of contour "bands"
  noiseScale: 0.003,
  animationSpeed: 0.005,
  resolution: 2,

  // 🎨 COLORS
  useCustomColors: 0,
  colors: ["#ff006e", "#fb5607", "#ffbe0b", "#3a86ff", "#8338ec", "#d53b9d", "#ff006e", "#fb5607", "#ffbe0b", "#3a86ff", "#8338ec", "#d53b9d"],
  colorHue: 250,
  colorSpread: 36,
};

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

const ContourAnimation: React.FC = () => {
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
    const palette: [number, number, number][] = CONFIG.useCustomColors
      ? CONFIG.colors.map(hexToRgb)
      : Array.from({ length: CONFIG.contourLevels }, (_, level) => {
          const hue =
            CONFIG.colorHue +
            (level / CONFIG.contourLevels) * CONFIG.colorSpread;
          return hslToRgb(hue / 360, 1, 0.6);
        });

    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y += CONFIG.resolution) {
        for (let x = 0; x < canvas.width; x += CONFIG.resolution) {
          const n =
            noise3D.current!(
              x * CONFIG.noiseScale,
              y * CONFIG.noiseScale,
              time.current
            ) *
              0.5 +
            0.5;

          // first map noise → contour band
          const contourVal = Math.min(
            CONFIG.contourLevels - 1,
            Math.floor(n * CONFIG.contourLevels)
          );

          // then map contour band → color index
          const colorIndex = CONFIG.useCustomColors
            ? Math.floor(
                (contourVal / (CONFIG.contourLevels - 1)) *
                  (CONFIG.colors.length - 1)
              )
            : contourVal;

          const [r, g, b] = palette[colorIndex];

          for (let dy = 0; dy < CONFIG.resolution; dy++) {
            for (let dx = 0; dx < CONFIG.resolution; dx++) {
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
      time.current += CONFIG.animationSpeed;
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
