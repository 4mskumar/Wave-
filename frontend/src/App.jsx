import "./App.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { useUser } from "@clerk/clerk-react";
import SignInPage from "./components/shared/SignInPage";

const appRouter = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
]);


function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <div className="zalando-sans">
        <Routes>
          {!isSignedIn ? (
            <>
              <Route path={"/"} element={<LandingPage />}/>
              <Route path={"/signin"} element={<SignInPage />}/>
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
