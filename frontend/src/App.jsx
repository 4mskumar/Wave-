import "./App.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { useUser } from "@clerk/clerk-react";
import SignInPage from "./components/shared/SignInPage";

function App() {
  const { isSignedIn } = useUser();

  const appRouter = createBrowserRouter(
    !isSignedIn
      ? [
          { path: "/", element: <LandingPage /> },
          { path: "/signin", element: <SignInPage /> },
        ]
      : [
          { path: "/", element: <Home /> },
          { path: "/home", element: <Home /> },
          { path: "/settings", element: <Settings /> },
          { path: "/profile", element: <Profile /> },
          { path: "/chat", element: <Chat /> },
          
        ]
  );

  return (
    <div className="zalando-sans">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
