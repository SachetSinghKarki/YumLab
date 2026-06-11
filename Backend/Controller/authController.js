import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { username, email, password, avatar } = req.body;
  try {
    // checking if the user already exists in the db or not
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    // if yes then send msg as it exists in db
    if(existingUser) {
        return res.status(400).json({msg:`The user ${existingUser.username} already exists`})
    }
 
    // if not then hash its password and register him/her in 

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create a new user
    const newUser = await User.create({
        email,
        username,
        password:hashedPassword,
        avatar,
    })

    res.status(200).json({msg:"User registered succesfully", newUser})
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sorry Register failed. Please try again later" });
    console.error(error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try{

    // checking if the user exists in the db or not
    const user = await User.findOne({ username });

    if(!user) {
        return res.status(400).json({msg:"Invalid credentials"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password )
    if(!isPasswordValid){
      return res.status(400).json({msg:"Invalid Credentials"})
    }

    const age= 1000*60*60*24*7

    const token = jwt.sign(
      {
        id: user.id, 
        username: user.username,
        avatar: user.avatar,
        isAdmin: false
      },
      process.env.JWT_SECRET_KEY,
      {expiresIn: age}
    )
    const {password: userPassword, ...userInfo}= user.toObject()
    res.cookie("token",token,{
      httpOnly: true,
      maxAge: age
    })
    .status(200).json(userInfo)

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Sorry Login failed. Please try again later" });
  }
}

export const logout = (req, res )=>{
  res.clearCookie("token").status(200).json({msg:"User logged Out "})
}
