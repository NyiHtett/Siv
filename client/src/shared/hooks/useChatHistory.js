import { useEffect } from "react";
import { useStore } from "../../store/store";
import useUserDetails from "./useUserDetails.js";
import { closeChatSubscription } from "../../socketConn/socketConn.js";
import { sendChatMessage } from "../../socketConn/socketConn.js";
import { getChatHistory } from "../../socketConn/socketConn.js";
function useChatHistory(channelId)  {
  const { chatHistory } = useStore();
  const { isLogged, username } = useUserDetails();

  useEffect(() => {
    getChatHistory(channelId);

    return () => {
      closeChatSubscription(channelId);
    };
  }, [chatHistory]);

  const sendMessage = (message) => {
    sendChatMessage(channelId, {
      author: isLogged ? username : "Guest",
      content: message,
    });
  };

  return {
    messages: chatHistory?.channelId === channelId ? chatHistory.messages : [],
    sendMessage,
  };
};

export default useChatHistory;