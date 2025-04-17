import mongoose from "mongoose";

const {Schema} = mongoose;

// create a new mongodb model for each user
const userSchema = new Schema({
    email: {type: String, unique: true}, 
    username: {type: String},
    password: {type: String},
    channel: {type: Schema.Types.ObjectId, ref: "Channel"}, //receive all data from channel
    followedChannels: {type: [{type: Schema.Types.ObjectId, ref: "Channel"}]}
});

export default mongoose.model("User", userSchema)