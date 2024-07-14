import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { removeComment } from "../../store/commentSlice";
import { decrementComment } from "../../store/postSlice";
import toast from "react-hot-toast";
import { callApi } from "../../service/service";
import { CommentCardProps } from "../../models/models";

const CommentCard: React.FC<CommentCardProps> = ({ data, account, postId }) => {
  const dispatch = useDispatch();
  const isMyPost = data.username === account?.username;

  const handleDelete = () => {
    callApi({
      method: "DELETE",
      url: `posts/${postId}/comments/${data.comment_id}`,
    }).then((res) => {
      if (res.error) return toast.error(`${res.error.message}`);
      dispatch(removeComment(data.comment_id));
      dispatch(decrementComment(postId));
      toast.success("Comment successfully deleted");
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            src={data.picture}
            className="w-[40px] h-[40px] object-cover rounded-full"
            alt="user_picture"
          />
          <div>
            <p className="text-[14px] text-figmaGrayShade">@{data.username}</p>
            <p className="text-[16px] text-[#222222]">{data.full_name}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="flex gap-2 text-[14px] text-figmaGrayShade items-center">
            <FaRegCalendar />
            {format(new Date(`${data.created_at}`), "dd.MM.yyyy")}
          </p>
          {isMyPost ? (
            <p
              onClick={handleDelete}
              className="flex gap-1 text-figmaRed text-[14px] items-center cursor-pointer"
            >
              <RiDeleteBin6Line />
              Delete
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="mt-[10px]">{data.text}</p>
    </div>
  );
};

export default CommentCard;
