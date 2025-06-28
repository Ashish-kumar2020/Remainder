
import express,{ Request, Response } from "express";
import { User } from "../DB";
import { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import config from "../config";
const userRouter = express.Router();



// Sign up endpoint
userRouter.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
        status: 400
      });
    }

    const findUser = await User.findOne({ userName });
    if (findUser) {
      return res.status(400).json({
        message: "User already exists, please sign in",
        status: 400
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const userId = new Types.ObjectId();

    const user = await User.create({
      userName,
      password: hashedPassword,
      userId,
    });

    return res.status(201).json({
      message: "User account created successfully",
      user,
      status: 200,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});


// Login end point
userRouter.post("/signin", async(req: Request, res: Response): Promise<any> =>{
  try {
    const {userName, password} = req.body;
    if(!userName || !password){
      return res.status(400).json({
        message: "All Fileds Are Mandantory",
        status: 400
      })
    }

    const findUser = await User.findOne({userName});
    if(!findUser){
      return res.status(400).json({
        message: "User Does not exists, Please Create a new account",
        status: 400
      })
    }
    const matchPassword = await bcrypt.compare(password,findUser.password);
    if(!matchPassword){
      return res.status(400).json({
        message: "Invalid Credentials",
        status: 400
      })
    }
    if(matchPassword && findUser){
      const token = jwt.sign({user: findUser.userName},config.JWT_SCERET,{
        expiresIn: "2h"
      })
      return res.status(200).json({
        message: "Login Successfully",
        status: 200,
        token
      })
    }

  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
 

})

export { userRouter };
