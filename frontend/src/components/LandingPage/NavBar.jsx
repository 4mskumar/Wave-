import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

const NavBar = () => {
  const navRefs = useRef([]);

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
    <div className="flex px-5 py-3 justify-between items-center">
      {/* Logo */}
      <div>
        <img src="/images/wave-logo.png" className="w-20" alt="Wave logo" />
      </div>

      {/* Nav Items */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (navRefs.current[index] = el)}
              className="relative text-[0.95rem] cursor-pointer font-medium tracking-tight text-zinc-600 hover:text-zinc-800 "
            >
              {item}
            </div>
          ))}
        </div>

        {/* Login Button */}
        <div>
          <SignedOut>
            <SignInButton forceRedirectUrl={"/home"}>
              <Button
                variant=""
                className="rounded-full font-semibold tracking-tight"
              >
                Login{" "}
                <span>
                  <ArrowRight className="-rotate-45 ml-1" size={18} />
                </span>
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
