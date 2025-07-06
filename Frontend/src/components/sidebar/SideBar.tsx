import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [active, setActive] = useState("Home");
  const items = [
    { name: "Home", path: "/homepage" },
    { name: "Youtube", path: "/homepage/youtubecontent" },
    { name: "Image", path: "/image" },
    { name: "Tweet", path: "/tweet" },
  ];

  const navigate = useNavigate()
  return (
    <div className="bg-white dark:bg-gray-900 w-[20%]  p-[22px]">
      <ul className="mt-[63px]">
        {items.map((item) => (
          <li
            key={item.name}
            onClick={() => {
              setActive(item.name)
              navigate(item.path)
            }}
            className={`block py-2 px-3 rounded-sm md:p-0 cursor-pointer mb-[30px]
              ${
                active === item.name
                  ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                  : "text-gray-900 dark:text-white"
              }
              hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
            `}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
