import User from "../../models/User.js";
import Channel from "../../models/Channel.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
export const postRegister = async (req, res) => {
    console.log(req.body)
    try {
      const { username, email, password} = req.body;

      //whether or not the user have already existed with this email 
      const userExists = await User.exists({email})

      if(userExists) {
        return res.status(409).send("E-mail is already created")
      }

      //encrypt the password for the user's safety
      const encryptedPassword = await bcrypt.hash(password, 10);

      const newChannel = await Channel.create({})
      const user = await User.create({
        username,
        email: email.toLowerCase(), 
        password: encryptedPassword,
        channel: newChannel._id, //get id of created content
      })

      //create JWT token
      const token = jwt.sign(
        //details that we want to encrypt in jwt token
        {
            userId: user.id, 
            email, 
        },
        // secret token
        process.env.TOKEN_KEY,
        // additional config
        {
            expiresIn: "0.1h",  //log out after this time
        }
      );

      //send the user data and the token
      return res.status(201).json({
        userDetails: {
            email: user.email, 
            username, 
            token,
        }
      })

      
    } catch(err) {
        console.log(err)
        return res.status(500).send('Error occured')
    }
}