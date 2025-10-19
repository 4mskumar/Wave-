import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

import Home from "./components/Home";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./components/shared/SignInPage";
import SharePost from "./components/SharePost";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { connectSocket, disconnectSocket, setUser } = useUserStore();
  const {userId} = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      console.log("User logged in:", user.id);
      setUser({
        id: userId,
        username: user.username,
        imageUrl: user.imageUrl,
      });

      connectSocket(user.id); // ✅ only runs when user is signed in
    } else if (isLoaded && !isSignedIn) {
      disconnectSocket(); // ✅ auto disconnect when user logs out
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="zalando-sans">
      <Router>
        <Routes>
          {/* If NOT signed in */}
          {!isSignedIn ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-in/*" element={<SignInPage />} />
              {/* Redirect all other routes to sign-in */}
              <Route path="*" element={<Navigate to="/sign-in" />} />
            </>
          ) : (
            <>
              {/* Signed-in user routes */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/sharepost" element={<SharePost />} />
              {/* Redirect all unknown routes to home */}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "./app/UserStore";

const SharePostPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) navigate("/home"); // auto-return when closed
  }, [open, navigate]);

  return <SharePost open={open} setOpen={setOpen} />;
};

export default App;
