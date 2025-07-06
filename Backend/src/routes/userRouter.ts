
import express,{ Request, Response } from "express";
import { Content, Links, Tag, User } from "../DB";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import config from "../config";
import {  random } from "../utils";
const userRouter = express.Router();



// Sign up endpoint
userRouter.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { userName, password, firstName,lastName } = req.body;

    if (!userName || !password || !firstName || !lastName) {
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
      firstName,
      lastName
    });
  

    return res.status(200).json({
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
        token,
        userID: findUser.userId
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


// Post the content
userRouter.post("/postcontent", async(req:Request, res:Response): Promise<any>=>{
  try {
    const {link,type,title,tags,userId,description} = req.body;
    if(!link || !type || !title || !tags ||!userId || !description){
      return res.status(400).json({
        message: "All Fields Are Mandatory",
        status: 400
      })
    }
    // search for user
    const searchUser = await User.findOne({_id: userId});
    if(!searchUser){
      return res.status(400).json({
        message: "No User Found with these credentials",
        status: 400
      })
    }

    const createdContent = await Content.create({
      link,
      type,
      title,
      tags,
      userId,
      description
    })
    const userContent = await createdContent.populate([
      {path: "userId", select:"userName"},
      {path: "tags",select: "title"} 
    ])
    return res.status(200).json({
      message: "Content Created Successfully",
      status: 200,
      userContent
    })

  } catch (error: any) {
    console.error("Error while Posting Content:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
  
})

// get content 
userRouter.get("/fetchcontent/:userId", async(req:Request, res:Response): Promise<any> =>{
  try {
    const {userId} = req.params
    if(!userId){
      return res.status(400).json({
        message: "All Fields Are Mandatory",
        status: 400
      })
    }

    const searchUser = await Content.find({userId}) 
    .populate({ path: "userId", select: "firstName" })
    .populate({ path: "tags", select: "title" });;
  
    if(!searchUser){
      return res.status(400).json({
        message: "User Not Found",
        status: 400
      })
    }
    
    
    return res.status(200).json({
      message: "User Content Fetched Successfully",
      status: 200,
      searchUser
    })
  } catch (error: any) {
    console.error("Error while Fetching Content:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
})
// create tag
userRouter.post("/createtag", async(req: Request, res: Response): Promise<any>=>{
  try {
    const {title} = req.body;
    if(!title){
      return res.status(400).json({
        message: "All Fields Are Mandatory",
        status: 400
      })
    }
    const tagId = new Types.ObjectId();
    const tags = await Tag.create({
      title,
      tagId
    })
    return res.status(200).json({
      message: "Tag Created Successfully",
      tags,
      status: 200
    })
  } catch (error: any) {
    console.error("Error while Creating Tag:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
})


// delete content
userRouter.delete("/deletecontent", async(req:Request, res:Response):Promise<any> =>{
  try {
    const {contentId,userId} = req.body;
    if(!contentId || !userId){
      return res.status(400).json({
        message: "All Fileds are mandatory",
        status: 400
      })
    }

    const searchContent = await Content.deleteOne({_id: new mongoose.Types.ObjectId(contentId)});
    if(searchContent.deletedCount === 0){
      return res.status(400).json({
        message: "Content does not exists or already deleted",
        status: 400
      })
    }
    const searchUser = await Content.find({ userId })
    .populate({ path: "userId", select: "firstName" })
    .populate({ path: "tags", select: "title" });

    if(!searchUser){
      return res.status(400).json({
        message: "User Not Found",
        status: 400
      })
    }
    
    
    return res.status(200).json({
      message: "Content Deleted Successfully",
      status: 200,
      searchUser
    })
    
  } catch (error: any) {
    console.error("Error while deleting content:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
})


// generate a shareable link
userRouter.post("/sharelink", async (req: Request, res: Response): Promise<any> => {
  try {
    const { share, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "All Fields Are Mandatory",
        status: 400,
      });
    }

    if (share) {
      let existing = await Links.findOne({ userId });
      if (existing) {
        return res.status(200).json({
          message: "Link already exists",
          status: 200,
          shareableLink: existing,
        });
      }

      const hash = random(20);
      const shareableLink = await Links.create({
        userId,
        hash,
      });

      return res.status(200).json({
        message: "Link Generated",
        status: 200,
        shareableLink,
      });
    } else {
      const deleteResult = await Links.deleteOne({ userId });

      return res.status(200).json({
        message: deleteResult.deletedCount > 0 ? "Link Deleted" : "No Link to Delete",
        status: 200,
      });
    }
  } catch (error: any) {
    console.error("Error generating/deleting share link:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// send content based on link
// userRouter.get("/senddetails/:link", async (req: Request, res: Response): Promise<any> => {
//   try {
//     const hash = req.params.link;
    
//     const link = await Content.findOne({ link: hash })
//     .populate({ path: "tags", select: "title" })
//     .populate({ path: "userId", select: "firstName" });
//     if (!link) {
//       return res.status(400).json({
//         message: "Sorry, incorrect link or link expired",
//         status: 400
//       });
//     }
//     const sharedContent = await Content.find({ userId: link.userId })
//       .populate({ path: "tags", select: "title" }) 
//       .populate({ path: "userId", select: "firstName" }); 

//     return res.status(200).json({
//       message: "All contents of the user",
//       status: 200,
//       link
//     });
//   } catch (error: any) {
//     console.error("Error fetching shared content:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       error: error.message
//     });
//   }
// });
userRouter.get("/senddetails/:link", async (req: Request, res: Response): Promise<any> => {
  try {
    const hash = req.params.link;

    const content = await Content.findOne({ link: hash })
    .populate("tags", "title")
    .populate("userId", "firstName"); 

    if (!content) {
      return res.status(404).send("<h2>Link not found or expired</h2>");
    }
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${content.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f3f4f6;
            padding: 2rem;
            display: flex;
            justify-content: center;
          }
          .card {
            background-color: #fff;
            max-width: 600px;
            width: 100%;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            border: 1px solid #e5e7eb;
          }
          .card h1 {
            font-size: 1.8rem;
            color: #1f2937;
            margin-bottom: 0.75rem;
          }
          .card p.description {
            font-size: 0.95rem;
            color: #4b5563;
            margin-bottom: 1rem;
          }
          .tags {
            margin-bottom: 1rem;
          }
          .tags span {
            display: inline-block;
            background-color: #e0f2fe;
            color: #0369a1;
            font-size: 0.75rem;
            padding: 4px 10px;
            margin: 3px;
            border-radius: 6px;
          }
          .uploader {
            font-size: 0.85rem;
            color: #6b7280;
            margin-bottom: 1rem;
          }
          .image-preview {
            width: 100%;
            max-height: 300px;
            object-fit: contain;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            background: #f9fafb;
            padding: 8px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>${content.title}</h1>
          <p class="description">${content.description}</p>

          <div class="tags">
          ${
            Array.isArray(content.tags)
              ? content.tags.map((tag: any) => `<span>${tag.title}</span>`).join("")
              : ""
          }
        </div>
        <div>
        Uploaded By - ${typeof content.userId === 'object' && 'firstName' in content.userId ? content.userId.firstName : 'Unknown'}
      </div>
      
        </div>
      </body>
      </html>
    `;

    // res.send(html);
    res.send(html)
  } catch (err) {
    console.error("Error rendering card:", err);
    res.status(500).send("<h2>Internal Server Error</h2>");
  }
});


export { userRouter };
