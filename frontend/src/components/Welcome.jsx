import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
      <DialogContent className="max-w-sm text-center rounded-lg shadow-lg border border-orange-200 h-[200px]">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center tracking-wide font-bold flex items-center justify-center gap-2">
            Namaste
            <span className="">
              <PiHandsPrayingFill />
            </span>
          </DialogTitle>
          <DialogDescription className="text-sm text-center tracking-wider text-gray-700">
            Welcome to Wave
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={() => setOpen(false)}
          className="mt-4  text-white rounded-full px-6"
        >
          Click to explore
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Welcome;
