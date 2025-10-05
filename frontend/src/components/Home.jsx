import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import SharePost from "./SharePost";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Cameron Williamson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      time: "10 Aug at 4:41 PM",
      text: "Exploring some cool digital art today! 🎨",
      image:
        "https://images.unsplash.com/photo-1612831818367-0f7c5efb7f9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Courtney Henry",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      time: "8 Aug at 2:15 PM",
      text: "Had an amazing hike yesterday ⛰️",
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Courtney Henry",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      time: "8 Aug at 2:15 PM",
      text: "Had an amazing hike yesterday ⛰️",
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const [newPost, setNewPost] = useState("");

  // const handlePost = () => {
  //   if (!newPost.trim()) return;
  //   const newPostObj = {
  //     id: Date.now(),
  //     name: "Jakob Boman",
  //     avatar: "https://via.placeholder.com/40",
  //     time: "Just now",
  //     text: newPost,
  //     image: null,
  //   };
  //   setPosts([newPostObj, ...posts]);
  //   setNewPost("");
  // };

  return (
    <>
  <Navbar />

  <div className="flex">
    {/* Sidebar on the left */}
    <Sidebar />

    {/* Main content area on the right */}
    <div className="flex-1 max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white shadow rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
            AK
          </div>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">+ Share Post</Button>
            </DialogTrigger>
            <SharePost />
          </Dialog>
        </div>
      </div>

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
                <p className="font-semibold">{post.name}</p>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </div>
            {post.text && <p className="text-gray-700">{post.text}</p>}
            {post.image && (
              <img src={post.image} alt="post" className="w-full rounded-lg" />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</>

  );
};

export default Home;
