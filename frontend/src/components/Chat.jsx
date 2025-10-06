import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Navbar from "./shared/Navbar";
import { GoArrowLeft } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    {
      name: "Kanika Bhandari",
      msg: "That's awesome!",
      img: "https://github.com/shadcn.png",
      time: "10:45 AM",
    },
    {
      name: "Prabal",
      msg: "Thanks for the feedback!",
      img: "https://github.com/shadcn.png",
      time: "9:12 AM",
    },
    {
      name: "Harsh",
      msg: "See you tomorrow 👋",
      img: "https://github.com/shadcn.png",
      time: "Yesterday",
    },
    {
      name: "Krishna",
      msg: "See you tomorrow 👋",
      time: "Mon",
    },
    {
      name: "Naira",
      msg: "Thanks for the feedback!",
      img: "https://github.com/shadcn.png",
      time: "9:12 AM",
    },
    {
      name: "Sara",
      msg: "Thanks for the feedback!",
      img: "https://github.com/shadcn.png",
      time: "9:12 AM",
    },
    {
      name: "Aditya",
      msg: "Thanks for the feedback!",
      img: "https://github.com/shadcn.png",
      time: "9:12 AM",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex h-screen px-4 pt-20">
        {/* CHATTING LIST */}
        <div className="w-[28%] border-r border-gray-300 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to={"/"}>
              <GoArrowLeft className="cursor-pointer" size={25} />
            </Link>
            <h2 className="font-semibold tracking-tighter text-2xl">
              Messages
            </h2>
            <RxDotsHorizontal className="cursor-pointer" size={20} />
          </div>

          {/* Search Bar */}
          <div className="px-4 py-2">
            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
              <CiSearch className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search messages"
                className="ml-2 bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto rounded-lg shadow-sm mt-1 ">
            {chats.map((chat, i) => (
              <div
                key={i}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b flex items-start gap-3 justify-between cursor-pointer transition-colors duration-150 hover:bg-gray-200 
                  ${selectedChat?.name === chat.name ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <Avatar>
                    {chat.img ? (
                      <AvatarImage src={chat.img} />
                    ) : (
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>

                  <div className="min-w-0">
                    <p className="tracking-wide font-semibold text-gray-800 text-md truncate">
                      {chat.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{chat.msg}</p>
                  </div>
                </div>

                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {chat.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CHATTING */}
        <div className="flex-1 flex flex-col">
          {!selectedChat ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <div className="flex justify-center mb-3">
                  <div className="bg-gray-100 p-4 rounded-full text-3xl">💬</div>
                </div>
                <h2 className="font-semibold tracking-tighter text-2xl">
                  Your Messages
                </h2>
                <p className="text-gray-500 text-sm">
                  Send private photos and messages to a friend or group.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full ml-2">
              {/* Header */}
              <div className="flex items-center gap-4 border-b p-4">
                <Avatar>
                  {selectedChat.img ? (
                    <AvatarImage src={selectedChat.img} />
                  ) : (
                    <AvatarFallback>
                      {selectedChat.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{selectedChat.name}</p>
                  <p className="text-[13.5px] text-gray-500">Active now</p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <p className="text-sm text-gray-700">
                  This is the start of your chat with{" "}
                  <span className="font-semibold">{selectedChat.name}</span>.
                </p>
              </div>

              <div className="border-t p-3 mb-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Message..."
                  className="flex-1 border rounded-full px-4 py-2 outline-none text-sm bg-gray-200"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600">
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
