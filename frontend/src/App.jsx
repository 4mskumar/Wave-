import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, useUser, SignUp } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useUserStore } from "./app/UserStore";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./components/shared/SignInPage";
import SharePost from "./components/SharePost";
import { useMessageStore } from "./app/UserMessageStore";
import UserProfile from "./components/shared/UserProfile";
import useNotificationsSocket from "./api/NotificationSocket";

function App() {
  useNotificationsSocket()
  const { user, isLoaded, isSignedIn } = useUser();
  const {userId} = useAuth()
      
  const {getGlobalUsers, socket, disconnectSocket, setUser} = useUserStore();
  const {connectSocket} = useMessageStore()
  

  useEffect(() => {
    if (!isLoaded) return; // wait for Clerk

    if (isSignedIn && user) {
      // console.log("✅ User logged in:", user.id);

      // set user in your Zustand store
      setUser({
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
      });

      // connect socket
      const sock = connectSocket(user.id);
      // console.log("🟢 Socket connected:", sock?.id);

      // cleanup when user logs out or refreshes
      return () => {
        disconnectSocket();
        // console.log("🔴 Socket disconnected");
      };
    }
  }, [isLoaded, isSignedIn, user?.id]);

  useEffect(() => {
    if(userId && user){
      getGlobalUsers(userId);
    }
  }, [userId, user])

  return (
    <div className="zalando-sans">
      <Router>
        <Routes>
          {!isSignedIn ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-in/*" element={<SignInPage />} />
              <Route path="*" element={<Navigate to="/sign-in" />} />
<Route path="/sign-up/*" element={<SignUp />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/:id" element={<UserProfile />} />
              
              <Route path="/chat" element={<Chat />} />
              <Route path="/sharepost" element={<SharePost />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

