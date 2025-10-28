import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useUserStore } from "../app/UserStore";

const SearchP = () => {
  const [open, setOpen] = useState(false);
  const [searchedUser, setSearchedUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // bring in all global users
  const { globalUsers, getGlobalUsers } = useUserStore();

  useEffect(() => {
    getGlobalUsers(); // fetch user list if not already
  }, [getGlobalUsers]);

  useEffect(() => {
    const handleSearch = (input) => {
      if (input === "") {
        setFilteredUsers(globalUsers);
        return;
      }
      const lower = input.toLowerCase();
      const filter = globalUsers.filter((user) => {
        const username = user?.username?.toLowerCase() || "";
        const fullName = user?.fullName?.toLowerCase() || "";
        return username.includes(lower) || fullName.includes(lower);
      });
      setFilteredUsers(filter);
    };

    handleSearch(searchedUser);
  }, [searchedUser, globalUsers]);

  return (
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
        className="w-80 mb-5 bg-gray-100 border ml-1 h-[600px] shadow-2xl"
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

        <div className="text-sm text-gray-500 mt-4">Recent</div>

        {/* USERS */}
        <div className="mt-2 space-y-2">
          {searchedUser ? (
            filteredUsers.length > 0 ? (
              filteredUsers.map((val, ind) => (
                <HoverCard key={ind}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-3 border-gray-200 p-3 hover:bg-gray-200 cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            val.imageUrl
                              ? val.imageUrl
                              : `https://api.dicebear.com/7.x/initials/svg?seed=${val.username}` //if no pfp
                          }
                          alt={val.username}
                        />
                        <AvatarFallback>
                          {val.username?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-700">@{val.username}</p>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent
                    side="right"
                    className="w-64 p-4 shadow-xl bg-white rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={
                            val.imageUrl
                              ? val.imageUrl
                              : `https://api.dicebear.com/7.x/initials/svg?seed=${val.username}`
                          }
                          alt={val.username}
                        />
                        <AvatarFallback>
                          {val.username?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {val.fullName || val.username}
                        </p>
                        <p className="text-sm text-gray-500">@{val.username}</p>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-700">
                      {val.bio ? val.bio : "No bio!"}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))
            ) : (
              <p className="text-sm text-gray-500">No users found.</p>
            )
          ) : (
            <div className="flex h-[40vh] justify-center items-center">
              <p className="text-zinc-600/90 font-light tracking-tight">
                search here
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchP;
