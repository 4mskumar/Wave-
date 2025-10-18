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

const Profile = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const { posts, fetchPosts, deletePost } = useUserPostStore();
  const { userId } = useAuth();
  const { user } = useUser();
  const { followers, following } = useUserStore();
  // console.log(selectedPost);

  useEffect(() => {
    fetchPosts(userId);
  }, []);

  const handleDeletePost = async (id) => {
    const res = await deletePost(userId, id);
    setSelectedPost(null);
    toast(res.message);
    await fetchPosts(userId);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="block md:hidden">
          <Sidebar />
        </div>

        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-70 lg:ml-50 px-4 sm:px-8 md:px-10 pt-15 sm:pt-24 mb-10">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row w-full sm:w-4/5 md:w-2/3 mx-auto items-center justify-center gap-4 sm:gap-12 text-center sm:text-left mt-4 mb-10">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <img
                src={
                  user.imageUrl ||
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                }
                alt="profile"
                className="w-25 h-25 sm:w-40 sm:h-40 md:w-35 md:h-35 rounded-full border object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  {user.username}
                </h2>
              </div>

              {/* Stats */}
              <div className="flex justify-center sm:justify-start gap-6 sm:gap-10 mb-5">
                <div className="text-center flex items-end sm:text-left">
                  <p className="font-semibold text-base sm:text-lg">
                    {Array.isArray(followers) ? followers.length : 0}

                    <span className="text-[13px] sm:text-[15px] ml-1 text-zinc-800 font-light tracking-tight">
                      followers
                    </span>
                  </p>
                </div>
                <div className="text-center flex items-end sm:text-left">
                  <p className="font-semibold text-base sm:text-lg">
                    {Array.isArray(following) ? following.length : 0}

                    <span className="text-[13px] sm:text-[15px] ml-1 text-zinc-800 font-light tracking-tight">
                      following
                    </span>
                  </p>
                </div>
                <div className="text-center flex items-end sm:text-left">
                  <p className="font-semibold text-base sm:text-lg">
                    {Array.isArray(posts) ? posts.length : 0}
                    <span className="text-[13px] sm:text-[15px] ml-1 text-zinc-800 font-light tracking-tight">
                      posts
                    </span>
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="text-center sm:text-left leading-tight">
                <p className="font-semibold sm:text-base">{user.fullName}</p>
                <p className="text-gray-600 text-sm sm:text-sm">Developer</p>
                <p className="text-gray-500 text-sm sm:text-sm">
                  📍 India, Delhi
                </p>
              </div>
            </div>
          </div>

          {/* Section Title */}
          <div className="flex flex-col items-center sm:mt-8">
            <p className="font-semibold text-black hover:bg-zinc-200/80 cursor-pointer rounded-sm transition-all duration-300 text-lg sm:text-xl p-1">
              <Grid3X3 strokeWidth={1.2} className="text-zinc-800" />
            </p>
            <span className="h-[1px] mt-1 w-full sm:w-80 bg-zinc-800"></span>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-6 px-2 sm:px-6">
            {posts.length === 0 ? (
              <div className="flex justify-center mt-10 flex-col ml-[34rem] items-center w-full">
                <h1 className="text-2xl text-zinc-800 font-semibold tracking-tight">
                  Create your first post
                </h1>
                <p className="text-md text-zinc-600 tracking-tight">
                  Make people know you
                </p>

                <img src="/images/profile.png" className="w-[20rem] aspect-square object-cover -mt-3"/>
                <Button className={'mt-8 w-24 text-md tracking-tight'} >Create</Button>
              </div>
            ) : (
              posts.map((val, ind) => (
                <div
                  key={ind}
                  onClick={() => setSelectedPost(val)}
                  className="relative w-full aspect-[1/1] sm:aspect-[2/3] overflow-hidden group cursor-pointer border border-gray-300 rounded-lg"
                >
                  <img
                    src={val.imageUrl}
                    alt={val.caption || "post"}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))
            )}
          </div>

          {/* Post Modal */}
          {selectedPost && (
            <div
              className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-3 sm:px-6"
              onClick={() => setSelectedPost(null)}
            >
              <div
                className="bg-white rounded-sm overflow-hidden flex flex-col md:flex-row w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-[85vh] max-h-[90vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="absolute top-3 right-4">
                  <Popover className={"relative"}>
                    <PopoverTrigger asChild>
                      <MoreHorizontalIcon className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent
                      className={
                        "bg-transparent border-none p-0 absolute -top-10 left-10 w-fit "
                      }
                    >
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            className={
                              "cursor-pointer hover:bg-red-500/90 hover:text-white border-none"
                            }
                            variant={"outline"}
                          >
                            <Trash2 />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletePost(selectedPost._id)}
                            >
                              Continue
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
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Right: Post Details */}
                <div className="w-full md:w-[45%] flex flex-col justify-between p-3 sm:p-5">
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
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold">
                      {selectedPost.likes || 120} likes
                    </p>
                    <div className="flex items-center mt-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 border-none outline-none text-sm sm:text-base"
                      />
                      <button className="text-blue-500 font-semibold text-sm sm:text-md hover:text-blue-700">
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
