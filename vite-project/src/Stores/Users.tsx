import {create} from 'zustand'
import {useCurChatStore} from "curmessages"

type User={
    id:number,
    name:string,
    avatar:string
    messages:any[]
    isCurrentUser?:boolean
}

export const useUserStore = create<User>((set) => ({
    id: 0,
    name: "",
    avatar: "",
    messages: [],
    
}))