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
        <div className="flex-1 ml-85 px-10 pt-24 mb-10">
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
                <button className="border px-4 py-1 text-sm rounded-md hover:bg-gray-300 transition">
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
            <p className="font-semibold text-black text-lg mt-5 tracking-tighter">
              My <span className="font-style: italic text-blue-500">WAVES</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1 mt-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <img
                key={i}
                src={`https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80${
                  i + 10
                }`}
                alt={`post-${i}`}
                className="w-full h-80 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
