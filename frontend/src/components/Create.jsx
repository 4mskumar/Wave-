import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useUserPostStore from "../app/UserPostStore";
import { useAuth, useUser } from "@clerk/clerk-react";

const Create = ({ onSuccess }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 = select, 2 = preview, 3 = caption
  const [discardOpen, setDiscardOpen] = useState(false);

  const { userId } = useAuth();
  const { user } = useUser();
  const { addPost, loading } = useUserPostStore();

  // Handle file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setStep(2);
    }
  };

  // Handle discard
  const handleDiscard = () => {
    setDiscardOpen(false);
    setOpen(false);
    setStep(1);
    setImage(null);
    setPreview(null);
    setCaption("");
  };

  // Handle share
  const handleShare = async () => {
    if (!caption && !image) {
      toast.error("Please add a caption or upload an image.");
      return;
    }

    const res = await addPost(userId, caption, image);

    if (res.success) {
      toast.success(res.message);
      handleDiscard();
      onSuccess?.();
    } else {
      toast.error(res.message || "Failed to share post.");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-[18px] font-medium"
          >
            <span className="text-xl">+</span> Create
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl w-[95vw] sm:w-[90vw] rounded-2xl p-0 overflow-hidden [&>button]:hidden">
          {/* Close button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDiscardOpen(true)}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-black" />
            </Button>
          </div>

          {/* Step 1: Select image */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-center p-6 text-center w-full">
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl text-zinc-800 font-semibold tracking-tight mb-2">
                  Create new post
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                <p className="text-sm sm:text-md text-zinc-500 tracking-tight mb-4">
                  Make people know you
                </p>
                <img
                  src="/images/profile.png"
                  alt="Create post illustration"
                  className="w-48 sm:w-64 object-contain drop-shadow-sm mb-6"
                />
                <Button
                  onClick={() => document.getElementById("file-upload").click()}
                  className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md"
                >
                  Select From Computer
                </Button>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="file-upload"
                />
              </div>
            </div>
          )}

          {/* Step 2: Preview */}
          {step === 2 && preview && (
            <div className="flex flex-col items-center justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-h-[60vh] object-contain w-full"
              />
              <div className="flex justify-between items-center w-full p-3">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-gray-800"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Caption + Share */}
          {step === 3 && (
            <div className="flex flex-col sm:flex-row h-auto sm:h-[70vh]">
              {/* Left side: image */}
              <div className="sm:w-1/2 w-full flex items-center justify-center bg-black">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain max-h-[60vh] w-full"
                />
              </div>

              {/* Right side: caption */}
              <div className="sm:w-1/2 w-full flex flex-col justify-between p-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user?.imageUrl}
                      alt="profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {user?.fullName}
                    </p>
                  </div>
                  <Textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="bg-gray-100 resize-none h-24 sm:h-32 text-sm"
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleShare}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" /> Sharing...
                      </>
                    ) : (
                      "Share"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Discard Confirmation */}
      <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard post?</AlertDialogTitle>
            <AlertDialogDescription>
              If you leave, your edits won’t be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDiscardOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscard}>
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Create;
