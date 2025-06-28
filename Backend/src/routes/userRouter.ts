
import express,{ Request, Response } from "express";
import { User } from "../DB";
import { Types } from "mongoose";
import bcrypt from "bcrypt";
const userRouter = express.Router();


userRouter.post("/signup", async (req: Request, res: Response): Promise<any> => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({
      message: "All fields are mandatory",
    });
  }

  const findUser = await User.findOne({userName});
  if(findUser){
    return res.status(400).json({
      message: "User Already Exixts, Please Signin"
    })
  }
  const hashedPassword = await bcrypt.hash(password,5)
  const userId = new Types.ObjectId();
  const user = await User.create({
    userName,
    password: hashedPassword,
    userId
  })

  return res.status(201).json({
    message: "User Account Created Succssfully",
    user: user,
    status: 200
  });
});

export { userRouter };
