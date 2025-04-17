import User from "../../models/User.js";
import axios from 'axios'
export const getChannels = async (_, res) => {
  try {
    //get all users syntax
    const users = await User.find(
      {},
      {
        channel: 1,
        username: 1,
      }
    ).populate("channel");

    const responseData = await axios.get("http://localhost:8000/api/streams");
    const activeStreams = responseData.data;

    let liveStreamIds = [];
    for (const streamId in activeStreams?.live) {
      if (
        activeStreams.live[streamId].publisher &&
        activeStreams.live[streamId].publisher !== null
      ) {
        liveStreamIds.push(streamId);
      }
    }

    const channels = users
      .filter((u) => u.channel.isActive)
      .map((user) => {
        return {
          id: user.channel._id,
          title: user.channel.title,
          avatarUrl: user.channel.avatarUrl,
          username: user.username,
          isOnline: liveStreamIds.includes(user.channel.streamKey),
        };
      });
    return res.json({
      channels,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};
