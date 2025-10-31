import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosConfig.js";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Grid3X3 } from "lucide-react";
import { useUserStore } from "../../app/UserStore.js";
import { useAuth } from "@clerk/clerk-react";
import { getUserData } from "../../../../server/controllers/user.controller.js";

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");
  const { followUser, unfollowUser, getFollowers, getUserdata } =
    useUserStore();
  const { userId } = useAuth();

  const handleOpen = (tab) => {
    setActiveTab(tab);
    setOpen(true);
  };

  const handleFollow = async (targetId) => {
    const res = await followUser(userId, targetId);
    if (res?.success) {
      setFollowers(res.followers || []);
    }
  };

  const handleUnfollow = async (targetId) => {
    const res = await unfollowUser(userId, targetId);
    if (res?.success) {
      setFollowers(res.followers || []);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/get-user`, { params: { userId: id } });
        if (res.data.success) {
          setUserData(res.data.user);
          const postsData = Array.isArray(res.data.posts) ? res.data.posts : [];
          setPosts(postsData);

          setFollowers(res.data.user.followers || []);
          setFollowing(res.data.user.following || []);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [id, followers]);

  // console.log(followers);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-zinc-700">
        Loading user profile...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="md:w-1/5 lg:w-1/6 border-r border-gray-200">
          <Sidebar />
        </div>

        <div className="flex-1 px-4 sm:px-6 md:px-10 pt-20 md:pt-20 mb-20">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto mt-5 sm:mt-10 mb-10">
            {/* Profile Picture + Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-12 w-full">
              {/* Profile Image */}
              <img
                src={
                  userData.imageUrl ||
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                }
                alt="profile"
                className="w-28 h-28 sm:w-46 sm:h-46 rounded-full object-cover shadow-md mx-auto sm:mx-0"
              />

              {/* User Info */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                <h2 className="text-2xl font-bold mt-[-25px] sm:mt-0">{userData.username}</h2>
                <p className="font-semibold text-base tracking-wide mb-2">
                  {userData.fullName || "User"}
                </p>
                <p className="text-gray-600 text-sm">
                  {userData.bio || "Developer"}
                </p>
                {/* <p className="text-gray-500 text-sm flex items-center justify-center sm:justify-start gap-1">
                  📍 India, Delhi
                </p> */}

                {/* Follow Button */}
                {Array.isArray(followers) && followers.some((f) => f.userId === userId) ? (
                  <button
                    onClick={() => handleUnfollow(userData.clerkId)}
                    className="border border-black px-4 py-1.5 rounded-md bg-black text-white text-sm mt-3 hover:bg-gray-800 transition"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(userData.clerkId)}
                    className="border border-black px-4 py-1.5 rounded-md bg-black text-white text-sm mt-3 hover:bg-gray-800 transition"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-center items-center gap-10 sm:gap-16 mt-6">
              <div
                onClick={() => handleOpen("followers")}
                className="cursor-pointer hover:opacity-80 transition"
              >
                <p className="font-semibold text-base sm:text-lg">
                  {followers.length}
                  <span className="ml-1 text-zinc-600">Followers</span>
                </p>
              </div>

              <div
                onClick={() => handleOpen("following")}
                className="cursor-pointer hover:opacity-80 transition"
              >
                <p className="font-semibold text-base sm:text-lg">
                  {following.length}
                  <span className="ml-1 text-zinc-600">Following</span>
                </p>
              </div>

              <div>
                <p className="font-semibold text-base sm:text-lg">
                  {posts.length}
                  <span className="ml-1  text-zinc-600">Posts</span>
                </p>
              </div>
            </div>

            {/* Followers Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="sm:max-w-md max-w-sm">
                <DialogHeader>
                  <DialogTitle className="capitalize text-center">
                    {activeTab}
                  </DialogTitle>
                </DialogHeader>
                <div className="max-h-70 overflow-y-auto mt-3 space-y-3 pr-1">
                  {(activeTab === "followers" ? followers : following)
                    .length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-2">
                      No {activeTab} yet.
                    </p>
                  ) : (
                    (activeTab === "followers" ? followers : following).map(
                      (user, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-3 p-1 rounded-xl border hover:bg-gray-100 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                user.imageUrl ||
                                "https://via.placeholder.com/40"
                              }
                              alt={user.username}
                              className="w-8 h-8 rounded-full object-cover border border-gray-300"
                            />
                            <div>
                              <p className="font-medium text-gray-900 leading-tight">
                                {user.username}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* POSTS */}
          <div className="flex flex-col items-center sm:mt-8">
            <p className="flex items-center gap-2 font-semibold text-black text-lg sm:text-xl p-1">
              <Grid3X3 strokeWidth={1.2} className="text-zinc-800" />
              Creations
            </p>
            <span className="h-[1px] mt-1 w-full sm:w-80 bg-zinc-800"></span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 md:gap-8 mt-10 px-6 sm:px-16 md:px-24 lg:px-32">
            {posts.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No posts yet.
              </div>
            ) : (
              posts.map((val, ind) => (
                <div
                  key={ind}
                  className="relative w-full aspect-[10/15] overflow-hidden group cursor-pointer border border-gray-300 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={val.imageUrl}
                    alt={val.caption || "post"}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
