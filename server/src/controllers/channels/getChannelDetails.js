import axios from "axios";
import User from "../../models/User.js";
import Channel from "../../models/Channel.js";
const getChannelDetails = async (req, res) => {
  try {
    //finding the channel
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);

    if (!channel || !channel.isActive) {
      return res.status(404).send("Channel is not found");
    }

    //finding the user of the channel
    const user = await User.findOne({ channel: channelId }, { username: 1 });

    const streamUrl = `http://localhost:8000/live/${channel.streamKey}.flv`;

    const requestData = await axios.get("http://localhost:8000/api/streams");
    const activeStreams = requestData.data; //point the whole data 
    let liveStreams = [];

    for (const streamId in activeStreams?.live) {
      //stream is online
      if (
        //publisher is set and not null then the stream is online
        activeStreams.live[streamId].publisher &&
        activeStreams.live[streamId].publisher !== null
      ) {
        liveStreams.push(streamId);
      }
    }
    console.log(liveStreams)

    const isOnline = liveStreams.includes(channel.streamKey);

    //gathering up and response
    return res.status(200).json({
      id: channel._id,
      title: channel.title,
      description: channel.description,
      username: user.username,
      isOnline,
      streamUrl: streamUrl,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Channel is not found, Please check your channel url");
  }
};

export default getChannelDetails;
