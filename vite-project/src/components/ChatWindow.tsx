
import  useStoreAndGroup  from '../Stores/curmessages'
import style from "../Pages/mainwindow.module.css"

const ChatsBlock=()=>{
  const store = useStoreAndGroup((state) => state.messages);

  return(
    <div className={style.chatsblock}>
        
            {store.map((message: any) => (
                <div key={message.id} className={style.chatbubble}>
                    {message.text}
                </div>
            ))}
            
        
    </div>
  )}  

export default ChatsBlock
