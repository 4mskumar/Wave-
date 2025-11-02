import { Bell } from "lucide-react";

import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNotificationStore } from "../../app/notifyStore";

const NotificationDropdown = () => {
  const { userId } = useAuth();
  const { notifications, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    if (userId) fetchNotifications(userId);
  }, [userId]);

  return (
    <div className="relative">
      <Bell className="cursor-pointer" />
      {notifications.some((n) => !n.isRead) && (
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      )}

      <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden z-20">
        {notifications.length === 0 ? (
          <p className="p-3 text-sm text-gray-500">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`flex items-center gap-3 p-3 text-sm border-b cursor-pointer hover:bg-gray-50 ${
                n.isRead ? "bg-white" : "bg-gray-100"
              }`}
            >
              <img
                src={n.senderImage || "/default-avatar.png"}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{n.senderUsername || "Unknown"}</p>
                <p className="text-gray-600 text-xs">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
