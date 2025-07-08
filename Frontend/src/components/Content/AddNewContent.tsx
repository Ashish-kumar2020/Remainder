import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { FetchTagState } from "../../slice/fetchAllTags";
import fetchAllTagsReducer, { fetchAllTags } from "../../slice/fetchAllTags";
import type { AppDispatch } from "../../store";
import { postUserContent } from "../../slice/postContent";

interface AddNewContentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContentBody {
  link: string;
  type: string;
  title: string;
  description: string;
  tags: string;
  userId: string;
}

interface TagContent{
  tagId: string;
  title: string;
  _id: string;
}

const AddNewContent = ({ isOpen, onClose }: AddNewContentProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tagData, setTagData] = useState<TagContent[]>([])
  const [contentData, setContentData] = useState<ContentBody>({
    link: "",
    type: "",
    title: "",
    description: "",
    tags: "",
    userId: "",
  });

  const dispatch = useDispatch<AppDispatch>()
  const { data, isLoading, isError } = useSelector(
    (state: RootState) => state.fetchTagReducer
  ) as FetchTagState;
  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  useEffect(() => {
    
    console.log("Fetched Tags:", data?.fetchAllTags);
    if (data) {
      setTagData(data?.fetchAllTags)
    }
  }, [data]);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userID"); 
    if (userIdFromStorage) {
      setContentData((prev) => ({
        ...prev,
        userId: userIdFromStorage,
      }));
    }
  }, []);
  const submitData = (e: any)=>{
    e.preventDefault();
   
    dispatch(postUserContent(contentData));
    console.log(contentData)
  }

      
  if(isLoading){
    return <p>Content is beign loading...Please wait</p>
  }

  if(isError){
    return <p>There is some error while fetching the content</p>
  }

  return (
    <>
      <div
        id="drawer-contact"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex={-1}
        aria-labelledby="drawer-contact-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          <svg
            className="w-4 h-4 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
          Add New Content
        </h5>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        <form className="mb-6" >
          <div className="mb-6">
            <label
              htmlFor="link"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              value={contentData.link}
              onChange={(e) =>
                setContentData({ ...contentData, link: e.target.value })
              }
              placeholder="link of video image or any other thing"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={contentData.title}
              onChange={(e) =>
                setContentData({ ...contentData, title: e.target.value })
              }
              placeholder="Title of content"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={contentData.description}
              onChange={(e) =>
                setContentData({ ...contentData, description: e.target.value })
              }
              placeholder="Your description..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          {/* Content Type */}
          <div className="mb-6">
            <label
              htmlFor="link"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type Of Content
            </label>
            <input
              type="text"
              id="link"
              value={contentData.type}
              onChange={(e) =>
                setContentData({ ...contentData, type: e.target.value })
              }
              placeholder="Enter - youtube/image/tweet"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          {/* Dropdown Toggle */}
          <div className="relative mb-6">
            <button
              type="button"
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-between items-center w-full dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {tagData.find(tag => tag.tagId === contentData.tags)?.title || "Select Tag"}
              <svg
                className="w-3 h-3 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute mt-2 w-full bg-gray-800 text-white rounded-xl shadow-lg z-50 ring-1 ring-black/10 animate-fade-in">
                <ul className="text-sm divide-y divide-gray-700">
                  {tagData.map((tag:TagContent)=>(
                    <li 
                      key={tag.tagId}
                      value={tag.title}
                      className="block px-5 py-3 hover:bg-gray-700 transition cursor-pointer"
                      onClick={()=>{
                        setContentData({...contentData, tags: tag.tagId});
                        setShowDropdown(false);
                      }}
                    >
                      {tag.title}
                    </li>
                  ))}
                </ul>

                <div className="px-4 py-3 border-t border-gray-700 flex gap-2">
                  <input
                    type="text"
                    placeholder="Create New"
                    className="flex-1 bg-gray-700 text-white text-sm rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-sm font-medium px-4 py-2 rounded-lg transition"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={submitData}
            className="mt-6 text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Content
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNewContent;
