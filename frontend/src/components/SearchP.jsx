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
import { useNavigate } from "react-router-dom";

const SearchP = () => {
  const [open, setOpen] = useState(false);
  const [searchedUser, setSearchedUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { globalUsers, getGlobalUsers } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    getGlobalUsers();
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
    <>
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

        {/* Desktop popover */}
        <PopoverContent
          align="start"
          side="right"
          className="hidden sm:block w-80 mb-5 bg-gray-100 border ml-1 h-[600px] shadow-2xl"
        >
          <SearchBox
            searchedUser={searchedUser}
            setSearchedUser={setSearchedUser}
            setOpen={setOpen}
            filteredUsers={filteredUsers}
            navigate={navigate}
          />
        </PopoverContent>
      </Popover>

      {/* Mobile modal version */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-[60] flex justify-center items-end bg-black/40 backdrop-blur-sm">
          <div className="w-full bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold">Search</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black text-lg"
              >
                ✕
              </button>
            </div>
            <SearchBox
              searchedUser={searchedUser}
              setSearchedUser={setSearchedUser}
              setOpen={setOpen}
              filteredUsers={filteredUsers}
              navigate={navigate}
            />
          </div>
        </div>
      )}
    </>
  );
};

const SearchBox = ({
  searchedUser,
  setSearchedUser,
  setOpen,
  filteredUsers,
  navigate,
}) => (
  <>
    <div className="flex justify-between items-center gap-2 mb-3">
      <Search className="h-4 w-4 text-gray-500" />
      <Input
        placeholder="Search..."
        autoFocus
        value={searchedUser}
        onChange={(e) => setSearchedUser(e.target.value)}
      />
      <button
        onClick={() => setSearchedUser("")}
        className="text-xs hover:text-gray-700 cursor-pointer"
      >
        ✕
      </button>
    </div>

    <div className="text-sm text-gray-500 mt-4">Recent</div>

    <div className="mt-2 space-y-2">
      {searchedUser ? (
        filteredUsers.length > 0 ? (
          filteredUsers.map((val, ind) => (
            <HoverCard key={ind}>
              <HoverCardTrigger asChild>
                <div
                  onClick={() => {
                    setOpen(false);
                    navigate(`/user/${val.clerkId}`);
                  }}
                  className="flex items-center gap-3 border-gray-200 p-3 hover:bg-gray-200 cursor-pointer rounded-md"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        val.imageUrl ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${val.username}`
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
                className="hidden sm:block w-64 p-4 shadow-xl bg-white rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        val.imageUrl ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${val.username}`
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
                  {val.bio || "No bio!"}
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
            Search here
          </p>
        </div>
      )}
    </div>
  </>
);

export default SearchP;
