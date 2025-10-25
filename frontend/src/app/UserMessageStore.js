import { create } from "zustand";
import axios from "../api/axiosConfig.js";
import { io } from "socket.io-client";
import { useUserStore } from "./UserStore";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export const useMessageStore = create((set, get) => ({
  socket: null,
  messages: [],
  selectedChat: null,
  loading: false,

  // ✅ connect to socket server
  connectSocket: (userId) => {
    if (get().socket) return; // avoid reconnecting
    const socket = io(SOCKET_URL, {
      query: { userId },
      transports: ["websocket"],
    });
    set({ socket });

    socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("❌ Socket disconnected"));
    socket.on("newMessage", (msg) => {
      // append new incoming message
      set((state) => ({
        messages: Array.isArray(state.messages)
          ? [...state.messages, msg]
          : [msg],
      }));
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  // ✅ Fetch messages between two users
  fetchMessages: async (userId, targetId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/${targetId}`, {
        params: { userId },
      });
      set({
        messages: Array.isArray(res.data.messages) ? res.data.messages : [],
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching messages:", err.message);
      set({ loading: false });
    }
  },

  // ✅ Send a new message
  sendMessage: async (text) => {
    const { socket, selectedChat } = get();
    const { user } = useUserStore.getState();
    if (!selectedChat || !text.trim()) return;

    try {
      const res = await axios.post(`/send/${selectedChat.userId}`, {
        senderId: user.id,
        text,
      });

      const newMsg = res.data.newMsg; // depends on your backend naming
      set((state) => ({
        messages: Array.isArray(state.messages)
          ? [...state.messages, newMsg]
          : [newMsg],
      }));

      if (socket) socket.emit("sendMessage", newMsg);
    } catch (err) {
      console.error("Error sending message:", err.message);
    }
  },

  // ✅ Change selected chat
  setSelectedChat: (chat) => set({ selectedChat: chat, messages: [] }),
}));
