import User from "../../models/User.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export const postLogin = async (req, res) => {
    try{
        const { email, password} = req.body;
    const user = await User.findOne({
        email: email.toLowerCase(), //try to find the user with the same email in the database
    });

/**
 * if the password is correct, then send the details back 
 */
    if(user && (await bcrypt.compare(password, user.password))) { // plain & encrypted data {}
        //create jwt token
        //create JWT token
      const token = jwt.sign(
        //details that we want to encrypt in jwt token
        {
            userId: user.id, 
            email: user.email
        },
        // secret token
        process.env.TOKEN_KEY,
        // additional config
        {
            expiresIn: "8h",  //log out after this time
        }
      );

      //send back response to the user
      return res.status(200).json({
        userDetails: {
            email: user.email,
            token,
            username: user.username
        }
      })
        //send back response to the user
    }
    return res.status(400).send("Invalid credentials, Please Try Again")
    }
    catch(err) {
        return res.status(500).send("Something went wrong from server side. Please try again")
    }
    
}