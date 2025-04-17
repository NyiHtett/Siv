import React from "react";

const Message = ({ author, content }) => {
  return (
    <span className="chat-messages-message">
      <span style={{ fontWeight: "bold" }}> {author}: </span>
      {content}
    </span>
  );
};
const Messages = ({messages}) => {
  return <div className="chat-messages-container">
    {messages.map((message) => (<Message 
        key = {`${message.author}-${message.content}-${message.date}`}
        author = {message.author}
        content= {message.content}
    />))}
  </div>;
};

export default Messages;
