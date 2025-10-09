import { CiSearch } from "react-icons/ci";
import { Badge } from "@/components/ui/badge";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const {user} = useUser()
  const userName = user.username[0].toUpperCase() + user.username.slice(1,)
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
          <Link to="/profile">
            <UserButton />
          </Link>
          <h2 className="font-semibold text-[19px] tracking-tight">
            {userName}
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
