

const SideBar = () => {
  return (
    <div className="bg-white dark:bg-gray-900 w-[20%] shadow-lg h-[100vh] p-[22px] ">
        <ul className="h-[80vh] mt-[63px]">
            <li className="cursor-pointer mb-[20px] font-bold transition duration-300 ease-in-out hover:text-blue-500 text-white">Home</li>
            <li className="cursor-pointer mb-[20px] font-bold transition duration-300 ease-in-out hover:text-blue-500 text-white ">Youtube</li>
            <li className="cursor-pointer mb-[20px] font-bold transition duration-300 ease-in-out hover:text-blue-500 text-white">Docs</li>
            <li className="cursor-pointer mb-[20px] font-bold transition duration-300 ease-in-out hover:text-blue-500 text-white">Tweet</li>
        </ul>
    </div>
  )
}

export default SideBar

