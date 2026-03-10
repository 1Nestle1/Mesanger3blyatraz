// ChatsBlock.tsx
import useStoreAndGroup from '../Stores/curmessages';
import { useAllChats } from '../Stores/allchats';
import style from '../Pages/mainwindow.module.css';
import { useShallow } from 'zustand/shallow';
import { useEffect, useRef } from 'react';

interface MessageData {
  id: string | number;
  chatId: string | number;
  senderId: number;
  senderAvatar?: string;
  text: string;
}

const ChatsBlock = () => {
  const curChat = useAllChats((state) => state.activeChatId);
  const messages = useStoreAndGroup((state) => state.messages);
  const filteredMessages = messages.filter((message) => message.chatId === curChat);
    
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [filteredMessages]); // Changed dependency to filteredMessages

  return (
    <div className={style.chatsblock} ref={containerRef}>
      {filteredMessages.map((message, index) => (
        <Message 
          key={message.id} 
          message={message as MessageData} 
          index={index} 
          messages={filteredMessages as MessageData[]} 
        />
      ))}
    </div>
  )
};

const Message = ({ 
  message, 
  index, 
  messages 
}: { 
  message: MessageData; 
  index: number; 
  messages: MessageData[] 
}) => {
  const prevMessage = index > 0 ? messages[index - 1] : null;
  const isNewSender = !prevMessage || prevMessage.senderId !== message.senderId;

  if (message.senderId !== 10 || isNewSender) {
    return (
      <div className={style.chatline}>
        {isNewSender && message.senderAvatar && (
          <img className={style.friendimg} src={message.senderAvatar} alt="" />
        )}
        <div className={`${style.chatbubble} ${style.friend}`}>
          {message.text}
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.chatline}>
        <div className={`${style.chatbubble} ${style.me}`}>
          {message.text}
        </div>
      </div>
    );
  }
};

export default ChatsBlock;