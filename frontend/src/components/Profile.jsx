import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-100 px-10 pt-24 mb-10">
          <div className="flex items-center gap-16 ml-20">
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
              alt="profile"
              className="w-36 h-36 rounded-full object-cover"
            />
            <div>
              {/* USER */}
              <div className="flex items-center gap-6 mb-4">
                <h2 className="text-2xl font-semibold">adityakr</h2>
                <button className="border px-4 py-1 text-sm rounded-md hover:bg-gray-100 transition">
                  Edit profile
                </button>
              </div>

              <div className="flex gap-10 mb-5 mt-5">
                <div>
                  <p className="font-semibold tracking-wider text-[18px]">80</p>
                  <p className="text-[13px] text-gray-500 tracking-wider">
                    Following
                  </p>
                </div>
                <div>
                  <p className="font-semibold tracking-wider text-[18px]">80</p>
                  <p className="text-[13px] text-gray-500 tracking-wider">
                    Followers
                  </p>
                </div>
                <div>
                  <p className="font-semibold tracking-wider text-[18px]">80</p>
                  <p className="text-[13px] text-gray-500 tracking-wider">
                    Posts
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <p className="font-semibold">Aditya Kr</p>
                <p className="text-gray-600">Digital creator & photographer</p>
                <p className="text-gray-500">📍 India, Delhi</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center border-t border-gray-300 mt-4">
            <div className="flex gap-12 text-sm font-semibold text-gray-500 mt-4">
              <button
                onClick={() => setActiveTab("posts")}
                className={`pb-2 border-t-2 ${
                  activeTab === "posts"
                    ? "border-black text-black"
                    : "border-transparent"
                }`}
              >
                POSTS
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`pb-2 border-t-2 ${
                  activeTab === "saved"
                    ? "border-black text-black"
                    : "border-transparent"
                }`}
              >
                SAVED
              </button>
              <button
                onClick={() => setActiveTab("tagged")}
                className={`pb-2 border-t-2 ${
                  activeTab === "tagged"
                    ? "border-black text-black"
                    : "border-transparent"
                }`}
              >
                TAGGED
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 mt-6">
            {activeTab === "posts" &&
              Array.from({ length: 9 }).map((_, i) => (
                <img
                  key={i}
                  src={`https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80${
                    i + 10
                  }`}
                  alt={`post-${i}`}
                  className="w-full h-80 object-cover"
                />
              ))}

            {activeTab === "saved" && (
              <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-lg font-semibold">No Saved Posts Yet</p>
              </div>
            )}

            {activeTab === "tagged" && (
              <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-lg font-semibold">No Tagged Photos Yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
