import React, { useEffect, useState } from "react";
import { getChannelSettings, updateChannelSettings } from "../../api";
import toast from "react-hot-toast";

function useChannelSettings() {
  const [channelSettings, setChannelSettings] = useState(null);
  const fetchChannelSettings = async () => {
    const response = await getChannelSettings();

    //display the undefined with toast
    //key should be attached in the request, thus it does not make sense for it to work without the key
    if (response.error) {
      return toast.error(
        response.exception?.response?.data ||
          "Error occured when fetching channel settings"
      );
    }

    setChannelSettings({
      username: response.data.username,
      title: response.data.title,
      description: response.data.description,
      avatarUrl: response.data.avatarUrl,
      streamKey: response.data.streamKey,
    });
  };

  const saveSettings = async (data) => {
    const response = await updateChannelSettings(data);

    if (response.error) {
      return toast.error(
        response.exception?.response?.data ||
          "Error occured when saving channel settings"
      );
    }

    toast.success("Channel settings is saved successfully");
  };

  useEffect(() => {
    fetchChannelSettings();
  }, []);

  return {
    isFetching: !channelSettings,
    channelSettings,
    saveSettings,
  };
}

export default useChannelSettings;
