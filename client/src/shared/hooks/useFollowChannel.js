import React from 'react'
import toast from 'react-hot-toast';
import { followedChannel as followChannelRequest} from '../../api';
function useFollowChannel() {
    const followChannel = async (channelId, onSuccess) => {
        const responseData = await followChannelRequest(channelId);
        if(responseData.error) {
            return toast.error(
                responseData.exception?.response?.data ||
                  "Error occured when fetching to follow a channel"
              );
        }
        toast.success("Channel followed successfully ");
        onSuccess(true);
    }
  return {
    followChannel,
  }
}

export default useFollowChannel
