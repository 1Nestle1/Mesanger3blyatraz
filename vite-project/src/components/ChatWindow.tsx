// ChatsBlock.tsx
import useStoreAndGroup from '../Stores/curmessages';
import style from '../Pages/mainwindow.module.css';
import { use, type CSSProperties } from 'react';
import { useShallow } from 'zustand/shallow';

const ChatsBlock = () => {
  // Safely select messages
  const messages = useStoreAndGroup((state) => state.messages);

  // Optional: get last sender safely
  

  return (
    <div className={style.chatsblock}>
      {messages.map((message: any, index) => 
      <Message
        currentIndex={index}
        // style={bubblestyle}
        {...message}/>
      )}
    </div>
  );
};

type MessageT = {
  id: string
  text: string
  senderId: number
  created_at: Date
  style: CSSProperties
  currentIndex: number
  senderAvatar: string
}

const Message = (props: MessageT) => {
  let bubblestyle= null;
  const {messages} = useStoreAndGroup(useShallow((state) => ({
    messages: state.messages})));
  let prevMessage = null
  
  if (props.currentIndex === 0) {
    prevMessage = props.senderId===4
  }
  else {
    prevMessage = messages[props.currentIndex - 1];
  }

  if (prevMessage.senderId !== props.senderId ) {
      bubblestyle = style.friend
      return(
        <div className={style.chatline}>
          <img className={style.friendimg} src={props.senderAvatar} alt="" />     
          <div key={props.id} className={style.chatbubble + " " + bubblestyle}>
            {props.text}
          </div>
        </div>
      )
    }
    else {
      bubblestyle = style.me
      return(
        <div>   
          <div key={props.id} className={style.chatbubble + " " + bubblestyle}>
            {props.text}
          </div>
        </div>
      )
    }
    
}

export default ChatsBlock;