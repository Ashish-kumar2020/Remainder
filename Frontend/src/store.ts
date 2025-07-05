import { configureStore } from "@reduxjs/toolkit";
import fetchAllContent from "./slice/fetchAllContent";


export const store = configureStore({
    reducer: {
        fetchContent : fetchAllContent
    }
})