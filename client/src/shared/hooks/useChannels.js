import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import {
  getFollowedChannels,
  getChannels as getChannelsRequest,
} from "../../api";
function useChannels() {
  const [channels, setChannels] = useState(null);

  const getChannels = async (isLogged = false) => {
    const channelsData = await getChannelsRequest();

    if (channelsData.error) {
      return toast.error(
        channelsData.exception?.response?.data ||
          "Error occured when fetching the channels"
      );
    }

    if (!isLogged) {
      return setChannels({
        channels: channelsData.data.channels,
      });
    }

    /**
     * isLogged function becomes true and followed channels will be fetched
     */
    const followedChannelsData = await getFollowedChannels();
    if (followedChannelsData.error) {
      return toast.error(
        followedChannelsData.exception?.response?.data ||
          "Error occured when fetching followed channels"
      );
    }

    setChannels({
      channels: channelsData.data.channels,
      /**
       * 
       */
      followedChannels: channelsData.data.channels.filter((channel) =>
        followedChannelsData.data.followedChannels.includes(channel.id)
      ),
    });
  };

  useEffect(() => {
    console.log(channels);
  }, [channels]);
  return {
    getChannels,
    isFetching: !Boolean(channels),
    allChannels: channels?.channels,
    followedChannels: channels?.followedChannels
  };
}

export default useChannels;
