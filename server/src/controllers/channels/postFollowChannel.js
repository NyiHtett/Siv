import User from "../../models/User.js";

const postFollowChannel = async(req, res) => {
    console.log("this is post follow Channel");
    try {
        const { userId } = req.user;
        const { channelId } = req.body; 
        const userData = await User.findById(userId, {followedChannels: 1});

        //check if the channel is already been followed
        if(userData.followedChannels.includes(channelId)) {
            return res.status(400).send("You are already following this channel");
        }
        userData.followedChannels.push(channelId);
        await userData.save();
        return res.status(200).send("Channel followed successfully");
    } catch(error) {
        console.log(error);
        return res.status(500).send("something went wrong")
    }
}

export default postFollowChannel;