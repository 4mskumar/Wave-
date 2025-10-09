import { CiSearch } from "react-icons/ci";
import { Badge } from "@/components/ui/badge"
import { BsGrid3X3Gap } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const {user} = useUser()
  const userName = user.username[0].toUpperCase() + user.username.slice(1,)
  return (
    <nav className="fixed top-0 left-0 w-full bg-white px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <img
          src="/images/wave-logo.png"
          alt="Wave logo"
          className="w-24 sm:w-28 md:w-32 lg:w-30 xl:w-28 transition-all duration-300"
        />
      </div>
      <div className="hidden md:flex items-center justify-center border-2 rounded-full px-3 sm:px-4 py-1 sm:py-2 w-[45%] sm:w-[40%] md:w-[35%] lg:w-[40%] xl:ml-109 md:ml-47 mx-auto">
        <CiSearch className="text-gray-500" size={22} />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 bg-transparent outline-none w-full text-sm sm:text-base"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* <BsGrid3X3Gap className="text-lg cursor-pointer" />
        <BiMessageRounded className="text-lg cursor-pointer" />
        <IoNotificationsOutline className="text-lg cursor-pointer" /> */}

        <div className="flex items-center gap-3">
        <Link to="/profile">
        
        <Badge
          className="border-gray-300 bg-gray-200 h-7 min-w-7 rounded-full px-1 font-mono tabular-nums text-md cursor-pointer hover:bg-blue-500"
          variant="secondary"
        >
          AK
        </Badge>
        </Link> 
            <h2 className="font-semibold text-[19px] tracking-tight">Aditya Kr</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
