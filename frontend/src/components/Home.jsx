import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useUserStore } from "../app/UserStore";
import useUserPostStore from "../app/UserPostStore";
import Create from "./Create";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./Welcome";
import Festival from "./shared/Festival";
import { HiTranslate } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toDDMMYYYY } from "../api/timeFormat.js";

const Home = () => {
  const { setUserData, feed, getUserFeed, getFollowers, getFollowing, following } =
    useUserStore();
  const { toggleLike, addComment, translate, translatedCaptions,loading } = useUserPostStore();
  const { user } = useUser();
  const { userId } = useAuth();
  const navigate = useNavigate()
  const [openCommentInput, setOpenCommentInput] = useState(null);
  const [openCommentList, setOpenCommentList] = useState(null);
  const [commentText, setCommentText] = useState("");

  const handleAutoTranslate = async (postId) => {
    await translate(postId)
    await getUserFeed(userId)
  }

  // console.log(translatedCaptions);
  

  useEffect(() => {
    if (userId && user) {
      setUserData(userId, user.fullName, user.username, user.imageUrl);
      getFollowers(userId);
      getFollowing(userId);

      
      getUserFeed(userId);
    }
  }, [userId, user]);

  const handleCommentSubmission = async (postId) => {
    if (!commentText.trim()) return;
    await addComment(userId, commentText, postId);
    setCommentText("");
    setOpenCommentInput(null); // close input after posting
    await getUserFeed(userId);
  };

  const handleEmojiComment = async (postId, emoji) => {
    await addComment(userId, emoji, postId);
    await getUserFeed(userId);
  };

  const handleLikeToggle = async (postId, targetId) => {
    await toggleLike(userId, targetId,postId );
    await getUserFeed(userId);
  };

  const handleCommentInputToggle = (postId) => {
    setOpenCommentInput(openCommentInput === postId ? null : postId);
  };

  const handleViewCommentsToggle = (postId) => {
    setOpenCommentList(openCommentList === postId ? null : postId);
  };

  const color = [
    "red-50",
    "orange-50",
    "amber-50",
    "yellow-50",
    "lime-50",
    "emerald-50",
    "teal-50",
    "cyan-50",
    "sky-50",
    "blue-50",
    "indigo-50",
    "violet-50",
    "purple-50",
    "fuchsia-50",
    "pink-50",
    "rose-50",
    "gray-100",
    "zinc-100",
  ];

  const randomIndex = () => Math.floor(Math.random() * color.length);

  return (
    <>
      <Welcome />
      <Navbar />
      <Sidebar />
      <Festival />
      <ToastContainer position="bottom-right" autoClose={2000} />

      <main className="pt-15 xl:pl-42 lg:pl-70 min-h-screen pb-20 md:pb-0 transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          {/* Post Create */}
          <div className="bg-gray-100 shadow rounded-2xl p-2 sm:p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Badge
                className="h-9 min-w-9 rounded-full px-1 font-mono tabular-nums text-lg cursor-pointer"
                variant="secondary"
              >
                <img
                  className="h-8 w-8 rounded-full font-mono tabular-nums text-lg cursor-pointer"
                  src={user?.imageUrl}
                  alt="User Avatar"
                />
              </Badge>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 text-sm bg-gray-200 rounded-full px-4 py-2 outline-none w-full sm:w-auto"
              />
              <div className="w-full sm:w-auto mt-2 sm:mt-0 flex justify-end">
                <Create />
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="space-y-6">
            {feed.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow rounded-2xl p-4 sm:p-6 flex flex-col gap-3"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={post?.userImageUrl}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[16px] sm:text-[18px]">
                      {post.username}
                    </p>
                    <p className="text-[12px] sm:text-[13px] text-gray-500">
                      {toDDMMYYYY(post.createdAt)} 
                    </p>
                  </div>
                </div>

                {/* Caption */}
                {post.caption && (
                  <div className="flex justify-between items-center m-2">
                    <p className="text-gray-700 text-[14px] sm:text-[17px]">
                      {translatedCaptions[post._id] || post.caption}
                    </p>
                    <div
                      onClick={() => {
                        if (!translatedCaptions[post._id])
                          handleAutoTranslate(post._id);
                      }}
                      className={`flex cursor-pointer items-center gap-1
    ${translatedCaptions[post._id] ? "opacity-40 cursor-not-allowed" : ""}
  `}
                    >
                      <HiTranslate size={18} className="hover:text-gray-800" />

                      {loading?.[post._id] ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        <p className="text-xs">
                          {translatedCaptions[post._id]
                            ? "Translated"
                            : "Auto-Translate"}
                        </p>
                      )}
                    </div>
                    {/* <button className="text-xs border-1 px-2 rounded-full bg-black text-white py-0.5">Auto Translate</button> */}
                  </div>
                )}

                {/* Image */}
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="w-full rounded-lg object-cover max-h-[450px]"
                  />
                )}

                {/* Likes and Comment */}
                <div className="flex justify-between items-center text-gray-600 text-sm mt-4 sm:gap-8 px-2 sm:px-4">
                  <span
                    onClick={() => handleLikeToggle(post._id, post.userId)}
                    className="inline-flex cursor-pointer items-center gap-1 sm:gap-2 sm:text-lg text-sm"
                  >
                    {post.likes.includes(userId) ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart />
                    )}
                    {post.likes.length ?? 0} Likes
                  </span>

                  <button
                    onClick={() => handleCommentInputToggle(post._id)}
                    className="inline-flex cursor-pointer items-center gap-1 sm:gap-2 sm:text-lg text-sm"
                  >
                    <FaRegComment /> Comment
                  </button>

                  <div className="flex gap-3">
                    {["🙏", "🔥", "🎉", "🧘🏻"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiComment(post._id, emoji)}
                        className="hover:scale-110 transition sm:text-lg text-sm"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comments Preview */}
                <div className="flex gap-3 flex-wrap mt-2">
                  {post.comments.slice(0, 2).map((val, ind) => (
                    <div
                      key={ind}
                      className={`bg-${
                        color[randomIndex()]
                      } border rounded-xl flex items-center gap-2 text-gray-800 p-2 text-sm`}
                    >
                      <Avatar>
                        <AvatarImage
                          className={"object-cover"}
                          src={val.userImageUrl}
                        />
                        <AvatarFallback>
                          {val.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {/* <p className= 'text-md font-semibold text-zinc-900'>{val.username}</p> */}
                      <p className="text-sm text-zinc-800">{val.text}</p>
                    </div>
                  ))}
                  {post.comments?.length > 2 && (
                    <button
                      onClick={() => handleViewCommentsToggle(post._id)}
                      className="text-gray-500 flex items-center gap-1 text-sm hover:underline mt-1"
                    >
                      {!openCommentList ? `View all ${post.comments.length} comments` : `View less ${post.comments.length} comments`}
                      <ChevronDown rotate={openCommentList ? 180 : 0} className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Expanded Comment List */}

                {openCommentList === post._id && (
                  <div className="mt-2 border-2 p-2 space-y-2 border-t pt-3">
                    {post.comments.map((val, i) => (
                      <div key ={i} className="flex items-center gap-2">
                        <Avatar className={'size-6'}>
                          <AvatarImage
                            className={"object-cover size-6"}
                            src={val.userImageUrl}
                          />
                          <AvatarFallback>
                            {val.username[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <a onClick={() => navigate(`/user/${val.userId}`)} className= 'text-sm hover:underline cursor-pointer tracking-tight font-semibold text-zinc-900'>{val.username}</a>
                        <p className="text-sm text-zinc-800">{val.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                {openCommentInput === post._id && (
                  <div className="mt-4 border-t pt-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border rounded-xl px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                      />
                      <button
                        onClick={() => handleCommentSubmission(post._id)}
                        className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800 cursor-pointer"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
