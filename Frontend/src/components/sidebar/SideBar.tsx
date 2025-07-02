

const SideBar = () => {
  return (
    <div className="w-[20%] shadow-lg h-[100vh] p-[22px] mt-[80px]">
        <ul className="h-[80vh]">
            <li className="cursor-pointer mb-[20px] font-bold transition duration-300 ease-in-out hover:text-blue-500 text-white">Home</li>
            <li className="cursor-pointer mb-[20px] font-bold transition duration-300 ease-in-out hover:text-blue-500 text-white ">Youtube</li>
            <li className="cursor-pointer mb-[20px] font-bold transition duration-300 ease-in-out hover:text-blue-500 text-white">Docs</li>
            <li className="cursor-pointer mb-[20px] font-bold transition duration-300 ease-in-out hover:text-blue-500 text-white">Tweet</li>
        </ul>
    </div>
  )
}

export default SideBar


/*

    width: 20%;
    border: 2px solid black;
    height: 100vh;
*/