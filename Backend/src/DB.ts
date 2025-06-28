import mongoose, { Schema, Types } from "mongoose";
import { IUser,ITag,IContent } from "./Types";


const userSchema = new Schema<IUser>({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userId: {type: mongoose.Types.ObjectId,required: true}
});

const tagSchema = new Schema<ITag>({
  title: { type: String, required: true, unique: true }
});

const contentTypes = ['image', 'video', 'article', 'audio'] as const;

const contentSchema = new Schema<IContent>({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Tag = mongoose.model('Tag', tagSchema);
const User = mongoose.model('User', userSchema);
const Content = mongoose.model('Content', contentSchema);

export { Tag, User, Content };