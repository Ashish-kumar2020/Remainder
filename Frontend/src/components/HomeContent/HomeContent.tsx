import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContent } from "../../slice/fetchAllContent";
import type { AppDispatch ,RootState} from "../../store";
import { useSelector } from "react-redux";


const HomeContent = () => {
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

  if(isLoading){
    return <p>Content is beign loading...Please wait</p>
  }

  if(isError){
    return <p>There is some error while fetching the content</p>
  }

  if(data){
    console.log(data)
  }
  return (
    <div className="bg-white dark:bg-gray-900">HomeContent</div>
  );
};

export default HomeContent;
