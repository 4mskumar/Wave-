import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import useUserPostStore from "../app/UserPostStore";

/*
    Your task for this
    - Make the ui more minimal and clean use icons like '+' in preview image section.
    - Add loading state tothe button.
    - Add error state.
    - Use zustand store to access loading and error.
    - Use toast to show error and message of published post.
    - Make the window of dialog use 75% of width and height it should be big
    Goodluck bubu 💘

*/

const SharePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { addPost } = useUserPostStore(); // here is the store, access loading and error like {addPost, error, loading}

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Post Submitted:", { caption, image });
    // 👉 send to backend here using FormData
    if (!caption || !image) {
      alert("Caption and image are required");
      return;
    }

    // FormData for file upload
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("userId", "test_user_123"); // replace with actual logged-in userId
    formData.append("image", image);

    try {
      await addPost("test_user_123", caption, image); // call zustand store
      setCaption("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error uploading post:", err);
    }
  };

  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Create a Post
        </DialogTitle>
      </DialogHeader>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left: Form */}
        <div className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write something..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex items-center justify-center border rounded-2xl bg-muted">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 rounded-xl object-contain"
            />
          ) : (
            <span className="text-gray-500">No image selected</span>
          )}
          4mskumar iamcinsrusher@gmail.com 
            git config --global user.email "iamcinsrusher@gmail.com"
            git config --global user.name "4mskumar"
        </div>

        <DialogFooter className="col-span-2">
          <Button
            onClick={handleSubmit}
            type="submit"
            className="w-full md:w-auto"
          >
            Share {/* add loading here */}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default SharePost;
