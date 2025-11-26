import { create } from "zustand";
import axios from "../api/axiosConfig.js";
import { io } from "socket.io-client";
import { useUserStore } from "./UserStore";



// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://wave-sm-backend.onrender.com";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
export const useMessageStore = create((set, get) => ({
  socket: null,
  messages: [],
  followers: [],
  onlineUsers: [],
  selectedChat: null,
  loading: false,

  //  Connect to socket server
  connectSocket: (userId) => {
    if (get().socket) return; // prevent duplicate connections
    const socket = io(SOCKET_URL, {
      query: { userId },
      transports: ["websocket"],
    });
    set({ socket });

    // socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
    // socket.on("disconnect", () => console.log("❌ Socket disconnected"));

    //  Handle new incoming messages
    socket.on("newMessage", (msg) => {
      set((state) => ({
        messages: Array.isArray(state.messages)
          ? [...state.messages, msg]
          : [msg],
      }));
    });

    //  Track online users
    socket.on("onlineUsers", (userList) => {
      set({ onlineUsers: userList });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  //  Fetch messages between two users
  fetchMessages: async (userId, targetId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/messages/${userId}`, {
        params: { myId: targetId },
      });

      set({
        messages: res.data.messages || [],
        loading: false,
      });
    } catch (err) {
      // console.error("Error fetching messages:", err.message);
      set({ loading: false });
    }
  },

  //  Send a new message
  sendMessage: async (text = "", image = "") => {
    const { socket, selectedChat } = get();
    const { user } = useUserStore.getState();
    if (!selectedChat || (!text.trim() && !image)) return;

    try {
      const res = await axios.post(`/messages/send/${selectedChat.userId}`, {
        senderId: user.id,
        text,
        image, //  include image
      });

      const newMsg = res.data.message;
      if (!newMsg) return console.error("No message returned from server:", res.data);

      set((state) => ({
        messages: [...state.messages, newMsg],
      }));

      if (socket) socket.emit("sendMessage", newMsg);
    } catch (err) {
      // console.error("Error sending message:", err.message);
    }
  },


  //  Fetch followers (for sidebar)
  getFollowers: async (userId) => {
    try {
      const res = await axios.get("/followers", { params: { userId } });
      if (res.data.success) {
        const sorted = res.data.followers.sort(
          (a, b) => new Date(b.lastActive || 0) - new Date(a.lastActive || 0)
        );
        set({ followers: sorted });
      }
    } catch (error) {
      console.log("Error fetching followers:", error.message);
    }
  },

  //  Select chat
  setSelectedChat: (chat) => set({ selectedChat: chat, messages: [] }),

  //  Mark messages as seen
  //  Inside useMessageStore
  markMessagesAsSeen: async (targetId) => {
    const { user } = useUserStore.getState();

    try {
      await axios.put(`/messages/seen/${targetId}`, {}, {
        params: { myId: user.id },
      });

      // ✅ Update local state (optional)
      set((state) => ({
        messages: state.messages.map((m) =>
          m.senderId === targetId ? { ...m, seen: true } : m
        ),
      }));

      console.log("✅ Messages marked as seen in frontend");
    } catch (err) {
      console.error("❌ Error marking messages as seen:", err.message);
    }
  },

  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, msg],
  })),



}));
