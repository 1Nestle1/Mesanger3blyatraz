import { useMemo } from "react"

const Message = () => {
   return (
    <div className="message">

    </div>
   ) 
}

const Messages = () => {
    const currentUserId = 10
    const messages = [
        {id: 1, text: "Hello", senderId: 123, senderName: "John Doe", senderAvatar: "https://example.com/avatar.jpg", created_at: new Date('2022-01-01T12:00:00.000Z')},
        {id: 2, text: "How are you?", senderId: 123, senderName: "John Doe", senderAvatar: "https://example.com/avatar.jpg", created_at: new Date('2022-01-01T12:00:01.000Z')},
        {id: 3, text: "I am fine, thanks", senderId: 10, senderName: "Jane Doe", senderAvatar: "https://example.com/avatar2.jpg", created_at: new Date('2022-01-01T12:00:02.000Z')},
        {id: 4, text: "What are you doing today?", senderId: 123, senderName: "John Doe", senderAvatar: "https://example.com/avatar.jpg", created_at: new Date('2022-01-01T12:00:03.000Z')},
        {id: 5, text: "I am going to the gym", senderId: 10, senderName: "Jane Doe", senderAvatar: "https://example.com/avatar2.jpg", created_at: new Date('2022-01-01T12:00:04.000Z')},
    ]

    const groupMessagesByBlocks = () => {
        const groupedMessages = messages.reduce((acc, cur) => {
            const key = `${cur.senderId}_${cur.created_at.toISOString()}`
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(cur)
            return acc
        }, {})
    }
console.log(groupMessagesByBlocks(messages))
    const messagesBlcoks = useMemo(groupMessagesByBlocks, [messagesUpdatedAt])

    return (
        <div className="messages">
            {messagesBlcoks.map(messagesBlock => 
                <Message></Message>
            )}
        </div>
    )
}