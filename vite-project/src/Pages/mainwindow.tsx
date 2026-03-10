import { useState } from "react";
import ContourAnimation from "./sosal";
import { Link } from "react-router-dom";
import style from "./mainwindow.module.css";
import user from "../assets/users";
import useStoreAndGroup from "../Stores/curmessages";
import ChatInput from "../components/MessageSend";
import ChatsBlock from "../components/ChatWindow";
import ChatsList from "../components/ChatsList";
import VerticalTripleDot from "../components/Dots";
import { MeteorBackdrop } from "../components/meteorsTest";
import { useEffect , useRef} from "react";
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
// useCurChatStore.getState().setCurChat(user.chats[0]);

interface Companion {
  img?: string;
  name?: string;
  state?: string;
  last?: string;
}
const useRefresh = () => {
  
}

const CurCompanion = ({ companion }: { companion: Companion }) => {
  return (
    <div className={style.curcomp}>
        <img
          className={style.curcompimg}
          src={companion.img || ""}
          alt={companion.name || "companion"}
        />
    <div className={style.curcompname}>
        {companion.name}
        </div>
    </div>
    
    
  );
};

export default function MainWindow() {
  const [config] = useState(DEFAULT_CONFIG);

  const companion: Companion = {
    img: "../src/assets/3d_avatar_21.png",
    name: "Emily Clark",
    state: "online",
    last: "hello",
  };

  return (
    <div id="chatPage">
      <div className={style.vinetka}>
        <div className={style.blur}>
        <ContourAnimation config={config}  ></ContourAnimation>
    <MeteorBackdrop 
        number={50}
        angle={225}
        color="#8b5cf6" // purple-500
      />
        </div>
      </div>
        <div className={style.chats}>
            </div>
            <div className={style.chatwindow} >
            <div className={style.sidebar}>
                <CurCompanion companion={companion} />
                <ChatsList/>
            </div> 
            <div className={style.mainblock}>
              <div className={style.searchinput}>
                    {/* <canvas className={style.menu} id='dotCanvas'></canvas> */}
                    <VerticalTripleDot className={style.trippledot} />
                    <input className={style.search} type="text" />
                </div>
              <ChatsBlock/>
              <ChatInput />
              </div>
            </div>
        </div>
  );
}

