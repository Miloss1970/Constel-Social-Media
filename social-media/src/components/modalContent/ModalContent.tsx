import { useEffect, useState } from "react";

import { FaRegCalendar } from "react-icons/fa";
import { format } from "date-fns";
import { LuSend } from "react-icons/lu";
import ButtonLike from "../buttonLike/ButtonLike";
import { useDispatch, useSelector } from "react-redux";
import { icrementComment, likePost, unLike } from "../../store/postSlice";
import ButtonComment from "../buttonComment/ButtonComment";
import {
  addComment,
  getAllComments,
  storeAllComments,
} from "../../store/commentSlice";
import CommentCard from "../commentCard/CommentCard";
import UserInfo from "../userInfo/UserInfo";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { callApi } from "../../service/service";
import { CurrentUser, ModalContentProps, Post } from "../../models/models";

const ModalContent: React.FC<ModalContentProps> = ({ postId, closeModal }) => {
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [account, setAccout] = useState<CurrentUser | null>(null);
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();
  const allComments = useSelector(getAllComments);
  useEffect(() => {
    //promise.all
    callApi({ method: "GET", url: `posts/${postId}` }).then((res) => {
      if (res.error) return <div>{res.error.message}</div>;
      setSinglePost(res.post);
    });

    callApi({ method: "GET", url: `posts/${postId}/comments` }).then((res) => {
      if (res.error) return <div>{res.error.message}</div>;
      dispatch(storeAllComments(res.comments));
    });

    callApi({ method: "GET", url: "accounts/me" }).then((res) =>
      setAccout(res.account)
    );
  }, []);

  const handlePost = () => {
    if (commentText.trim() !== "") {
      callApi({
        method: "POST",
        url: `posts/${postId}/comments`,
        body: { text: commentText },
      }).then((res) => {
        if (res.error) return toast.error(`${res.error.message}`);
        dispatch(addComment(res.data.comment));
        dispatch(icrementComment(postId));
        toast.success("Comment successfully created");
      });

      setCommentText("");
    }
  };

  const handleLike = () => {
    if (!singlePost) return;

    const likeAction = singlePost.liked
      ? callApi({ method: "DELETE", url: `posts/${postId}/like` })
      : callApi({ method: "POST", url: `posts/${postId}/like`, body: null });
    const liked = !singlePost.liked;

    likeAction.then((res) => {
      if (res.error) return toast.error(`${res.error.message}`);
      dispatch(liked ? likePost(postId) : unLike(postId));
      setSinglePost((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          liked: liked,
          likes: liked ? prev.likes + 1 : prev.likes - 1,
        };
      });
    });
  };

  return (
    <div className="md:max-h-[100vh] max-h-[500px] relative lg:w-[700px] w-[350px] sm:w-[400px] rounded-lg md:w-[450px] z-40 overflow-y-scroll bg-white p-5">
      {singlePost && (
        <UserInfo
          picture={singlePost.user.picture}
          username={singlePost.user.username}
          full_name={singlePost.user.full_name}
          email={singlePost.user.email}
        />
      )}
      {singlePost?.image && (
        <img
          className="w-full object-cover max-h-[300px] mt-5 rounded-md"
          src={singlePost.image}
        />
      )}

      {singlePost?.created_at && (
        <p className="flex gap-2 text-[14px] text-figmaGrayShade items-center">
          <FaRegCalendar />
          {format(new Date(`${singlePost?.created_at}`), "dd.MM.yyyy")}
        </p>
      )}

      <p className="mt-2">{singlePost?.text}</p>
      <div className="relative">
        <input
          className="h-[50px] w-full  border-b border-solid border-[#A6A6A6] focus:border-blue-500 outline-none bg-transparent"
          type="text"
          placeholder="Write a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <LuSend
          onClick={handlePost}
          className={`absolute top-4 right-0 text-[25px] ${
            commentText ? "text-figmaBlue" : "text-figmaGrayShade"
          } text-[#A6A6A6] `}
        />
      </div>

      {singlePost && (
        <div className="mt-[15px] flex gap-2">
          <ButtonLike
            liked={singlePost.liked}
            likes={singlePost.likes}
            postId={singlePost?.post_id}
            handleLikePost={handleLike}
          />

          <ButtonComment type="dummy" comments={allComments.length} />
        </div>
      )}

      <p>
        {allComments.length > 0
          ? `${allComments.length} comments`
          : `No comments`}
      </p>
      <div>
        {allComments.length > 0 ? (
          <div>
            {allComments.map((comment: any) => {
              return (
                <div className="mt-[20px]">
                  <CommentCard
                    account={account}
                    data={comment}
                    postId={postId}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <IoCloseSharp
        onClick={closeModal}
        className="absolute z-[99] top-1 text-[40px] text-figmaGrayShade right-7"
      />
    </div>
  );
};

export default ModalContent;
