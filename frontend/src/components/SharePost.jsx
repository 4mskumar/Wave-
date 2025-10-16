import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Loader2, X } from "lucide-react";
import useUserPostStore from "../app/UserPostStore";
import { useAuth, useUser } from "@clerk/clerk-react";

const SharePost = ({ onSuccess }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const {userId} = useAuth()

  const { addPost, loading } = useUserPostStore();

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image preview
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  // Share post
  const handleShare = async () => {
    if (!caption && !image) {
      toast.error("Please add a caption or upload an image.");
      return;
    }

    const res = await addPost(userId, caption, image)

    if(res.success){
      toast(res.message, {
        className:
          "bg-green-100 text-green-700 font-semibold shadow-md rounded-xl",
      });
      setOpen(false);
      setCaption("");
      setImage(null);
      setPreview(null);
      onSuccess?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black rounded-full text-white hover:bg-gray-800 transition-all">
          <span className="text-xl mr-1">+</span> Create Post
        </Button>
      </DialogTrigger>

      {/* Responsive Modal */}
      <DialogContent
        className="w-[90vw] sm:w-[70vw] md:w-[50vw] max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
      >
        <DialogHeader>
          <DialogTitle>
            <h2 className="tracking-tighter text-2xl sm:text-3xl">
              Create your <span className="italic text-gray-800">Wave</span>
            </h2>
          </DialogTitle>
        </DialogHeader>

        {/* Caption Input */}
        <div className="space-y-2 mt-4">
          <label className="font-medium text-base sm:text-lg text-gray-700 tracking-tight">
            Caption
          </label>
          <Textarea
            className="mt-1 bg-gray-100 resize-none text-sm sm:text-base"
            placeholder="Write something..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2 mt-4">
          <label className="font-medium text-base sm:text-lg text-gray-700 tracking-tight">
            Upload Image
          </label>
          <Input
            className="mt-1 bg-gray-100 text-sm sm:text-base"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="relative w-full max-w-sm mt-4">
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg border border-gray-300 w-full object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
            >
              <X size={18} className="text-gray-600" />
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleShare}
            className="bg-black text-white hover:bg-gray-800 text-sm sm:text-base tracking-tight px-5 py-2 rounded-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              "Share Now"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePost;
