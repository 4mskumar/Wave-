import { create } from "zustand";
import axios from "../api/axiosConfig";

export const useNotificationStore = create((set, get) => ({
  notifications: [],

  fetchNotifications: async (userId) => {
    const res = await axios.get(`/notifications`, { params: { userId } });
    if (res.data.success) set({ notifications: res.data.notifications });
  },

  markAsRead: async (id) => {
    await axios.put(`/notifications/${id}/read`);
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      ),
    }));
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
    console.log(notification);
    
  },
}));
