import mongoose from "mongoose"

export interface IUser{
    userName: string,
    password: string
}

export interface ITag{
    title: string
}

export interface IContent{
    link: string,
    type: 'image'| 'video'|'article'|'audio',
    title: string,
    tags: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
}