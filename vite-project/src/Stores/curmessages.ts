// Stores/curmessages.ts
import { create } from "zustand";

export interface Message {
  id: string;
  text: string;
  senderId: number;
  created_at: Date;
  senderName: string;
  senderAvatar: string; 
}

export const defaultSender = {
  id: 1,
  name: "John Doe",
  avatar: "",
};

interface ChatStore {
  messages: Message[]; // 
  addMessage: (messageData: Message) => void;
  defaultSender: typeof defaultSender;
}

const useStoreAndGroup = create<ChatStore>((set) => ({
  messages: [], // 
  defaultSender,
  addMessage: (messageData) =>
    set((state) => ({
      ...state,
      messages: [
        ...state.messages, // 
        {
          id: crypto.randomUUID(),
          text: messageData.text,
          senderId: messageData.senderId,
          created_at: messageData.created_at,
          senderName: state.defaultSender.name,
          senderAvatar: messageData.senderAvatar,
          
        },
      ],
    })),
})
);

export default useStoreAndGroup;