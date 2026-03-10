// import { useCurChatStore } from "./curmessages";
import {create} from "zustand"
import { mockUsers } from "./allusers"
import {v4 as uuidv4} from "uuid"

interface ChatStore {
    chats: Chat[]
    addChat: (chat: Chat) => void
    activeChatId: string|null,
    setActiveChatId: (id: string) => void
}

const userAC = mockUsers
type Chat = 
{   user_ids: String[], 
    id: string,
    name?: string,
    avatar?: string,

}
const mockChats = [
{
    user_ids:[userAC[0].id],
    id: uuidv4(),
},
{
    user_ids:[userAC[1].id],
    id: uuidv4(),              
},
{
    user_ids:[userAC[2].id],
    id: uuidv4(),
},
{
    user_ids:[userAC[3].id],
    id: uuidv4(),
}
]


export const useAllChats = create<ChatStore>((set) => (
    {
        chats: [...mockChats],
        addChat: (chats) => set((state) => ({
            ...state,
            chats: [...state.chats, chats]
        })),
        activeChatId: null,
        setActiveChatId: (id) => set((state) => ({
            ...state,
            activeChatId: id
        }))

    })
);