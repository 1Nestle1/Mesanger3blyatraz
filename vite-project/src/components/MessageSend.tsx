import { useState, useCallback } from "react";
import useStoreAndGroup from "../Stores/curmessages";
import style from "../Pages/mainwindow.module.css";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const addMessage = useStoreAndGroup((state) => state.addMessage); // ✅ Select only what you need

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
        placeholder="Type a message..."
      />
    </div>
  );
};

export default ChatInput;