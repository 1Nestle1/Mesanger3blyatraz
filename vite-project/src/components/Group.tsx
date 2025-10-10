
    const groupMessagesByBlocks = () => {
        const groupedMessages = messages.reduce((acc, cur, index, arr) => {
            // const key = `${cur.senderId}_${cur.created_at.toISOString()}`
            if (index === 0 || arr[index - 1].senderId !== cur.senderId) {
                acc.push([cur])
            } else {
                acc[acc.length - 1].push(cur)

            }

            return acc
        }, [])
        return groupedMessages
    }
   
    
export default groupMessagesByBlocks