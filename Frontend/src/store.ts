import { configureStore } from "@reduxjs/toolkit";
import fetchAllContent from "./slice/fetchAllContent";


export const store = configureStore({
    reducer: {
        fetchContent : fetchAllContent
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;