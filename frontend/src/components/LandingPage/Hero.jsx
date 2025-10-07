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
        ease: 'power2.inOut',
        duration: 0.8
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
        ease: 'power2.inOut',
        duration: 0.8
    }
    , '-=0.4')
      .fromTo(
        "#pixar",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.inOut',
          duration: 0.8
        }
      )
  }, []);

  return (
    <div className="w-full overflow-hidden min-h-screen ">
      <div className="flex h-[40vh] z-50 flex-col gap-8 justify-center items-center">
        <div id="" className="flex flex-col justify-center items-center">
          <h1 className="text-8xl z-50 tracking-tighter font-semibold text-zinc-800 leading-[4rem]">
            make conversation{" "}
          </h1>
          <h1 className="text-8xl z-50 tracking-tighter font-semibold text-zinc-800">
            feel <span className="text-orange-500">human</span> again
          </h1>
        </div>
        <p id="heading" className="text-lg z-50 tracking-tight text-zinc-600">
          Your space to say hey, share moments, and vibe.
        </p>
        <div className="flex items-center gap-5 z-50">
          <Button
            id="bt1"
            className={"rounded-[0.8rem]  text-md cursor-pointer"}
          >
            Wave now{" "}
            <span>
              <ArrowRight className="-rotate-45" />
            </span>
          </Button>
          <Button
            id="bt2"
            className={
              "rounded-[0.8rem]  text-md cursor-pointer border-zinc-800"
            }
            variant={"outline"}
          >
            Join communities{" "}
          </Button>
        </div>
      </div>
      <div id="pixar" className="-mt-56">
        <img src="/images/friends.jpg" className="scale-[] ml-0" />
      </div>
    </div>
  );
};

export default Hero;
