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
      <DialogContent className="max-w-sm text-center rounded-2xl bg-gradient-to-b from-orange-200 to-green-200 shadow-lg border border-orange-300 h-[200px]">
        <DialogHeader>
          <DialogTitle className="text-3xl  text-orange-700 text-center tracking-wide font-bold flex items-center justify-center gap-2">
            Namaste 
            <FaPrayingHands />

          </DialogTitle>
          <DialogDescription className="text-sm text-center tracking-wider text-gray-700 mt-2">
            Hope you're{" "}
            <span className="font-medium text-orange-600 italic">vibing</span> and{" "}
            <span className="font-medium text-orange-600 italic">waving</span>
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={() => setOpen(false)}
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6"
        >
          Click to explore
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Welcome;
