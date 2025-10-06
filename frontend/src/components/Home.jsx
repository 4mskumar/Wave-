import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import SharePost from "./SharePost";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import { FaRegComment } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { IoMdShare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

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
      Shares: 10,
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
      Shares: 10,
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
      Shares: 10,
    },
  ]);

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
                AK
              </Badge>
              <input
                type="text"
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="flex-1 text-sm bg-gray-200 rounded-full px-4 py-2 outline-none"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full text-[14px] px-2.5">+ Share Post</Button>
                </DialogTrigger>
                <SharePost />
              </Dialog>
            </div>
          </div>
          {/* posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow rounded-2xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-[18px]">{post.name}</p>
                    <p className="text-[13px] text-gray-500">{post.time}</p>
                  </div>
                </div>
                {post.text && <p className="text-gray-700 mt-4">{post.text}</p>}
                {post.image && (
                  <>
                    <img
                      src={post.image}
                      alt="post"
                      className="w-full rounded-lg"
                    />
                    {(post.Likes !== undefined ||
                      post.Comments !== undefined ||
                      post.Shares !== undefined) && (
                      <div className="flex items-center gap-6 text-gray-600 text-sm mt-4 justify-between px-4">
                        <span className="flex gap-2 items-center"><FaRegHeart /> {post.Likes ?? 0} Likes</span>
                        <span className="flex gap-2 items-center"><FaRegComment /> {post.Comments ?? 0} Comments</span>
                        <span className="flex gap-2 items-center"><IoMdShare />{post.Shares ?? 0} Share</span>
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
