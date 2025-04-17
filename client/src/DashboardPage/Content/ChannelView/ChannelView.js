import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactFlvPlayer } from 'react-flv-player';
import Chat from './Chat.js/Chat'
import ChannelDescription from './ChannelDescription'
import useChannelDetails from '../../../shared/hooks/useChannelDetails'
import LoadingSpinner from '../../../shared/components/LoadingSpinner'

export const Stream = ({streamUrl}) => {
    return (
    <div className='channel-video-container'>
        <ReactFlvPlayer
        width = "100%"
        height = "100%"
        url = {streamUrl}
        />
    </div>);
};

function ChannelView({getChannels}) {
    const {channelDetails, isFetching, getChannelDetails} = useChannelDetails();
    const {id} = useParams();
    console.log(getChannelDetails)
    useEffect(()=> {
        getChannelDetails(id);
    },[]);

    if(isFetching) {
        return <LoadingSpinner/>
    }
  return (
    <div className='channel-container'>
        <div className='channel-video-description-section'>

            {/* this is for video */}
            {channelDetails.isOnline ? (
                <Stream 
                streamUrl= {channelDetails.streamUrl}
                />
            ): (
                <div className='channel-offline-placeholder'>
                <span>Channel is offline</span>
                </div>
            )}

            

            

            {/* this is for the video's description */}
            <ChannelDescription
                channelId = {channelDetails.id}
                title = {channelDetails.title}
                description = {channelDetails.description}
                username = {channelDetails.username}
                getChannels = {getChannels}
            />
        </div>
        <Chat channelId={channelDetails.id}/>
    </div>
  )
}

export default ChannelView
