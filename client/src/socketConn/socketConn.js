import io from 'socket.io-client'
import { useStore } from '../store/store';
let socket;

export const connectWithSocketServer = () => {
    socket = io('http://localhost:5002')

    socket.on('connect', () => {
        console.log('successfully connected with socket.io server')
        console.log(socket.id);
    })

    socket.on('chat-history', (chatHistory)=>{
        //getting history from the server
        const { setChatHistory } = useStore.getState();

        //set chat history which is coming from the server
        setChatHistory(chatHistory);
    })

    socket.on('chat-message', (chatMessage) => {
        const { chatHistory, setChatHistory} = useStore.getState();

        setChatHistory({
            channelId: chatMessage.channelId,
            messages: [
                ...chatHistory.messages,
                {
                    author: chatMessage.author, 
                    content: chatMessage.content,
                    data: chatMessage.date,
                },
            ]
        })
    })
}

export const getChatHistory = (channelId) => {
    socket.emit("chat-history", channelId);
}

//send the chat message to another channel
export const sendChatMessage = (toChannel, message) => {
    console.log(`${message.content} is being sent to ${toChannel}`)
    socket.emit('chat-message', {
        toChannel, 
        message,
    });
}

export const closeChatSubscription = (channelId) => {
    socket.emit('chat-unsubscribe', channelId);
}