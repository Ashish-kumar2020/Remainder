import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Tag {
    _id: string;
    title: string;
   
  }
  
  export interface User {
    _id: string;
    firstName: string;
  }
  
  export interface ContentItem {
    _id: string;
    link: string;
    type: string;
    title: string;
    tags: Tag[];
    userId: User;
    __v: number;
    description: string;
  }

  export interface FetchUserContentResponse {
    message: string;
    status: number;
    searchUser: ContentItem[];
  }
  // ✅ Define slice state type
interface FetchContentState {
    isLoading: boolean;
    isError: boolean;
    data: FetchUserContentResponse | null;
  }
  
  // ✅ Initial state
  const initialState: FetchContentState = {
    isLoading: false,
    isError: false,
    data: null,
  };
export const fetchContent = createAsyncThunk(
    "fetchContent", async (userID:string)=>{ 
        const response = await axios.get<FetchUserContentResponse>(
            `${import.meta.env.VITE_API_URL_FETCH_USER_CONTENT}/${userID}`
          );
        return response.data;
    }
)

const fetchContentSlice = createSlice({
    name : "fetchContent",
    initialState,
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