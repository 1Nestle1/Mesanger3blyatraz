import { useUserStore } from "../Stores/allusers";
import style from "../Pages/mainwindow.module.css";
import { useAllChats } from "../Stores/allchats";
import { act, useRef } from "react";
const ChatListItem = ({ chat, setActiveChatId }: { chat: any; setActiveChatId: any }) => {
  const { users } = useUserStore();
  const companion = users.find((u) => u.id === chat.user_ids[0]);
  if (!companion) return null;
 const handleClick = () => {
    
    console.log(chat.id);
    setActiveChatId(chat.id);
 }

let activeChatId = useAllChats((state) => state.activeChatId);

const isActive = activeChatId === chat.id;
  return (
    <div className={
    isActive
      ? `${style.companion} ${style.activeChat}`
      : style.companion
  }
    onClick={handleClick}
    >
      <img
        className={style.companionimg}
        src={companion.avatar}
        alt={companion.name}
      />
      <div className={style.companion_name}>{companion.name}</div>
    </div>
  );
};

const ChatsList = () => {
  console.log();
  const { chats } = useAllChats();
  const { setActiveChatId } = useAllChats();

  return (
    <div className={style.chatlist}>
      {chats.map((chat) => (
        <ChatListItem chat={chat} 
        setActiveChatId={setActiveChatId} 
        key={chat.id} />
      ))}
    </div>
  );
};

export default ChatsList;