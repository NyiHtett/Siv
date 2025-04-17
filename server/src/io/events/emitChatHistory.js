import Channel from "../../models/Channel.js";

export const emitChatHistory = async (socket, channelId) => {
    try {
        const channel = await Channel.findById(channelId).populate("messages");
        if (channel) {
            return socket.emit("chat-history", {
                channelId, 
                messages: channel.messages.map(message => ({
                    author: message.author, 
                    content: message.content,
                    date: new Date()
                })),
            });
            
        }

        console.log(channelId);
        socket.emit("chat-history", {
            errorOcurred: true, 
        });
        
    } catch(err) {
        console.log(err);
        socket.emit('chat-history', {
            errorOcurred: true, 
        })
    }
}

