import { useNavigate } from "react-router-dom";

const CommentsSection = ({ selectedPost }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 space-y-2">
      {selectedPost.comments && selectedPost.comments.length > 0 ? (
        selectedPost.comments.map((comment, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-100 transition-all"
          >
            {/* User Image */}
            <img
              src={
                comment.userImageUrl ||
                "https://via.placeholder.com/40x40?text=User"
              }
              alt={comment.username}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gray-300"
            />

            {/* Comment Text */}
            <div className="flex-1">
              <p className="text-sm text-gray-800 leading-snug">
                <span
                  onClick={() => navigate(`/user/${comment.userId}`)}
                  className="font-semibold mr-2 cursor-pointer hover:underline hover:text-black transition"
                >
                  {comment.username || "Unknown"}
                </span>
                {comment.text}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center text-xs py-2">
          No comments yet
        </p>
      )}
    </div>
  );
};

export default CommentsSection;
