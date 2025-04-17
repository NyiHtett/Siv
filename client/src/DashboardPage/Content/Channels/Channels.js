import React from 'react'
import ChannelCard from './ChannelCard'
import { useNavigate } from 'react-router-dom'

function Channels({channels}) {
  const navigate = useNavigate();
  const handleNavigateToChannel = (id) => {
    navigate(`/channel/${id}`)
  }
  return (
    <div className='channels-container'>
      {channels.map(channel => (
        <ChannelCard 
        key = {channel.id}
        id = {channel.id}
        title = {channel.title}
        username = {channel.username}
        isOnline = {channel.isOnline}
        avatarUrl = {channel.avatarUrl}
        navigateToChannelHandler = {handleNavigateToChannel}
        />
      ))}
    </div>
  )
}

export default Channels
