import React from "react";

const imageUrl = "https://ychef.files.bbci.co.uk/1280x720/p026jrrl.jpg";
const ChannelAvatar = ({ url }) => {
  return (
    <div className="channels-avatar-container">
      <img src={url || imageUrl} width="100%" height="100%" />
    </div>
  );
};
function ChannelCard({
  title,
  id,
  username,
  isOnline,
  avatarUrl,
  navigateToChannelHandler,
}) {
  const handleNavigate = () => {
    navigateToChannelHandler(id);
  }
  return (
    <div className="channels-card" onClick={handleNavigate}>
      <ChannelAvatar url={avatarUrl} />
      <span className="channels-card-title"> {title}</span>
      <span className="channels-card-text"> {username}</span>
      <span
        className="channels-card-text"
        style={{
          color: isOnline ? "green" : "red",
        }}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}

export default ChannelCard;
