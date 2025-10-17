import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import gsap from "gsap";

const Hero = () => {
  useEffect(() => {
    const t1 = gsap.timeline();

    t1.fromTo(
      "#heading",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        zIndex: 10,
      }
    )
      .fromTo(
        "#bt1",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          duration: 0.8,
        }
      )
      .fromTo(
        "#bt2",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          duration: 0.8,
        },
        "-=0.4"
      )
      .fromTo(
        "#pixar",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          duration: 0.8,
        }
      );
  }, []);

  return (
    <div className="w-full overflow-hidden min-h-screen ">

      <div className="flex h-[40vh] z-50 flex-col gap-8 justify-center items-center">
        {/* header */}
        <div className="flex flex-col justify-center items-center text-center px-4 sm:mt-0 mt-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl z-50 tracking-tighter font-semibold text-zinc-800 leading-tight sm:leading-[4rem]">
            make conversation{" "}
          </h1>
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl z-50 tracking-tighter font-semibold text-zinc-800">
            feel <span className="text-orange-500">human</span> again
          </h1>
        </div>

        <p
          id="heading"
          className="sm:text-lg z-50 tracking-tight sm:text-zinc-600 text-black text-center text-sm"
        >
          Your space to say hey, share moments, and vibe.
        </p>

        <div className="flex flex-col sm:flex-row items-center sm:gap-3 gap-2 z-10">
          <Button
            id="bt1"
            className="rounded-[0.6rem] text-sm px-3 py-1.5 cursor-pointer w-full sm:w-auto"
          >
            Wave now{" "}
            <span>
              <ArrowRight className="-rotate-45 w-4 h-4" />
            </span>
          </Button>
          <Button
            id="bt2"
            className="rounded-[0.6rem] text-sm px-3 py-1.5 cursor-pointer border-zinc-800 w-full sm:w-auto"
            variant="outline"
          >
            Join communities
          </Button>
        </div>
      </div>
      
      {/* IMAGE */}
      <div id="pixar" className="mt-28.5 sm:-mt-56">
        <img
          src="/images/friends.jpg"
          className="h-58 sm:h-150 sm:w-500 w-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
