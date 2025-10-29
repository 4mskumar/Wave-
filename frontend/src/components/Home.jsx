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

const Home = () => {
  const { setUserData, feed, getUserFeed, getFollowers } = useUserStore();
  const { toggleLike, addComment } = useUserPostStore();
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const { userId } = useAuth();

  const [openComments, setOpenComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState({});

  const [greeting, setGreeting] = useState("");
  const [festival, setFestival] = useState("");

  useEffect(() => {
    if (userId && user) {
      setUserData(userId, user.fullName, user.username, user.imageUrl);
      getUserFeed(userId);
      getFollowers(userId);
    }
  }, [userId, user]);

  //GREETINGS
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

   
  }, []);

  const handleCommentSubmision = async (postId) => {
    if (!commentText.trim()) return;
    await addComment(userId, commentText, postId);
    getUserFeed(userId);
  };

  const handleLikeToggle = async (postId) => {
    await toggleLike(userId, postId);
    getUserFeed(userId);
  };

  const handleCommentToggle = (postId) => {
    setOpenComments(openComments === postId ? null : postId);
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
      <Festival/>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <main className="pt-15 md:pl-42  min-h-screen pb-20 md:pb-0 transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          {/*Greeting*/}
          {greeting && (
            <div className="bg-gradient-to-b from-orange-50 to-yellow-50 text-orange-800 text-center font-semibold shadow-sm mb-2">
              {greeting}, {user?.firstName || "friend"}!
            </div>
          )}

          {/*Festival*/}
          {/* {festival && (
            <div className="bg-gradient-to-r from-orange-200 to-green-200 text-yellow-800 text-center py-3 rounded-xl font-medium mb-6 shadow-sm">
              {festival}
            </div>
          )} */}

          {/* POST CREATE */}
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
                <div className="flex items-center gap-3">
                  <img
                    src={post?.userImageUrl}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[16px] sm:text-[18px]">
                      {post.name}
                    </p>
                    <p className="text-[12px] sm:text-[13px] text-gray-500">
                      {post.createdAt}
                    </p>
                  </div>
                </div>

                {post.caption && (
                  <p className="text-gray-700 text-[14px] sm:text-[17px] mt-2">
                    {post.caption}
                  </p>
                )}

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="w-full rounded-lg object-cover max-h-[450px]"
                  />
                )}

                {/* Likes & Comments */}
                <div className="flex justify-between items-center text-gray-600 text-sm mt-4 sm:gap-10 px-2 sm:px-4">
                  <span
                    onClick={() => handleLikeToggle(post._id)}
                    className="inline-flex cursor-pointer items-center gap-2 text-lg"
                  >
                    {post.likes.includes(userId) ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart />
                    )}
                    {post.likes.length ?? 0} Likes
                  </span>

                  <div className="flex gap-3">
                    <button className="hover:scale-110 transition">🙏</button>
                    <button className="hover:scale-110 transition">🪔</button>
                    <button className="hover:scale-110 transition">🔥</button>
                    <button className="hover:scale-110 transition">🎉</button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="flex gap-3 flex-wrap">
                  {post.comments.slice(0, 2).map((val, ind) => (
                    <div
                      key={ind}
                      className={`bg-${
                        color[randomIndex()]
                      } border rounded-xl text-gray-800 p-2 text-sm`}
                    >
                      {val.text}
                    </div>
                  ))}
                  {post.comments?.length > 2 && (
                    <button
                      onClick={() => handleCommentToggle(post._id)}
                      className="text-gray-500 text-sm hover:underline mt-1"
                    >
                      View all {post.comments.length} comments
                    </button>
                  )}
                </div>
                {openComments === post._id && (
                  <div className="mt-4 border-t pt-3 space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border rounded-xl px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                      />
                      <button
                        onClick={() => handleCommentSubmision(post._id)}
                        className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800 cursor-pointer"
                      >
                        Post
                      </button>
                    </div>

                    <div className="space-y-2">
                      {post.comments.map((val, ind) => (
                        <div
                          key={ind}
                          className="bg-gray-50 border rounded-xl p-2 text-sm"
                        >
                          {val.text}
                        </div>
                      ))}
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
