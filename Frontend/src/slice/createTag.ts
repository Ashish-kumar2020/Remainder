import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


interface CreateTagBody{
    title: string
}

export const createTagForContent = createAsyncThunk("createTagForContent", async (title: CreateTagBody)=>{
    const response = await axios.post(import.meta.env.VITE_API_URL_CREATE_TAG, title);
    return response.data;
});

const createTagForContentSlice = createSlice({
    name : "createTagForContent",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(createTagForContent.pending, (state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(createTagForContent.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(createTagForContent.rejected, (state,action)=>{
            state.isError = true;
        })
    }
})

export default createTagForContentSlice.reducer;