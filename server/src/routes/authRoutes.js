import express from 'express'

// add validation rules 
import Joi from 'joi';
import ExpressValidation from "express-joi-validation"
import { postLogin, postRegister } from '../controllers/controllers.js'
const router = express.Router();

const validator = ExpressValidation.createValidator({})

//checking if the data is right
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required() // email function for checking correct email
})

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required() // email function for checking correct email
})

router.post('/register', validator.body(registerSchema), postRegister);

router.post('/login', validator.body(loginSchema),postLogin);

export default router;