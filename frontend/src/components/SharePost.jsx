import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X } from "lucide-react";

const SharePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // handle remove image
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  // handle share post
  const handleShare = () => {
    if (!caption && !image) {
      toast.error("Please add a caption or upload an image.");
      return;
    }

    toast.success("Post shared successfully!");
    setCaption("");
    setImage(null);
    setPreview(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black rounded-full text-white hover:bg-gray-800">
        <span className="text-xl">+</span> Create Post
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[50vw] !h-[70vh] !max-w-none !max-h-none overflow-y-auto rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle>
            <h2 className="tracking-tighter text-2xl">Create your <span className="font-style: italic">WAVE</span></h2>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label className="font-medium text-lg text-gray-700 tracking-tighter">Caption</label>
          <Textarea
            className='mt-2 bg-gray-100'
            placeholder="Write something..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-lg text-gray-700 tracking-tighter">Upload Image</label>
          <Input className='mt-2 bg-gray-100' type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {preview && (
          <div className="relative w-full max-w-sm">
            <img
              src={preview}
              alt="preview"
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
        <div className="flex justify-end mt-2">
          <Button
            onClick={handleShare}
            className="bg-black text-white hover:bg-gray-800 text-lg tracking-tighter"
          >
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePost;
