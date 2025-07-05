import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchContent = createAsyncThunk(
    "fetchContent", async ()=>{
        const response = await axios.get(import.meta.env.VITE_API_URL_FETCH_USER_CONTENT);
        return response.data;
    }
)

const fetchContentSlice = createSlice({
    name : "fetchContent",
    initialState: {
        isLoading: false,
        isError: false,
        data: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContent.pending, (state,action)=>{
            state.isLoading = true
        });
        builder.addCase(fetchContent.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchContent.rejected, (state,action)=>{
            state.isError = true
        })
    }
});

export default fetchContentSlice.reducer;