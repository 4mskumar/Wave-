import { CiSearch } from "react-icons/ci";
import Navbar from "./shared/Navbar";
import { GoArrowLeft } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen px-4">
        {/* MESSAGES SECTION */}
        <div className="w-1/3 border-r border-gray-300 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to={"/"}>
              <GoArrowLeft className="cursor-pointer" size={25} />
            </Link>
            <h2 className="font-semibold tracking-tighter text-2xl">
              Messages
            </h2>
            <RxDotsHorizontal className="cursor-pointer" size={20} />
          </div>
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

          <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm">
            {[
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
            ].map((chat, i) => (
              <div
                key={i}
                className="p-4 hover:bg-gray-100 transition-colors duration-150 cursor-pointer border-b flex items-start gap-3 justify-between"
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
                    <div className="flex justify-between items-center">
                      <p className="tracking-wide font-semibold text-gray-800 text-md truncate">
                        {chat.name}
                      </p>
                    </div>
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

        {/* CHATTING SECTION */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center">
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
      </div>
    </>
  );
};

export default Chat;
