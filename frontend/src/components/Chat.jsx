import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Navbar from "./shared/Navbar";
import { GoArrowLeft } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useUserStore } from "../app/UserStore";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const {userId} = useAuth()
  const {user} = useUser()
  const {followers, getFollowers, setUserData} = useUserStore()

  useEffect(() => {
    if(userId && user){
      getFollowers(userId)
    }
  }, [userId, user])

  return (
    <>
      <Navbar />
      <div className="flex pt-15 sm:pt-0 overflow-hidden bg-white">
        {/* CHAT LIST */}
        <div
          className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300
            ${
              selectedChat
                ? "hidden md:flex w-full md:w-[30%]"
                : "w-full md:w-[30%]"
            }`}
        >
          {/* Header */}
          <div className="flex sm:mt-16 mt-1 items-center justify-between p-2 sm:p-4 border-b">
            <Link to="/home" className="">
              <GoArrowLeft className="cursor-pointer" size={24} />
            </Link>
            <h2 className="font-semibold tracking-tighter text-lg sm:text-2xl">
              Messages
            </h2>
            <RxDotsHorizontal
              className="cursor-pointer text-gray-600"
              size={20}
            />
          </div>

          {/* Search Bar */}
          <div className="px-4 py-2">
            <div className="flex items-center bg-gray-200 rounded-full px-3 py-2">
              <CiSearch className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search messages"
                className="ml-2 bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto ml-2">
            {followers.map((chat, i) => (
              <div
                key={i}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center justify-between p-3 sm:p-4 border-b cursor-pointer 
                  transition-colors duration-200 ${
                    selectedChat?.username === chat.username
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar>
                    {chat.imageUrl ? (
                      <AvatarImage src={chat.imageUrl} />
                    ) : (
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      {chat.username}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {'Hello'}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
                  {'04:22'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT AREA */}
        <div
          className={`sm:mt-17 mt-14 fixed top-0 right-0 bottom-0 flex flex-col w-full md:w-[70%] transition-all duration-300 ${
            selectedChat ? "flex" : "hidden md:flex"
          }`}
        >
          {!selectedChat ? (
            <div className=" flex-1 flex flex-col items-center justify-center text-center p-6 bg-gray-50">
              <div className="bg-gray-100 p-4 rounded-full text-3xl mb-4">
                💬
              </div>
              <h2 className="font-semibold tracking-tighter text-xl sm:text-2xl">
                Your Messages
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                Send private photos and messages to a friend or group.
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full bg-gray-50">
              {/* Header */}
              <div className="flex items-center gap-4 border-b bg-gray-200 p-3 sm:p-2 ">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden text-gray-600"
                >
                  <GoArrowLeft size={22} />
                </button>
                <Avatar>
                  {selectedChat.imageUrl ? (
                    <AvatarImage src={selectedChat.imageUrl} />
                  ) : (
                    <AvatarFallback>
                      {selectedChat.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold text-base sm:text-lg">
                    {selectedChat.username}
                  </p>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-sm text-gray-700 text-center ">
                  This is the start of your chat with{" "}
                  <span className="font-semibold">{selectedChat.username}</span>.
                </p>
              </div>

              {/* Message Input */}
              <div className="border-t bg-white p-2 sm:p-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Message..."
                  className="flex-1 border rounded-full px-3 sm:px-4 py-2 outline-none text-sm bg-gray-100 focus:ring-1 focus:ring-gray-300"
                />
                <button className="bg-black text-white px-4 sm:px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition">
                  Wave
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
