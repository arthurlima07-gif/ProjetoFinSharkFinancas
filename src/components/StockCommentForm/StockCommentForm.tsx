import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { CommentPost } from "../../models/Comment";

interface Props {
  onCommentCreated: (comment: CommentPost) => void;
}

const validation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const StockCommentForm = ({ onCommentCreated }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentPost>({ resolver: yupResolver(validation) });

  const onSubmit = (data: CommentPost) => {
    onCommentCreated(data);
    reset();
  };

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 mt-4">
      <h3 className="text-lg font-semibold mb-4 text-darkBlue">
        Leave a Comment
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-lightBlue text-sm"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <textarea
            placeholder="Your comment..."
            rows={4}
            className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-lightBlue resize-none text-sm"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-lightBlue text-white rounded-lg hover:opacity-70 transition font-semibold text-sm"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default StockCommentForm;