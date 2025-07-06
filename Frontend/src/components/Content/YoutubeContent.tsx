import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { fetchContent, type ContentItem } from "../../slice/fetchAllContent";
import YoutubeCard from "../Pages/YoutubeCard";



const YoutubeContent = ()=>{
    

    const [youtubeData, setYoutubeData] = useState<ContentItem[]>([])
   

    const {data,isLoading,isError} = useSelector((state: RootState)=> state.fetchContent)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
      const userID = localStorage.getItem("userID");
      if(userID){
        dispatch(fetchContent(userID))
      }
    },[dispatch])

    useEffect(()=>{
      if(data?.searchUser){
        const filtered = data.searchUser.filter((category)=> category.type === "youtube");
        setYoutubeData(filtered)
      }
    },[data])    

    if(isLoading){
      return <p>Content is beign loading...Please wait</p>
    }
  
    if(isError){
      return <p>There is some error while fetching the content</p>
    }
    console.log("Parent Youtube Conetnt")
    return(
      <div className="bg-white dark:bg-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-[70px]">
      {youtubeData.map((item) => (
        <YoutubeCard key={item._id} item={item} />
      ))}
    </div>
    )
}

export default YoutubeContent