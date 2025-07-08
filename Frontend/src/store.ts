import { configureStore } from "@reduxjs/toolkit";
import fetchAllContent from "./slice/fetchAllContent";
import  fetchAllTagsReducer from "./slice/fetchAllTags";
import postContentReducer from "./slice/postContent";
import CreateTagReducer from "./slice/createTag";

export const store = configureStore({
    reducer: {
        fetchContent : fetchAllContent,
        fetchTagReducer : fetchAllTagsReducer,
        postUserContentReducer: postContentReducer,
        postCreateTagReducer: CreateTagReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;