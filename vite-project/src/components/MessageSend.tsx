import { useState, useCallback } from "react";
import useStoreAndGroup from "../Stores/curmessages";
import style from "../Pages/mainwindow.module.css";
import { useShallow } from "zustand/shallow";

const ChatInput = () => {
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
          senderId: 10,
          created_at: new Date(),
          senderName: "John Doe",
          senderAvatar: "https://avatar.iran.liara.run/public",
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