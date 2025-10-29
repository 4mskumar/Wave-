import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useUserStore } from "../../app/UserStore";

const Navbar = () => {
  const { user } = useUser();
  const {setUserData} = useUserStore()
  const hiddenButtonUserSettings = useRef();
  const [greeting, setGreeting] = useState("");
  // console.log(user);
  // const userName =
  //   user?.username
  //     ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
  //     : "User";

  const openUserSettings = () => {
    hiddenButtonUserSettings.current
      ?.querySelector("button")
      ?.click();
  };

  useEffect(() => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
  
     
    }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between shadow-md z-50">
      
      <div className="flex items-center flex-shrink-0">
        {/* <h1 className="text-zinc-900 text-2xl font-medium tracking-tighter">wave</h1> */}
        <img src="/images/wave-logo.png" className="w-25" alt="wave" />
      </div>

      {/* <Button onClick={() => setUserData(user.clerkId, user.username, user.fullName, user.imageUrl)}>
        Refresh info
      </Button> */}
      <div>
      {/* {greeting && (
            <div className="text-orange-800 text-center font-semibold mb-2">
              {greeting}, {user?.firstName || "friend"}!
            </div>
          )} */}
      </div>
      {/* Right side */}
      <div className="flex items-center gap-6">
          {greeting && (
            <div className="text-orange-800 text-center font-semibold mb-2 text-sm hidden md:block lg:block mt-3">
              {greeting}, {user?.firstName || "friend"}!
            </div>
          )}
          <Button
            onClick={openUserSettings}
            className="border-gray-300 bg-gray-300 h-8 w-8 rounded-full p-0 flex items-center justify-center hover:bg-black hover:text-white"
            variant="secondary"
          >
            <Settings size={18}/>
          </Button>
      </div>
        <div ref={hiddenButtonUserSettings} className="hidden absolute right-0">
          <UserButton afterSignOutUrl="/" />
        </div>
    </nav>
  );
};

export default Navbar;
