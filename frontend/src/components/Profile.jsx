import { useEffect, useState } from "react";
import useUserPostStore from "../app/UserPostStore";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import { toast } from "sonner";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Grid3X3, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useUserStore } from "../app/UserStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Create from "./Create";
import axios from "axios";

const Profile = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const { posts, fetchPosts, deletePost } = useUserPostStore();
  const { userId } = useAuth();
  const { user } = useUser();
  const {
    followers,
    following,
    unfollowUser,
    getFollowing,
    removeFollower,
    getFollowers,
  } = useUserStore();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(""); //for stats

  const handleOpen = (type) => {
    setActiveTab(type);
    setOpen(true);
  };

  useEffect(() => {
    fetchPosts(userId);
  }, [fetchPosts, userId]);

  const handleDeletePost = async (id) => {
    const res = await deletePost(userId, id);
    setSelectedPost(null);
    toast(res.message);
    await fetchPosts(userId);
  };

  const handleUnfollow = async (targetId) => {
    await unfollowUser(userId, targetId);
    getFollowing(userId);
  };

  const handleRemoveFollower = async (targetId) => {
    await removeFollower(userId, targetId);
    getFollowers(userId);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="md:w-1/5 lg:w-1/6 border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 md:px-10 pt-20 md:pt-20 mb-10">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto mt-10 mb-16 px-6">
            {/* Profile Picture + Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-12 w-full">
              {/* Profile Image */}
              <img
                src={
                  user.imageUrl ||
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                }
                alt="profile"
                className="w-28 h-28 sm:w-46 sm:h-46 rounded-full object-cover shadow-md mx-auto sm:mx-0"
              />

              {/* User Info */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
                <p className="font-semibold text-base tracking-wide mb-2">
                  {user.fullName || "User"}
                </p>
                <p className="text-gray-600 text-sm">Developer</p>
                <p className="text-gray-500 text-sm flex items-center justify-center sm:justify-start gap-1">
                  📍 India, Delhi
                </p>
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

            {/* Followers / Following Dialog */}
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
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover border border-gray-300"
                            />
                            <div>
                              <p className="font-medium text-gray-900 leading-tight">
                                {user.name}
                              </p>
                              {user.username && (
                                <p className="text-sm text-gray-700">
                                  {user.username}
                                </p>
                              )}
                            </div>
                          </div>

                          {activeTab === "followers" ? (
                            <button
                              onClick={() => handleRemoveFollower(user.userId)}
                              className="text-xs sm:text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-2 py-1 rounded-full transition-all"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnfollow(user.userId)}
                              className="text-xs sm:text-sm font-medium text-gray-600 hover:text-white hover:bg-gray-600 border border-gray-600 px-2 py-1 rounded-full transition-all"
                            >
                              Unfollow
                            </button>
                          )}
                        </div>
                      )
                    )
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Section Title */}
          <div className="flex flex-col items-center sm:mt-8">
            <p className="flex items-center gap-2 font-semibold text-black hover:bg-zinc-200/80 cursor-pointer rounded-sm transition-all duration-300 text-lg sm:text-xl p-1">
              <Grid3X3 strokeWidth={1.2} className="text-zinc-800" />
              Creations
            </p>
            <span className="h-[1px] mt-1 w-full sm:w-80 bg-zinc-800"></span>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 md:gap-8 mt-10 px-6 sm:px-16 md:px-24 lg:px-32">
            {posts.length === 0 ? (
              <div className="col-span-full flex flex-col justify-center items-center w-full text-center px-3 py-10">
                <h1 className="text-lg sm:text-2xl text-zinc-800 font-semibold tracking-tight">
                  Create your first post
                </h1>
                <p className="text-md text-zinc-600 tracking-tight">
                  Make people know you
                </p>
                <img
                  src="/images/profile.png"
                  className="w-40 sm:w-60 object-contain"
                  alt="Create your first post"
                />
                <Button
                  className="mb-10 h-8 text-md tracking-tight"
                  onClick={() => setShowCreate(true)}
                >
                  <Create />
                </Button>
              </div>
            ) : (
              [...posts].reverse().map((val, ind) => (
                <div
                  key={ind}
                  onClick={() => setSelectedPost(val)}
                  className="relative w-full aspect-[10/15] overflow-hidden group cursor-pointer border border-gray-300 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={val.imageUrl}
                    alt={val.caption || "post"}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))
            )}
          </div>

          {/* Post Modal */}
          {selectedPost && (
            <div
              className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-2 sm:px-6"
              onClick={() => setSelectedPost(null)}
            >
              <div
                className="bg-white rounded-md overflow-hidden flex flex-col md:flex-row w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-[85vh] max-h-[90vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Popover Actions */}
                <div className="absolute top-3 right-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreHorizontalIcon className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0 border-none bg-transparent">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant=""
                            className="cursor-pointer hover:bg-red-600 hover:text-white flex gap-2 items-center"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. It will permanently
                              remove your post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletePost(selectedPost._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Left: Image */}
                <div className="flex-1 bg-black flex justify-center items-center">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.caption || "post"}
                    className="object-contain max-h-full"
                  />
                </div>

                {/* Right: Post Details */}
                <div className="w-full md:w-[45%] flex flex-col justify-between p-3 sm:p-5 overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center gap-3 border-b pb-3">
                    <img
                      src={user.imageUrl}
                      alt="profile"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    <p className="font-semibold text-sm sm:text-base">
                      {user.username}
                    </p>
                  </div>

                  {/* Caption + Comments */}
                  <div className="mt-3 flex-1 overflow-y-auto text-sm sm:text-base">
                    <p>
                      <span className="font-semibold mr-1">
                        {user.username}
                      </span>
                      {selectedPost.caption || "No caption"}
                    </p>

                    <div className="mt-4 space-y-1">
                      <p>
                        <span className="font-semibold mr-1">aditya</span>🔥🔥
                      </p>
                      <p>
                        <span className="font-semibold mr-1">muskan_k</span>Love
                        this!
                      </p>
                    </div>
                  </div>

                  {/* Likes + Input */}
                  <div className="border-t pt-3 mt-2">
                    <p className="font-semibold">
                      {selectedPost.likes || 120} likes
                    </p>
                    <div className="flex items-center mt-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 border-none outline-none text-sm sm:text-base"
                      />
                      <button className="text-black font-semibold text-md cursor-pointer transition-all hover:bg-black rounded-sm px-2 py-1 hover:text-white">
                        Wave
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
