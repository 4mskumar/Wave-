import { BiMessageRounded } from "react-icons/bi";
import { FiUser, FiSettings } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed top-18 left-0 w-72 h-[calc(100vh-4rem)] border-r border-gray-400 shadow-md  px-10 py-10 flex flex-col justify-between z-40">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Badge
            className="border-gray-300 bg-gray-200 h-9 min-w-9 rounded-full px-1 font-mono tabular-nums text-md cursor-pointer hover:bg-blue-500"
            variant="secondary"
          >
            AK
          </Badge>
          <div>
            <h2 className="font-semibold text-xl">Aditya Kr</h2>
            <p className="text-gray-500 text-xs">@adityakr</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-8">
          <div>
            <p className="font-semibold">80</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
          <div>
            <p className="font-semibold">80</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-semibold">10</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-lg">
          <Link to="/">
            <button
              className={`flex items-center gap-3 py-2 px-3 rounded-md w-full text-left ${
                location.pathname === "/"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <HiOutlineHome size={20} />
              Feed
            </button>
          </Link>

          <Link to="/chat">
            <button
              className={`cursor-pointer flex items-center gap-3 py-2 px-3 rounded-md w-full text-left ${
                location.pathname === "/chat"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BiMessageRounded size={20} />
              Messages
            </button>
          </Link>

          <Link to="/profile">
            <button
              className={`cursor-pointer flex items-center gap-3 py-2 px-3 rounded-md w-full text-left ${
                location.pathname === "/profile"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiUser size={20} />
              Profile
            </button>
          </Link>

          <Link to="/settings">
            <button
              className={`cursor-pointer flex items-center gap-3 py-2 px-3 rounded-md w-full text-left ${
                location.pathname === "/settings"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiSettings size={20} />
              Settings
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
