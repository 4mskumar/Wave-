import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    navRefs.current.forEach((el) => {
      if (!el) return;

      const underline = document.createElement("span");
      underline.className =
        "absolute left-0 bottom-0 h-[1px] bg-zinc-800 w-0 origin-left";
      el.appendChild(underline);

      el.addEventListener("mouseenter", () => {
        gsap.to(underline, {
          width: "100%",
          duration: 0.3,
          ease: "power3.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(underline, {
          width: "0%",
          duration: 0.3,
          ease: "power3.inOut",
        });
      });
    });
  }, []);

  const navItems = ["Features", "Contact", "Dev"];

  return (
    <nav className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white relative z-50">
      {/* Logo */}
      <div>
        <img src="/images/wave-logo.png" className="w-20" alt="Wave logo" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => (navRefs.current[index] = el)}
            className="relative text-[0.95rem] cursor-pointer font-medium tracking-tight text-zinc-600 hover:text-zinc-800"
          >
            {item}
          </div>
        ))}
        <SignedOut>
          <SignInButton forceRedirectUrl={"/home"}>
            <Button className="rounded-full font-semibold tracking-tight">
              Login{" "}
              <span>
                <ArrowRight className="-rotate-45 ml-1" size={18} />
              </span>
            </Button>
          </SignInButton>
        </SignedOut>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-zinc-700 hover:text-black"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 z-50 transition-all">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-zinc-700 hover:text-black"
          >
            <X size={26} />
          </button>

          {navItems.map((item, index) => (
            <div
              key={index}
              className="text-xl font-medium tracking-tight text-zinc-700 hover:text-black cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </div>
          ))}

          <SignedOut>
            <SignInButton forceRedirectUrl={"/home"}>
              <Button className="rounded-full font-semibold tracking-tight text-base px-6 py-2">
                Login{" "}
                <span>
                  <ArrowRight className="-rotate-45 ml-1" size={18} />
                </span>
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
