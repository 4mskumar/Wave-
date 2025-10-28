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

const Home = () => {
  const { setUserData, feed, getUserFeed, getFollowers } = useUserStore();
  const { toggleLike, addComment } = useUserPostStore();
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const { userId } = useAuth();

  // Local states for comments
  const [openComments, setOpenComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState({});

  useEffect(() => {
    if (userId && user) {
      setUserData(userId, user.fullName, user.username, user.imageUrl);
      getUserFeed(userId);
      getFollowers(userId);
    }
  }, [userId, user]);

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
    'red-50',     // Very light pink/blush
    'orange-50',  // Very light peach
    'amber-50',   // Very light buttery yellow
    'yellow-50',  // Very pale yellow
    'lime-50',    // Very light mint green
    'emerald-50', // Very light seafoam green
    'teal-50',    // Very light teal
    'cyan-50',    // Very light aqua/sky blue
    'sky-50',     // Very pale sky blue
    'blue-50',    // Very light powder blue
    'indigo-50',  // Very light lavender
    'violet-50',  // Very pale violet
    'purple-50',  // Very light lilac
    'fuchsia-50', // Very light orchid
    'pink-50',    // Very pale pink
    'rose-50',    // Very light rose
    'gray-100',   // Lightest cool grey (a neutral pastel)
    'zinc-100',   // Lightest warm grey (a neutral pastel)
  ];
  
  // No longer a console.log of a function definition
  // You can remove this or keep it as a utility function
    const randomIndex = () => {
      let num = Math.floor(Math.random() * color.length)
      return num
    }


  return (
    <>
      <Navbar />
      <Sidebar />
      <ToastContainer position="bottom-right" autoClose={2000} />

      {/* Main Container */}
      <main className="pt-20 md:pl-72 bg-gray-50 min-h-screen pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          {/* Create Post */}
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
              <div className="hover:bg-gray-400 w-full sm:w-auto mt-2 sm:mt-0 flex justify-end">
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
                {/* Post Header (omitted for brevity) */}
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
                  {/* Like (omitted for brevity) */}
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

                  {/* Comment */}
                  <div className='flex gap-3'>
                    {post.comments.slice(0, 2).map((val, ind) => (
                      <div
                        key={ind}
                        // 👇 The Fix: Call randomIndex() directly and use a dark text color
                        className={`bg-${color[randomIndex()]} border rounded-xl text-gray-800 p-2 text-sm`}
                      >
                        {/* You might want to display the user's name here if available in val */}
                        <strong></strong> {val.text} 
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
                </div>

                {/* Comment Section (appears when clicked) */}
                {openComments === post._id && (
                  <div className="mt-4 border-t pt-3 space-y-3">
                    {/* Comment Input (omitted for brevity) */}
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

                    {/* Display Comments */}
                    <div className="space-y-2">
                      {post.comments.map((val, ind) => (
                        <div
                          key={ind}
                          className="bg-gray-50 border rounded-xl p-2 text-sm"
                        >
                          <strong></strong> {val.text}
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