import { useState, useCallback } from "react";
import useStoreAndGroup from "../Stores/curmessages";
import style from "../Pages/mainwindow.module.css";
import { useShallow } from "zustand/shallow";
import { useRef,useEffect } from "react";
import { useAllChats } from "../Stores/allchats";
import { useUserStore } from "../Stores/allusers";

const ChatInput = () => {
  const mockUser = useUserStore((state) => state.users);
  const user = mockUser[0];
  const chatId = useAllChats((state) => state.activeChatId);
  const [message, setMessage] = useState("");
  const {addMessage} = useStoreAndGroup(useShallow((state) => ({
    addMessage: state.addMessage, 
  }))); 
  
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (message.trim() === "") return; // 
        addMessage({
          id: crypto.randomUUID(),
          text: message, // 
          senderId: user.id,
          created_at: new Date(),
          senderName: user.name,
          senderAvatar: user.avatar,
          chatId:chatId ,
        });

        setMessage(""); 
      }
    },
    [message, addMessage] // 
  );

  return (
    <div className={style.chatinput}>
      <input
        className={style.input}
        type="text"
        value={message}
        id="textiput"
        onKeyDown={handleKeyDown}      
        onChange={handleMessageChange}
      />
    </div>
  );
};

export default ChatInput;