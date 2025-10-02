// src/store/postStore.js
import { create } from "zustand";
import axios from "../api/axiosConfig.js"; // remove curly braces, default export

const useUserPostStore = create((set) => ({
  posts: [],
  loading : false,
  error : false,

  addPost: async (userId, caption, image) => {
    loading : true
    error : false
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("caption", caption);
      formData.append("image", image);

      const res = await axios.post("/post/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      loading : false

      // update local state
      set((state) => ({
        posts: [...state.posts, res.data.post], // assuming backend returns the created post
      }));
    } catch (error) {
      console.error("Error in addPost:", error.response?.data || error.message);
      loading : false
      error : true
      throw error;
    }
  },

  updatePost: (id, updatedFields) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id ? { ...post, ...updatedFields } : post
      ),
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== id),
    })),
}));

export default useUserPostStore;
