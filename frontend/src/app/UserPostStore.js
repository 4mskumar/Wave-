// src/app/UserPostStore.js
import { create } from "zustand";
import axios from "../api/axiosConfig.js";

const useUserPostStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: false,

  // ✅ Add Post
  addPost: async (userId, caption, image) => {
    set({ loading: true, error: false });

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("caption", caption);
      formData.append("image", image);

      const res = await axios.post("/post/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        // ✅ Update local state immediately
        set((state) => ({
          posts: [...state.posts, res.data.post],
          loading: false,
        }));

        // ✅ Return success properly
        return { success: true, message: res.data.message, post: res.data.post };
      } else {
        set({ loading: false });
        return { success: false, message: res.data.message };
      }

    } catch (error) {
      console.error("Error in addPost:", error.response?.data || error.message);
      set({ loading: false, error: true });

      // ✅ Return an error instead of throwing (so frontend can handle)
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  },

  // ✅ Fetch Posts
  fetchPosts: async (userId) => {
    set({ loading: true, error: false });

    try {
      const res = await axios.get("/post/getpost", { params: { userId } });

      if (res.data.success) {
        set({
          posts: res.data.userPosts,
          loading: false,
        });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message);
      set({ loading: false, error: true });
    }
  },

  // ✅ Update Post
  updatePost: (id, updatedFields) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id ? { ...post, ...updatedFields } : post
      ),
    })),

  // ✅ Delete Post
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== id),
    })),

  // ✅ Toggle Like (template)
  toggleLike: async (userId, postId) => {
    try {
      const res = await axios.put("/post/like", { userId, postId });
      if (res.data.success) {
        // Update local post like count
        set((state) => ({
          posts: state.posts.map((post) =>
            post._id === postId ? { ...post, likes: res.data.likes } : post
          ),
        }));
      }
    } catch (error) {
      console.error("Error liking post:", error.message);
    }
  },
}));

export default useUserPostStore;
