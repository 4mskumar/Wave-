"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Paintbrush } from "lucide-react";
import { IoMdColorPalette } from "react-icons/io";

export default function ThemePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-200 transition">
          <IoMdColorPalette size={30} className="text-gray-800"/>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-52 mr-2 hover:shadow-lg transition">
        <p className="text-md font-semibold mb-2">Choose Theme</p>

        <div className="space-y-1 ">
          {/* Light */}
          {/* <button className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100">
            <div className="w-5 h-5 rounded-full bg-white border"></div>
            Light
          </button> */}

          {/* Dark */}
          <button className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-200">
            <div className="w-5 h-5 rounded-full bg-black"></div>
            Dark
          </button>

          {/* Gradient Pink */}
          <button className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-200">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            Neon Pink
          </button>

          {/* Bubble Blue */}
          <button className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-200">
            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
            Bubble Blue
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
