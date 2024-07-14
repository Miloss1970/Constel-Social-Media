import React, { useState } from "react";
import { format } from "date-fns";
import { FaRegCalendar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { likePost, removePost, unLike } from "../../store/postSlice";
import Modal from "../modal/Modal";
import ModalContent from "../modalContent/ModalContent";
import ButtonComment from "../buttonComment/ButtonComment";
import UserInfo from "../userInfo/UserInfo";
import toast from "react-hot-toast";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import { callApi } from "../../service/service";
import ButtonLike from "../buttonLike/ButtonLike";
import { PostCardProps } from "../../models/models";

const PostCard: React.FC<PostCardProps> = ({ data, account }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isMyPost = data.user.username === account?.username;

  const handleLikePost = (isLiked: boolean, post_id: string) => {
    const likeAction = isLiked
      ? callApi({ method: "DELETE", url: `posts/${post_id}/like` })
      : callApi({ method: "POST", url: `posts/${post_id}/like`, body: null });

    likeAction.then((res) => {
      if (res.error) return toast.error(`${res.error.message}`);
      dispatch(isLiked ? unLike(post_id) : likePost(post_id));
    });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const deletePost = (id: string) => {
    callApi({ method: "DELETE", url: `posts/${id}` }).then((res) => {
      if (res.error) return toast.error(`${res.error.message}`);

      dispatch(removePost(id));
      toast.success("Post successfully deleted");
    });
  };
  return (
    <div className="w-full bg-figmaGray p-6 rounded-md">
      <div className="flex justify-between">
        <UserInfo
          picture={data.user.picture}
          username={data.user.username}
          full_name={data.user.full_name}
          email={data.user.email}
        />
        <div className="flex gap-4 items-center">
          <p className="flex gap-2 text-[14px] text-figmaGrayShade items-center">
            <FaRegCalendar />
            {format(new Date(`${data.created_at}`), "dd.MM.yyyy")}
          </p>
          {isMyPost ? (
            <p
              onClick={() => deletePost(data.post_id)}
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
      {data.image && (
        <img
          className="w-full object-cover max-h-[360px] mt-5 rounded-md"
          src={data.image}
        />
      )}
      {data.audio && <AudioPlayer audio={data.audio} />}
      <p className="mt-2">{data.text}</p>
      <div className="flex gap-2 mt-4">
        <ButtonLike
          handleLikePost={handleLikePost}
          liked={data.liked}
          likes={data.likes}
          postId={data.post_id}
        />

        <ButtonComment
          type="modal"
          action={handleOpenModal}
          comments={data.comments}
        />
      </div>
      <Modal show={showModal} closeModal={handleCloseModal}>
        <ModalContent postId={data.post_id} closeModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default PostCard;
