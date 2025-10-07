import React, { useRef, useEffect } from "react";
import NavBar from "../components/LandingPage/NavBar";
import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Features";


const LandingPage = () => {


  return (
    <div className="overflow-x-hidden">
      {/* Navbar */}
        <NavBar />
        <Hero />
        <Features />
    </div>
  );
};

export default LandingPage;
