import { Server } from "socket.io";
import { emitChatHistory } from "./events/emitChatHistory.js";
import { emitChatMessage } from "./events/emitChatMessage.js";

let io;

export const registerSocketServer = (server) => {
  //preparing socketio server
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("new user connected");
    console.log(socket.id);

    //client request the chat history
    socket.on("chat-history", (channelId) => {
    
      //client joinned the channel
      socket.join(channelId);
      emitChatHistory(socket, channelId);
    });

    //listening on another event "chat-message"
    socket.on("chat-message",async (data) => {
      await emitChatMessage(io, { toChannel: data.toChannel, message: data.message });
    });

    socket.on("chat-unsubscribe", (channelId) => {
        socket.leave(channelId);
    })
  });
};
