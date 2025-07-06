import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchContent, type ContentItem } from "../../slice/fetchAllContent";
import type { AppDispatch ,RootState} from "../../store";
import { useSelector } from "react-redux";
import ContentCard from "../Pages/ContentCard";
import TweetCard from "../Pages/TweetCard";


const TweetContent = () => {
  const [tweetContent, setTweetContent] = useState<ContentItem[]>([]);

  const dispatch = useDispatch<AppDispatch>(); 
  const { data, isLoading, isError } = useSelector(
    (state: RootState) => state.fetchContent
  );
  useEffect(() => {
    const userID = localStorage.getItem("userID")
    if(userID){
      dispatch(fetchContent(userID));
    }
  }, [dispatch]);

  
  useEffect(() => {
    if (data?.searchUser) {
      const filtered = data.searchUser.filter(
        (category) => category.type === "tweet"
        );
        setTweetContent(filtered);
      }
    }, [data]);
    
    
    if(isLoading){
      return <p>Content is beign loading...Please wait</p>
    }
  
    if(isError){
      return <p>There is some error while fetching the content</p>
    }

  return (
    <div className="bg-white dark:bg-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-[70px]">
    {tweetContent.map((item) => (
      <TweetCard key={item._id} item={item} />
    ))}
  </div>
  );
};

export default TweetContent;
