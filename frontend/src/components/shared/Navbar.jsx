import { CiSearch } from "react-icons/ci";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div>
      <nav className=" px-15 py-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {/* <img src="" alt="w" /> */}
          <h1 className="cedarville font-semibold text-3xl text-blue-500">WAVE</h1>
        </div>

        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-1/4">
          <CiSearch className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 bg-transparent outline-none w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-6">
          <BsGrid3X3Gap className="text-lg cursor-pointer" />
          <BiMessageRounded className="text-lg cursor-pointer" />
          <IoNotificationsOutline className="text-lg cursor-pointer" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm cursor-pointer hover:bg-blue-400">
              AK
            </div>
            <h2 className="font-medium text-lg">Aditya Kr</h2>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
