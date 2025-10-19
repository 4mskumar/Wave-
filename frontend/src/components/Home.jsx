import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
//import { useUser } from "@clerk/clerk-react";
import { IoMdShare } from "react-icons/io";
import { useAuth, useUser } from "@clerk/clerk-react";
import SharePost from "./SharePost";
import { useUserStore } from "../app/UserStore";
import useUserPostStore from "../app/UserPostStore";
import Create from "./Create";

const Home = () => {
  const [posts] = useState([
    {
      id: 1,
      name: "Khusboo Gupta",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      time: "10 Aug at 4:41 PM",
      text: "Exploring some cool digital art today! 🎨",
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
      Likes: 120,
      Comments: 45,
    },
    {
      id: 2,
      name: "Raju Shrivastav",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      time: "8 Aug at 2:15 PM",
      text: "Had an amazing hike yesterday ⛰️",
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
      Likes: 120,
      Comments: 45,
    },
    {
      id: 3,
      name: "Raju Shrivastav",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      time: "8 Aug at 2:15 PM",
      text: "Had an amazing hike yesterday ⛰️",
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
      Likes: 120,
      Comments: 45,
    },
  ]);

  const {setUserData, feed, getUserFeed, getFollowers, connectSocket} = useUserStore()
  const {toggleLike} = useUserPostStore()
  const {user} = useUser()
  const {userId} = useAuth()

  // console.log(user);
  
    useEffect(() => {
      if (userId && user) {
        setUserData(userId, user.fullName, user.username, user.imageUrl);
        getUserFeed(userId);
        getFollowers(userId)
      }
      // console.log("called in home" + followers);
    }, [userId, user]);
    
    
  const handleLikeToggle = async (postId) => {
    await toggleLike(userId, postId)
    getUserFeed(userId)
  }

  return (
    <>
      <Navbar />
      <Sidebar />

      {/* Main Container */}
      <main className="pt-20 md:pl-72 bg-gray-50 min-h-screen pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          {/* Create Post */}
          <div className="bg-gray-100 shadow rounded-2xl p-2 sm:p-6 mb-6 border border-gray-200">
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Badge
                className="border-gray-300 bg-gray-200 h-9 min-w-9 rounded-full px-1 font-mono tabular-nums text-lg cursor-pointer"
                variant="secondary"
              >
                <img
                  className="border-gray-300 bg-gray-200 h-9 w-9 rounded-full font-mono tabular-nums text-lg cursor-pointer"
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
                    src={post.userImageUrl}
                    alt={"user"}
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

                {post.text && (
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
                          <FaRegHeart fill={post.likes.includes(userId) && "Red"} /> {post.likes.length ?? 0} Likes
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
