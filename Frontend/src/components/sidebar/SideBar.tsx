import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { name: "Image", path: "/homepage" },
    { name: "Youtube", path: "/homepage/youtubecontent" },
    { name: "Tweet", path: "/homepage/tweet" },
  ];

  // Determine if current path matches the item's path
  const getItemClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `block py-2 px-3 rounded-sm md:p-0 cursor-pointer mb-[30px]
      ${
        isActive
          ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
          : "text-gray-900 dark:text-white"
      }
      hover:bg-blue-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
    `;
  };

  return (
    <div className="bg-white dark:bg-gray-900 w-[17%] p-[22px]">
      <ul className="mt-[63px]">
        {items.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className={getItemClasses(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
