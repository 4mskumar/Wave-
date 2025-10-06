import { CiSearch } from "react-icons/ci";
import { Badge } from "@/components/ui/badge"
import { BsGrid3X3Gap } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white px-10 py-4 flex items-center justify-between shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <h1 className="font-semibold text-3xl text-blue-500">WAVE</h1>
      </div>

      <div className="flex items-center rounded-full px-4 py-2 w-1/3 border-2">
        <CiSearch className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 bg-transparent outline-none w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* <BsGrid3X3Gap className="text-lg cursor-pointer" />
        <BiMessageRounded className="text-lg cursor-pointer" />
        <IoNotificationsOutline className="text-lg cursor-pointer" /> */}

        <div className="flex items-center gap-3">
         
        <Badge
          className="border-gray-300 bg-gray-200 h-7 min-w-7 rounded-full px-1 font-mono tabular-nums text-md cursor-pointer hover:bg-blue-500"
          variant="secondary"
        >
          AK
        </Badge>
          <h2 className="font-medium text-lg tracking-wide">Aditya Kr</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
