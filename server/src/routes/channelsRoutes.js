import express from "express";
import ExpressValidation from "express-joi-validation";
import Joi from "joi";
import getChannelDetails from "../controllers/channels/getChannelDetails.js";
import { getChannels } from "../controllers/channels/getChannels.js";
import verifyToken from "../middlewares/auth.js";
import postFollowChannel from "../controllers/channels/postFollowChannel.js";
import getFollowedChannels from "../controllers/channels/getFollowedChannels.js";
const channelsRoutes = express.Router();

const channelDetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

const validator = ExpressValidation.createValidator({});

//user should be verified to view the followed channels
channelsRoutes.get(
    "/followed",
    verifyToken, 
    getFollowedChannels
);


//user should be verifed to follow the channels
channelsRoutes.post(
  "/follow",
  verifyToken,
  validator.body(channelDetailsSchema),
  postFollowChannel
);

//don't need token as the channel information should be public
channelsRoutes.get(
  "/:channelId",
  validator.params(channelDetailsSchema),
  getChannelDetails
);


channelsRoutes.get("/", getChannels);
export default channelsRoutes;
