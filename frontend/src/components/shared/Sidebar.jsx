import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { BiMessageRounded } from "react-icons/bi";
import { FiUser, FiSettings } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth, UserButton, useUser } from "@clerk/clerk-react";
import useUserPostStore from "../../app/UserPostStore";
import { useUserStore } from "../../app/UserStore";
import { MdOutlineAddBox } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import SharePost from "../SharePost";


const Sidebar = () => {
  const location = useLocation();
  const hiddenUserButtonRef = useRef(null);
  const { posts } = useUserPostStore();
  const { user } = useUser();
  const {userId} = useAuth()
  const {following, followers, getFollowers} = useUserStore()
  // console.log(followers);

  useEffect(() => {
    if(userId && user){
      getFollowers(userId)
    }
  }, [userId, user])

  let sideBarUsers = [...followers, followers]
  
  const navItems = [
    { label: "Feed", icon: HiOutlineHome, path: "/home" },
    { label: "Search", icon: IoIosSearch, path: "/" },
    { label: "Messages", icon: BiMessageRounded, path: "/chat" },
    { label: "Profile", icon: FiUser, path: "/profile" },
  ];

  return (
    <>
      {/* Desktop and medium screen Sidebar */}
      <aside className=" hidden md:flex fixed top-16 left-0 w-80 h-full border-r  shadow-sm px-6 py-8 flex-col justify-between z-40">
        <Card className="border-none shadow-none">
          <CardHeader className="flex flex-row items-center gap-3 p-0 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user?.imageUrl}
                className="w-full h-full object-cover"
                alt={user?.fullName}
              />
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

          <CardContent className="space-y-5 -mt-3 p-0">
            <div className="flex justify-between items-center text-left">
              {[
                {
                  label: "Following",
                  value: Array.isArray(following) ? following.length : 0,
                },
                {
                  label: "Followers",
                  value: Array.isArray(followers) ? followers.length : 0,
                },
                {
                  label: "Posts",
                  value: Array.isArray(posts) ? posts.length : 0 || 0,
                },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-bold text-xl tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            <nav className="space-y-2 ">
              {navItems.map(({ label, icon: Icon, path }, index) => (
                <Link key={index} to={path}>
                  <Button
                    variant={location.pathname === path ? "secondary" : "ghost"}
                    className={`mb-2 w-full cursor-pointer justify-start gap-3 text-[18px] tracking-tight font-medium ${
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
              <Button
                variant="ghost"
                onClick={() => {<SharePost/>}}
                className="w-full justify-start gap-3 text-[16px] tracking-tight font-medium text-zinc-600 hover:text-zinc-900"
              >
                <div className="w-full sm:w-auto mt-2 sm:mt-0 flex justify-end">
                <SharePost />
              </div>
              </Button>

              {/* Settings */}
              <Button
                variant="ghost"
                onClick={() =>
                  hiddenUserButtonRef.current?.querySelector("button")?.click()
                }
                className="w-full justify-start gap-3 text-[16px] tracking-tight font-medium text-zinc-600 hover:text-zinc-900"
              >
                <FiSettings size={18} />
                Settings
              </Button>
            </nav>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-center p-0">
          <Badge
            variant="secondary"
            className="px-3 py-1 text-xs text-muted-foreground bg-zinc-100 border border-zinc-200"
          >
            Wave © {new Date().getFullYear()}
          </Badge>

          {/* Hidden Clerk UserButton */}
          <div ref={hiddenUserButtonRef} className="hidden">
            <UserButton afterSignOutUrl="/" />
          </div>
        </CardFooter>
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
              className={`${
                location.pathname === path
                  ? "text-black"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            />
            <span
              className={`text-[11px] ${
                location.pathname === path
                  ? "text-black font-medium"
                  : "text-zinc-500"
              }`}
            >
              {label}
            </span>
          </Link>
        ))}
        {/* Settings icon on mobile */}
        <button
          onClick={() =>
            hiddenUserButtonRef.current?.querySelector("button")?.click()
          }
          className="flex flex-col items-center gap-1"
        >
          <FiSettings size={22} className="text-zinc-500 hover:text-zinc-800" />
          <span className="text-[11px] text-zinc-500">Settings</span>
        </button>

        {/* Hidden Clerk UserButton */}
        <div ref={hiddenUserButtonRef} className="hidden">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
