import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Home from "./components/Home";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./components/shared/SignInPage";

function App() {
  const { isSignedIn } = useUser();

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
              {/* Redirect all unknown routes to home */}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
