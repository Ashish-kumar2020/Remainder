import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




  export interface TagItem{
    tagId: string;
    title: string;
    _id: string;
  }

  export interface FetchUserTagResponse {
    message: string;
    status: number;
    fetchAllTags: TagItem[];
  }

  

  export interface FetchTagState {
    isLoading: boolean;
    isError: boolean;
    data: FetchUserTagResponse|  null;
  }
  const initialState: FetchTagState = {
    isLoading: false,
    isError: false,
    data: null,
  };


 
  export const fetchAllTags = createAsyncThunk("fetchAllTags", async()=>{
    const response = await axios.get<FetchUserTagResponse>(import.meta.env.VITE_API_URL_FETCH_ALL_TAGS_NAME)
    return response.data;
  })

  const fetchAllTagsSlice = createSlice({
    name: "fetchAllTags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllTags.pending, (state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchAllTags.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAllTags.rejected, (state,action)=>{
            state.isError = true;
        })
    }
  });

  export default fetchAllTagsSlice.reducer