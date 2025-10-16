import { useParams } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import useUserPostStore from "../app/UserPostStore";

const PostDetail = () => {
  const { id } = useParams(); // get post ID from URL
  const { posts } = useUserPostStore();

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Post not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 md:ml-72 lg:ml-80 px-4 sm:px-8 md:px-10 pt-24 mb-10">
          <div className="flex flex-col items-center gap-6">
            <img
              src={post.imageUrl}
              alt={post.caption || "Post"}
              className="max-w-lg rounded-xl shadow-md"
            />
            <p className="text-lg font-medium">{post.caption}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
