import type { CommentGet } from "../../models/Comment";

interface Props {
  comments: CommentGet[];
}

const StockCommentList = ({ comments }: Props) => {
  return (
    <div className="space-y-4 mt-4">
      {comments.length === 0 && (
        <p className="text-gray-400 text-sm">
          No comments yet. Be the first to comment!
        </p>
      )}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white shadow-sm rounded-xl border border-gray-100 p-4"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-800">{comment.title}</h4>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdOn).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{comment.content}</p>
          <p className="text-xs text-gray-400 mt-2">by {comment.createdBy}</p>
        </div>
      ))}
    </div>
  );
};

export default StockCommentList;