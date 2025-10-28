import { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMessageStore } from "../app/UserMessageStore";
import { Image } from "lucide-react";
import { Input } from "./ui/input";

const Chat = () => {
  const [input, setInput] = useState("");
  const { userId } = useAuth();
  const { user } = useUser();

  const {
    messages,
    selectedChat,
    setSelectedChat,
    fetchMessages,
    sendMessage,
    followers,
    getFollowers,
    onlineUsers,
    markMessagesAsSeen,
  } = useMessageStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (userId && user) {
      getFollowers(userId);
    }
  }, [userId, user]);

  useEffect(() => {
    if (selectedChat && userId) {
      fetchMessages(userId, selectedChat.userId);
      markMessagesAsSeen(selectedChat.userId);
    }
  }, [selectedChat, userId]);

  // console.log(messages);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      // send the image to backend
      await sendMessage("", base64Image);
      e.target.value = ""; // reset file input
    };

    reader.readAsDataURL(file);
  };

  const handleSendEnter = (e) => {
    if (!input.trim()) return;
    if (e.key === "Enter") {
      sendMessage(input);
      setInput("");
    }
  };

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
            {followers.length > 0 ? (
              followers.map((f, i) => {
                const isOnline = onlineUsers.includes(f.userId);
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedChat(f)}
                    className={`flex items-center justify-between p-3 sm:p-4 border-b cursor-pointer transition-colors ${
                      selectedChat?.userId === f.userId
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isOnline ? "bg-green-500" : ""
                        }`}
                      ></div>
                      <Avatar>
                        {f.imageUrl ? (
                          <AvatarImage src={f.imageUrl} />
                        ) : (
                          <AvatarFallback>
                            {f.username?.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm sm:text-base">
                          {f.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-20">
                No followers yet
              </p>
            )}
          </div>
        </div>

        {/* CHAT AREA */}
        <div
          className={`sm:mt-17 mt-14 fixed top-0 right-0 bottom-0 flex flex-col w-full md:w-[70%] transition-all duration-300 bg-gray-50 ${
            selectedChat ? "flex" : "hidden md:flex"
          }`}
        >
          {!selectedChat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="bg-gray-100 p-4 rounded-full text-3xl mb-4">
                💬
              </div>
              <h2 className="font-semibold tracking-tighter text-xl sm:text-2xl">
                Your Messages
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                Send private messages to your followers.
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center gap-4 border-b bg-gray-200 p-3 sm:p-2">
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
                      {selectedChat.username?.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-semibold text-base sm:text-lg">
                    {selectedChat.username}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-1">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => {
                    const isSender = msg.senderId === userId;
                    const nextMsg = messages[idx + 1];
                    const showAvatar =
                      !nextMsg || nextMsg.senderId !== msg.senderId;

                    return (
                      <div
                        key={idx}
                        className={`flex items-end ${
                          isSender ? "justify-end" : "justify-start"
                        } space-x-1`}
                      >
                        {/* Receiver avatar */}
                        {!isSender && showAvatar && (
                          <img
                            src={selectedChat.imageUrl}
                            alt="receiver"
                            className="w-6 h-6 rounded-full object-cover mb-1"
                          />
                        )}
                        {!isSender && !showAvatar && (
                          <div className="w-6 h-6"></div>
                        )}

                        <div
                          className={`relative max-w-[70%] ${
                            isSender ? "ml-auto" : "mr-auto"
                          }`}
                        >
                          <div
                            className={`inline-block px-3 py-2 text-sm rounded-2xl ${
                              msg.image
                                ? "p-0 bg-transparent"
                                : isSender
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-200 text-gray-800 rounded-bl-none"
                            }`}
                          >
                            {msg.image ? (
                              <img
                                src={msg.image}
                                alt="sent"
                                className="rounded-2xl max-w-[240px] object-cover"
                              />
                            ) : (
                              msg.text
                            )}
                          </div>
                        </div>

                        {/* Sender avatar */}
                        {isSender && showAvatar && (
                          <img
                            src={user.imageUrl}
                            alt="sender"
                            className="w-6 h-6 rounded-full object-cover mb-1"
                          />
                        )}
                        {isSender && !showAvatar && (
                          <div className="w-6 h-6"></div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 text-center">
                    This is the start of your chat with{" "}
                    <span className="font-semibold">
                      {selectedChat.username}
                    </span>
                    .
                  </p>
                )}
                <div ref={messageEndRef}></div>
              </div>

              {/* Message Input */}
              <div className="border-t bg-white p-2 sm:p-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Message..."
                  value={input}
                  onKeyDown={handleSendEnter}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border rounded-full px-3 sm:px-4 py-2 outline-none text-sm bg-gray-100 focus:ring-1 focus:ring-gray-300"
                />
                <Input type={"file"} id="image" hidden onChange={sendImage}>
                  {/* <Image /> */}
                </Input>
                <label htmlFor="image">
                  <Image />
                </label>
                <button
                  onClick={handleSend}
                  // onKeyDown={(e) => e.key === "Enter" && handleSend}
                  className="bg-black text-white px-4 sm:px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
                >
                  Send
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
