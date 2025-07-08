import { configureStore } from "@reduxjs/toolkit";
import fetchAllContent from "./slice/fetchAllContent";
import  fetchAllTagsReducer from "./slice/fetchAllTags";


export const store = configureStore({
    reducer: {
        fetchContent : fetchAllContent,
        fetchTagReducer : fetchAllTagsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;