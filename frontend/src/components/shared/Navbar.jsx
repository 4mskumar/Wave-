import { CiSearch } from "react-icons/ci";
import { Badge } from "@/components/ui/badge";
import { BsGrid3X3Gap } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useRef } from "react";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const { user } = useUser();
  const hiddenButtonUserSettings = useRef();

  const userName =
    user?.username
      ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
      : "User";

  const openUserSettings = () => {
    hiddenButtonUserSettings.current
      ?.querySelector("button")
      ?.click();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <h1 className="text-zinc-900 text-2xl font-medium tracking-tighter">wave</h1>
      </div>

      {/* Search bar */}
      <div className="hidden md:flex items-center justify-center border-2 rounded-full px-3 sm:px-4 py-1 sm:py-2 w-[45%] sm:w-[40%] md:w-[35%] lg:w-[40%] xl:ml-109 md:ml-47 mx-auto">
        <CiSearch className="text-gray-500" size={22} />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 bg-transparent outline-none w-full text-sm sm:text-base"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          {/* Settings Button (opens Clerk User Settings) */}
          <Button
            onClick={openUserSettings}
            className="border-gray-300 bg-gray-200 h-8 w-8 rounded-full p-0 flex items-center justify-center hover:bg-blue-500"
            variant="secondary"
          >
            <Settings size={18} className="text-gray-700" />
          </Button>
        </div>

        {/* Hidden Clerk UserButton (used as modal trigger) */}
      </div>
        <div ref={hiddenButtonUserSettings} className="hidden absolute right-0">
          <UserButton afterSignOutUrl="/" />
        </div>
    </nav>
  );
};

export default Navbar;
