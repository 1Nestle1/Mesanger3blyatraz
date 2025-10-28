import {create, useStore} from "zustand"
import {useShallow} from "zustand/shallow"
import {useStoreAndGroup} from "./curmessages"
const messages = useStoreAndGroup((state) => state.messages);

export interface UserStore{
    id:number
    name:string
    avatar:string
    messages:any[]
    isCurrentUser?:boolean
}
export const useAllUsers=create<UserStore>((set) => ({
    id: 0,
    name: "",
    avatar: "",
    messages: messages,
    isCurrentUser:false,
}))

