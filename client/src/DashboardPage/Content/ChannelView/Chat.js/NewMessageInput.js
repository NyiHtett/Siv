import React, { useState } from "react";
function NewMessageInput({ sendMessage }) {
  const [messageContent, setMessageContent] = useState("");

  const handleValueChange = (e) => {
    setMessageContent(e.target.value);
  };

  const handleSendMessage = () => {
    //send message to the server
    if(messageContent.length > 0) {
      sendMessage(messageContent);
      console.log("this is new messsage being sent")
      //clear after sending
      setMessageContent("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  console.log(messageContent);

  return (
    <div className="chat-message-input-container">
      <input
        className="chat-message-input"
        placeholder="Type message ..."
        value={messageContent}
        onChange={handleValueChange}
        onKeyDown={handleKeyPress}   //for pressing enter key
      ></input>
    </div>
  );
}

export default NewMessageInput;
