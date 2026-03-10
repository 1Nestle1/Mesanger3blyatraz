import {create, useStore} from "zustand"
import {useShallow} from "zustand/shallow"

import user from "../assets/users"

    

export interface UserStore{
    users: User[],
    addUser: (user: User) => void,
}

type User = {
    id: string;
    name: string;
    avatar: string;
    isCurrentUser?: boolean;

}

// type Users = []
export const mockUsers: User[] = [
    ...user
]
export const useUserStore = create<UserStore>((set) => ({
    users: [...mockUsers],
    addUser: (user) => set((state) => 
        ({ users: [...state.users, user] })),
}))

