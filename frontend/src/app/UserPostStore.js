// src/app/UserPostStore.js
import { create } from "zustand";
import axios from "../api/axiosConfig.js";
import { toast } from "sonner";

const useUserPostStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: false,

  // ✅ Add Post
  addPost: async (userId, caption, image, userImageUrl, username) => {
    set({ loading: true, error: false });

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("caption", caption);
      formData.append("image", image);
      formData.append("userImageUrl", userImageUrl);
      formData.append("username", username);

      const res = await axios.post("/post/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        set((state) => ({
          posts: [...state.posts, res.data.post],
          loading: false,
        }));
        return { success: true, message: res.data.message, post: res.data.post };
      } else {
        set({ loading: false });
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.error("Error in addPost:", error.response?.data || error.message);
      set({ loading: false, error: true });
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
  deletePost: async (userId, id) => {
    try {
      const res = await axios.post('/post/delete', { userId, postId: id });
      if (res.data.success) {
        const updatedPosts = get().posts.filter((post) => post._id !== id);
        set({ posts: updatedPosts });
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message || "Failed to delete post" };
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
      }));
      return { success: false, message: "Error deleting post" };
    }
  },


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

  addComment: async (userId, text, postId) => {
    try {
      const res = await axios.post('/post/comment', { userId, text, postId });

      if (res.data.success) {
        set((state) => ({
          posts: state.posts.map((post) =>
            post._id === postId
              ? { ...post, comments: res.data.comments }
              : post
          ),
        }));

        // toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error commenting on post:", error.message);
      toast.error("Failed to add comment");
    }
  },

}));

export default useUserPostStore;
