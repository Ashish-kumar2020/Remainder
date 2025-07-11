import mongoose, { ObjectId } from "mongoose"

export interface IUser{
    userName: string,
    password: string,
    userId: ObjectId,
    firstName: string,
    lastName: string
}

export interface ITag{
    title: string,
    tagId: ObjectId
}

export interface IContent{
    link: string,
    type: 'image'| 'video'|'article'|'audio',
    title: string,
    tags: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    description: string
}

export interface ILink{
    hash: string,
    userId: mongoose.Types.ObjectId
}