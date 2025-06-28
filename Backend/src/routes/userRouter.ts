
import express,{ Request, Response } from "express";
import { User } from "../DB";
import { Types } from "mongoose";
import bcrypt from "bcrypt";
const userRouter = express.Router();


userRouter.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "All fields are mandatory",
      });
    }

    const findUser = await User.findOne({ userName });
    if (findUser) {
      return res.status(400).json({
        message: "User already exists, please sign in",
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


export { userRouter };
