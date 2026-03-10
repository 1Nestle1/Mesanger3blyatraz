import {v4 as uuidv4} from "uuid"
type User = {
    id: string,
    name: string,
    avatar: string,
    lastMessage: string,
    state: string
}
const users: User[] = [
    {
        id: uuidv4(),
        name: "John Doe",
        avatar: "https://avatar.iran.liara.run/public",
        lastMessage: "Hello, how are you?",
        state: "online"
    },
    {
        id: uuidv4(),
        name: "Jane Doe",
        avatar: "https://avatar.iran.liara.run/public/8",
        lastMessage: "Hello, how are you?",
        state: "online"
    },
    {
        id: uuidv4(),
        name: "Bob Smith",
        avatar: "https://avatar.iran.liara.run/public/12",
        lastMessage: "Hello, how are you?",
        state: "online"
    },
    {
        id: uuidv4(),
        name: "Alice Johnson",
        avatar: "https://avatar.iran.liara.run/public/5",
        lastMessage: "Hello, how are you?",
        state: "online"
    },
    {
        id: uuidv4(),
        name: "Charlie Brown",
        avatar: "https://avatar.iran.liara.run/public/6",
        lastMessage: "Hello, how are you?",
        state: "online"
    }
]
export default users
