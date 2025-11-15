import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { IoColorPaletteOutline } from "react-icons/io5";

const themes = [
  {
    id: "default",
    label: "Default",
    dot: "bg-white border-1 border-gray-300",
  },
  // {
  //   id: "dark",
  //   label: "Dark",
  //   dot: "bg-black",
  // },
  {
    id: "neon",
    label: "Soft Pink",
    dot: "bg-gradient-to-r from-purple-100 to-pink-400",
  },
  {
    id: "bubble",
    label: "Bouncy Blue",
    dot: "bg-gradient-to-r from-cyan-300 to-blue-500",
  },
  {
    id: "orange",
    label: "Sunny Orange",
    dot: "bg-gradient-to-r from-yellow-300 to-orange-500",
  }
];

export default function ThemePopover({ onThemeChange }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <PopoverTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-200 transition">
          <IoColorPaletteOutline size={25} />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-52 mr-2 p-3 hover:shadow-lg transition">
        {/* Heading */}
        <p className="text-md font-semibold mb-3">Choose your Theme </p>

        {/* Theme Buttons */}
        <div className="space-y-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                onThemeChange(t.id);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-200"
            >
              {/* Color Dot */}
              <div className={`w-5 h-5 rounded-full ${t.dot}`}></div>

              {/* Label */}
              {t.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
