import "./App.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { useUser } from "@clerk/clerk-react";
import SignInPage from "./components/shared/SignInPage";

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <div className="zalando-sans">
        <Routes>
          {!isSignedIn ? (
            <>
              <Route path={"/"} element={<LandingPage />}/>
              <Route path={"/sign-in"} element={<SignInPage />}/>
              <Route path={"/sign-in/factor-one"} element={<SignInPage />}/>
              <Route path="/sign-in/*" element={<Navigate to="/sign-in" replace />} />

            </>
          ) : (
            <>
              <Route path={"/home"} element={<Home />}/>
              <Route path={"/settings"} element={<Settings />}/>
              <Route path={"/profile"} element={<Profile />}/>
              <Route path={"/chat"} element={<Chat />}/>
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
