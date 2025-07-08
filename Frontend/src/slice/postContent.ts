import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ContentBody {
    link: string;
    type: string;
    title: string;
    description: string;
    tags: string;
    userId: string;
  }

export const postUserContent = createAsyncThunk("postUserContent", async (contentData: ContentBody)=>{
    const response = await axios.post(import.meta.env.VITE_API_URL_POST_USER_CONTENT, contentData);
    return response.data;
});

const postUserContentSlice = createSlice({
    name : "postUserContent",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(postUserContent.pending, (state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(postUserContent.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(postUserContent.rejected, (state,action)=>{
            state.isError = true;
        })
    }
});

export default postUserContentSlice.reducer;