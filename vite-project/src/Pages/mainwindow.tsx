import { useState } from "react";
import ContourAnimation from "./sosal";
import { Link } from "react-router-dom";
import style from "./mainwindow.module.css";

// базовый конфиг
const DEFAULT_CONFIG = {
  contourLevels: 15,
  noiseScale: 0.003,
  animationSpeed: 0.005,
  resolution: 2,
  useCustomColors: 0,
  colors: ["#ff006e", "#fb5607", "#ffbe0b", "#3a86ff", "#8338ec", "#d53b9d"],
  colorHue: 250,
  colorSpread: 36,
};

interface Companion {
  img?: string;
  name?: string;
}

const CurCompanion = ({ companion }: { companion: Companion }) => {
  return (
    <div className={style.curcomp}>
      <div className={style.curcompimg}>
        <img
          className={style.curcompimg}
          src={companion.img || ""}
          alt={companion.name || "companion"}
        />
    </div>
    </div>
  );
};

export default function MainWindow() {
  const [config] = useState(DEFAULT_CONFIG);

  const companion: Companion = {
    img: "",
    name: "current companion",
  };

  return (
    <div id="chatPage">
      <div className={style.blur}>
      <ContourAnimation config={config}  ></ContourAnimation>
      </div>
        <div className={style.chats}>
            <div className={style.header}>
                <CurCompanion companion={companion} />
                <div className={style.searchinput}>
                    <input className={style.search} type="text" />
                    <div className={style.menu}></div>
                </div>
            </div>
        </div>
    </div>
  );
}
