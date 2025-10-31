import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaPrayingHands } from "react-icons/fa";
import { PiHandsPrayingFill } from "react-icons/pi";
const Welcome = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("hasShownNamaste");

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("hasShownNamaste", "true");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/10 backdrop-blur-xs" /> 
      <DialogContent className="text-center rounded-lg shadow-lg border border-orange-200 h-[200px] w-[350px]"
      >
        <DialogHeader>
          <DialogTitle className="text-4xl text-center tracking-wide font-bold flex items-center justify-center gap-2">
            Namaste
            <span className="">
              <PiHandsPrayingFill />
            </span>
          </DialogTitle>
          <DialogDescription className="text-md tracking-tight text-center text-gray-800">
            Welcome to WAVE
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={() => setOpen(false)}
          className="text-white rounded-full px-4 py-2 bg-gray-800 hover:bg-gray-800 text-sm flex items-center gap-2 mx-auto"
        >
          Click to explore
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Welcome;
