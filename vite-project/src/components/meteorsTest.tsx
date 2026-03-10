

import { useEffect, useState, useRef } from "react";
import styles from "./meteors.module.css";

export interface MeteorBackdropProps {
  number?: number;
  minDuration?: number;
  maxDuration?: number;
  minDelay?: number;
  maxDelay?: number;
  angle?: number;
  color?: string;
  respawnInterval?: number; // ms, e.g., 20_000
}

export const MeteorBackdrop = ({
  number = 30,
  minDuration = 3,
  maxDuration = 8,
  minDelay = 0,
  maxDelay = 20,
  angle = 215,
  color = "#64748b",
  respawnInterval = 20_000,
}: MeteorBackdropProps) => {
  const [meteors, setMeteors] = useState<Array<{ id: string; style: React.CSSProperties }>>([]);
  const respawnTimer = useRef<NodeJS.Timeout | null>(null);

  const generateMeteors = () => {
    return Array.from({ length: number }, (_, i) => {
      const delay = Math.random() * maxDelay;
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      const startX = `${Math.random() * 100}vw`;

      return {
        id: `${Date.now()}-${i}`, // ✅ unique stable ID per spawn cycle
        style: {
          "--meteor-start-x": startX,
          "--meteor-delay": `${delay}s`,
          "--meteor-duration": `${duration}s`,
          "--meteor-angle": `${angle}deg`,
          "--meteor-color": color,
        } as React.CSSProperties,
      };
    });
  };

  useEffect(() => {
    // Initial spawn
    setMeteors(generateMeteors());

    // Respawn cycle
    if (respawnInterval > 0) {
      respawnTimer.current = setInterval(() => {
        setMeteors(generateMeteors());
      }, respawnInterval);

      return () => {
        if (respawnTimer.current) {
          clearInterval(respawnTimer.current);
        }
      };
    }
  }, [number, minDuration, maxDuration, maxDelay, angle, color, respawnInterval]);

  return (
    <div className={styles.backdrop}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id} // ✅ Critical: unique key per meteor instance
          className={styles.meteor}
          style={meteor.style}
        />
      ))}
    </div>
  );
};