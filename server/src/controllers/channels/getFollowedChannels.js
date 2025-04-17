import User from "../../models/User.js";

const getFollowedChannels = async (req, res) => {
    console.log("getting the channels")
    try {
        const { userId } = req.user;
        const { followedChannels } = await User.findById(userId, {
            followedChannels: 1,
        })
        return res.status(200).json({
            followedChannels
        })
    } catch(err) {
        console.log(err) 
        return res.status(500).send("Error occured when fetching followed channel")
    }
}

export default getFollowedChannels;