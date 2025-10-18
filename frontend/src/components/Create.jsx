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

  // Handle share (keeps backend logic)
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
            className="w-full justify-start gap-3 text-[16px] tracking-tight font-medium text-zinc-600 hover:text-zinc-900"
          >
            <span className="text-xl">+</span> Create
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-xl w-[90vw] rounded-2xl p-0 overflow-hidden [&>button]:hidden">
          {/* Close button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDiscardOpen(true)}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Step 1: Select image */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold mb-4">
                  Create new post
                </DialogTitle>
              </DialogHeader>
              <p className="text-gray-500 mb-4">
                Drag photos and videos here
              </p>
              
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="file-upload"
              />
              <Button
                onClick={() => document.getElementById("file-upload").click()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Select From Computer
              </Button>
            </div>
          )}

          {/* Step 2: Preview */}
          {step === 2 && preview && (
            <div className="flex flex-col items-center justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-h-[70vh] object-contain"
              />
              <div className="flex justify-between w-full p-4">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-gray-700"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Caption + Share */}
          {step === 3 && (
            <div className="flex flex-col sm:flex-row h-[70vh]">
              <div className="sm:w-1/2 flex items-center justify-center bg-black">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain max-h-full"
                />
              </div>
              <div className="sm:w-1/2 flex flex-col justify-between p-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user?.imageUrl}
                      alt="profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <p className="font-semibold text-gray-800">
                      {user?.fullName}
                    </p>
                  </div>
                  <Textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="bg-gray-100 resize-none"
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
