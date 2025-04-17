import express from "express";
import ExpressValidation from "express-joi-validation";
import Joi from "joi";
import verifyToken from "../middlewares/auth.js";
import getChannelSettings from "../controllers/settings/getChannelSettings.js";
import putChannelSettings from "../controllers/settings/putChannelSettings.js";
import patchChangePassword from "../controllers/settings/patchChangePassword.js";

const settingsRoute = express.Router();

const validator = ExpressValidation.createValidator({});

const channelSettingsSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    description: Joi.string().min(10).max(200).required(), 
    title: Joi.string().min(3).max(30).required(),
    avatarUrl: Joi.string().uri().required(),
})

const changePasswordSchema = Joi.object({
    password: Joi.string().min(6).max(12),
    newPassword: Joi.string().min(6).max(12),
})

settingsRoute.get('/channel', verifyToken, getChannelSettings)

settingsRoute.put('/channel', verifyToken, validator.body(channelSettingsSchema), putChannelSettings)

settingsRoute.patch('/password', verifyToken, validator.body(changePasswordSchema), patchChangePassword)
export default settingsRoute