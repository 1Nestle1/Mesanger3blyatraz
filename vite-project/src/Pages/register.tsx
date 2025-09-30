import { useState } from "react";
import ContourAnimation from "./sosal";
import style from "./register.module.css";

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

const HOVER_CONFIG = {
  ...DEFAULT_CONFIG,
  colorHue: 230, // например, зелёный оттенок при наведении
  animationSpeed: 0.01, // ускоряем анимацию
};

function Register() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  return (
    <div className={style.SignInPage}>
      {/* 🎨 Background */}
      <ContourAnimation config={config} />

      {/* 📦 Sign-in card */}
      <div
        className={style.signincard + " relative z-10"}
        onMouseEnter={() => setConfig(HOVER_CONFIG)}
        onMouseLeave={() => setConfig(DEFAULT_CONFIG)}
      >
        <div className={style.in}>
          <h1 className={style.signin}>Welcome</h1>

          <div className={style.TextInputs}>
            <div className={style.emailblock}>
              <h1 className={style.em}>email</h1>
              <input className={style.email} type="email" placeholder="" />
            </div>

            <div className={style.passblock}>
              <h1 className={style.pass}>password</h1>
              <input className={style.password} type="password" placeholder="" />
            </div>
          </div>

          <div className={style.buttons}>
            <div className={style.signinbutton}>
              <label className={style.signinbutom}>signin</label>
            </div>
            <div className={style.registerbutton}>
              <label className={style.registerbutom}>register</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
