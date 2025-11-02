import io from "socket.io-client";

import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNotificationStore } from "../app/notifyStore";

const socket = io("http://localhost:5000");

function useNotificationsSocket() {
  const { userId } = useAuth();
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (!userId) return;
    socket.emit("register", userId);

    socket.on("newNotification", (notification) => {
      addNotification(notification);
    });

    return () => socket.off("newNotification");
  }, [userId]);
}

export default useNotificationsSocket;
