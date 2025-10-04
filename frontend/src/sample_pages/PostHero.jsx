import React, { useEffect, useState } from "react";
import useUserPostStore from "../app/UserPostStore";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Heart, MessageCircle } from "lucide-react";

const PostHero = ({ userId }) => {
  const { posts, toggleLike, fetchPosts } = useUserPostStore();
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPosts("test_user_123")
  }, [])

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto py-6">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts yet...</p>
      ) : (
        posts.map((post) => (
          <Card key={post._id} className="shadow-md rounded-2xl">
            {/* Image */}
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="post"
                className="w-full h-64 object-cover rounded-t-2xl"
              />
            )}

            <CardContent className="p-4 space-y-4">
              {/* Caption */}
              <p className="font-medium">{post.caption}</p>

              {/* Like + Comment button */}
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => toggleLike(userId, post._id)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      post.likes.includes(userId) ? "text-red-500 fill-red-500" : ""
                    }`}
                  />
                  {post.likes.length}
                </Button>

                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-gray-500" />
                  <span>{post.comments?.length || 0}</span>
                </div>
              </div>

              {/* Comment Section */}
              <div className="mt-2 space-y-2">
                {post.comments?.length > 0 &&
                  post.comments.map((c, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-700 border-b border-gray-200 pb-1"
                    >
                      <span className="font-semibold">{c.userId}: </span>
                      {c.text}
                    </p>
                  ))}

                {/* Add Comment Input */}
                <div className="flex gap-2">
                  <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                  />
                  <Button
                    onClick={() => {
                      // TODO: add comment handler in store
                      console.log("Add comment:", commentText);
                      setCommentText("");
                    }}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PostHero;
