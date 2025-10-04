import { create } from "zustand";
import axios from "../api/axiosConfig.js";

const useUserPostStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: false,

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

      // update local state
      set((state) => ({
        posts: [...state.posts, res.data.post],
        loading: false,
      }));

      // ✅ correct way to log posts inside store
      console.log(get().posts);

    } catch (error) {
      console.error("Error in addPost:", error.response?.data || error.message);
      set({ loading: false, error: true });
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

    fetchPosts: async (userId) => {
      set({ loading: true, error: false });
    
      try {
        const res = await axios.get("/post/getpost", {
          params: { userId },  
        });
    
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
    

  toggleLike: async (userId, postId) => {
    try {
      
    } catch (error) {
      
    }
  }

}));

export default useUserPostStore;
