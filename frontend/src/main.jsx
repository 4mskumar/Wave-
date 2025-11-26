import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "./components/ui/sonner.jsx";
import { BrowserRouter } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL}
      publishableKey={PUBLISHABLE_KEY}
      localization={{
        signIn: {
          start: {
            title: "Sign in to Wave",
          },
        },
        signUp: {
          start: {
            title: "Create your Wave account",
          },
        }
      }}
    >
      {/* <BrowserRouter> */}
        <App />
        <Toaster />
      {/* </BrowserRouter> */}
    </ClerkProvider>
  </StrictMode>
);
