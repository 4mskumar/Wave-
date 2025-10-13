import { useEffect, useState } from "react";
import useUserPostStore from "../app/UserPostStore";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Grid3X3 } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { posts, fetchPosts } = useUserPostStore();
  const { userId } = useAuth();
  const { user } = useUser();

  console.log(posts);

  useEffect(() => {
    fetchPosts(userId);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1  md:ml-72 lg:ml-80 px-4 sm:px-8 md:px-10 pt-24 mb-10">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row w-2/3 ml-20 items-center justify-center gap-12 text-center sm:text-left mt-10 mb-10">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <img
                src={
                  user.imageUrl ||
                  "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                }
                alt="profile"
                className="w-32 border h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center sm:items-start">
              {/* USERNAME & BUTTON */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <h2 className="text-2xl font-semibold">{user.username}</h2>
              </div>

              {/* STATS */}
              <div className="flex justify-center sm:justify-start gap-10 mb-5">
                <div className="text-center gap-1 flex items-end sm:text-left">
                <p className="font-semibold text-lg sm:text-xl">
                    80
                    <span className="text-[15px] ml-1 text-zinc-800 font-light tracking-tight">
                      followers
                    </span>
                  </p>
                </div>
                <div className="text-center gap-1 flex items-end sm:text-left">
                <p className="font-semibold text-lg sm:text-xl">
                    80
                    <span className="text-[15px] ml-1 text-zinc-800 font-light tracking-tight">
                      following
                    </span>
                  </p>
                </div>
                <div className="text-center gap-1 flex items-end sm:text-left">
                  <p className="font-semibold text-lg sm:text-xl">
                    {posts.length}
                    <span className="text-[15px] ml-1 text-zinc-800 font-light tracking-tight">
                      posts
                    </span>
                  </p>
                </div>
              </div>

              {/* BIO */}
              <div className="text-center sm:text-left">
                <p className="font-semibold text-base">{user.fullName}</p>
                <p className="text-gray-600 text-sm">
                  Digital creator & photographer
                </p>
                <p className="text-gray-500 text-sm">📍 India, Delhi</p>
              </div>
            </div>
          </div>

          {/* Section Title */}
          <div className="flex justify-center  flex-col items-center border-gray-300 sm:mt-8">
            <p className="font-semibold text-black hover:bg-zinc-200/80 cursor-pointer rounded-sm transition-all duration-300 sm:text-xl  tracking-tighter  p-1">
              <Grid3X3
                strokeWidth={1.5}
                className="text-xl scale-120 text-zinc-800"
              />
            </p>
            <span className="h-[3px] w-16 bg-zinc-800"></span>
          </div>

          <div className="grid grid-cols-3  gap-[2px] px-72 relative mt-6">
            <span className="w-[61.7%] left-72 border bg-zinc-900 h-[0.9px] absolute top-0"></span>
            {posts.map((val, ind) => (
              <div
                key={ind}
                className="relative w-full aspect-[2/3] overflow-hidden group cursor-pointer"
              >
                <img
                  src={val.imageUrl}
                  alt={val.caption || "post"}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                {/* Optional: overlay effect like Instagram */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
