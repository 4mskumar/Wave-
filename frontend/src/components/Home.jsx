import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { FaRegComment } from "react-icons/fa";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import { IoMdShare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { useAuth, useUser } from "@clerk/clerk-react";
import SharePost from "./SharePost";
import { useUserStore } from "../app/UserStore";
import useUserPostStore from "../app/UserPostStore";

const Home = () => {
  

  const {setUserData, feed, getUserFeed} = useUserStore()
  const {toggleLike} = useUserPostStore()
  const {user} = useUser()
  const {userId} = useAuth()


    useEffect(() => {
      if (userId && user) {
        setUserData(userId, user.fullName, user.username);
        getUserFeed(userId);
      }
      console.log("called in home" + feed);
    }, [userId, user]);
    
  const handleLikeToggle = (postId) => {
    toggleLike(userId, postId)
  }


  const [newPost, setNewPost] = useState("");

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="pt-20 pl-72 pr-6 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto py-6">
          <div className="bg-gray-100 shadow rounded-2xl p-6 mb-6 border-1 border-gray-200">
            <div className="flex items-center gap-3">
              <Badge
                className="border-gray-300 bg-gray-200 h-9 min-w-9 rounded-full px-1 font-mono tabular-nums text-lg cursor-pointer hover:bg-blue-500"
                variant="secondary"
              >
                <img 
                className="border-gray-300 bg-gray-200 h-9 w-9 rounded-full font-mono tabular-nums text-lg cursor-pointer hover:bg-blue-500"
                
                src={user.imageUrl} />
              </Badge>
              <input
                type="text"
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="flex-1 text-sm bg-gray-200 rounded-full px-4 py-2 outline-none w-full sm:w-auto"
              />
              <SharePost />
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
                    src={post.userImageUrl}
                    alt={"user"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[16px] sm:text-[18px]">
                      {post.username}
                    </p>
                    <p className="text-[12px] sm:text-[13px] text-gray-500">
                      {post.createdAt}
                    </p>
                  </div>
                </div>

                {post.caption && (
                  <p className="text-gray-700 text-[14px] sm:text-[15px] mt-2">
                    {post.caption}
                  </p>
                )}

                {post.imageUrl && (
                  <>
                    <img
                      src={post.imageUrl}
                      alt="post"
                      className="w-full rounded-lg object-cover max-h-[450px]"
                    />
                    {(post.likes || post.comments) && (
                      <div className="flex flex-wrap sm:justify-start justify-between items-center text-gray-600 text-sm mt-4 sm:gap-10 px-2 sm:px-4">
                        <span onClick={() => handleLikeToggle(post._id)} className="flex cursor-pointer items-center gap-2">
                          <FaRegHeart fill={post.likes.includes(userId) && "red"}/> {post.likes.length ?? 0} Likes
                        </span>
                        <span className="flex items-center gap-2">
                          <FaRegComment /> {post.comments ?? 0} Comments
                        </span>
                      </div>
                    )}
                  </>
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
