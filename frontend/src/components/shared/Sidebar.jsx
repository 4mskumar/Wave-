import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { BiMessageRounded } from "react-icons/bi";
import { FiUser, FiSettings } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import useUserPostStore from "../../app/UserPostStore";
import { useUserStore } from "../../app/UserStore";
import Create from "../Create";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Plus } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [searchedUser, setSearchedUser] = useState('')
  const [showCreate, setShowCreate] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([])
  const location = useLocation();
  const { posts } = useUserPostStore();
  const { user } = useUser();
  const {userId} = useAuth()
  const {following, followers, getFollowers, getGlobalUsers, globalUsers} = useUserStore()

  useEffect(() => {
    if (userId && user) {
      getFollowers(userId);
    }    
  }, [userId, user]);

  useEffect(() => {

  }, [])

  console.log(globalUsers);
  

  const navItems = [
    { label: "Feed", icon: HiOutlineHome, path: "/home" },
    { label: "Messages", icon: BiMessageRounded, path: "/chat" },
    { label: "Profile", icon: FiUser, path: "/profile" },
  ];

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-16 left-0 w-80 h-full border-r shadow-sm px-6 py-8 flex-col justify-between z-40 bg-white">
        <Card className="border-none shadow-none">
          {/* Profile Header */}
          <CardHeader className="flex flex-row items-center gap-3 p-0 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName} />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg tracking-tight leading-tight">
                {user?.fullName || "User"}
              </h2>
              <p className="text-sm text-muted-foreground">
                @{user?.username || "username"}
              </p>
            </div>
          </CardHeader>

          {/* Stats + Nav */}
          <CardContent className="space-y-5 -mt-3 p-0">
            <div className="flex justify-between text-left">
              {[
                { label: "Following", value: following?.length || 0 },
                { label: "Followers", value: followers?.length || 0 },
                { label: "Posts", value: posts?.length || 0 },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-bold text-xl">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Navigation Buttons */}
            <nav className="space-y-2">
              {navItems.map(({ label, icon: Icon, path }, index) => (
                <Link key={index} to={path}>
                  <Button
                    variant={location.pathname === path ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 text-[18px] font-medium ${
                      location.pathname === path
                        ? "bg-zinc-200 text-zinc-900"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Button>
                </Link>
              ))}

              {/* Search Button */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 text-[18px] font-medium ${
                      open
                        ? "bg-zinc-200 text-zinc-900"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  side="right"
                  className="w-70 mb-5 bg-gray-100 border  ml-1 h-[600px] shadow-2xl"
                >
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <Search className="h-4 w-4" />
                    <Input
                      placeholder="Search..."
                      autoFocus
                      value={searchedUser}
                      onChange={(e) => setSearchedUser(e.target.value)}
                      
                    />
                    <button
                      onClick={() => setOpen(false)}
                      className="text-xs hover:text-gray-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">Recent</div>
                  <div className="mt-2 space-y-2">
                    <div className="flex ml-18 h-[40vh] justify-center, items-center">
                      <p className="text-zinc-600/90 font-light tracking-tight">search here</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* CREATE POST */}
              <Button
                variant="ghost"
                onClick={() => setShowCreate(true)}
                className="w-full justify-start gap-3 text-[18px] font-medium text-zinc-600 hover:text-zinc-900 ml-[-18px] mt-[-10px]"
              >
                <Create />
              </Button>
            </nav>
          </CardContent>
        </Card>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-sm flex justify-around items-center py-3 z-50">
        {navItems.map(({ icon: Icon, path, label }, index) => (
          <Link
            key={index}
            to={path}
            className="flex flex-col items-center gap-1"
          >
            <Icon
              size={22}
              className={
                location.pathname === path
                  ? "text-black"
                  : "text-zinc-500 hover:text-zinc-800"
              }
            />
            <span
              className={
                location.pathname === path
                  ? "text-[11px] text-black font-medium"
                  : "text-[11px] text-zinc-500"
              }
            >
              {label}
            </span>
          </Link>
        ))}

        {/* Settings icon on mobile */}
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center gap-1"
        >
          <Search size={22} className="text-zinc-500 hover:text-zinc-800" />
          <span className="text-[11px] text-zinc-500">Search</span>
        </button>
        {/* Create */}
        <button
          onClick={() => setShowCreate(true)}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[11px] text-zinc-500">
            <Create />
          </span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
