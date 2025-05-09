import mongoose from "mongoose";
import { v4 as uuid} from 'uuid';

const { Schema } = mongoose;

const defaultTitle = "New channel"
const defaultDescription = "This is new channel description"

const channelSchema = new Schema({
    isActive: {type: Boolean, default: false},
    title: {type: String, default: defaultTitle},
    description: {type: String, default: defaultDescription},
    avatarUrl: {type: String, default: null},
    streamKey: {type: String, default: uuid},
    messages: {
        type: [{type: Schema.Types.ObjectId, ref: 'Message'}], //special name of the type
        default: [],
    },
});

export default mongoose.model("Channel", channelSchema);