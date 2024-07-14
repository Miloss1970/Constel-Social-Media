import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LikeButtonProps } from "../../models/models";

const ButtonLike: React.FC<LikeButtonProps> = ({
  handleLikePost,
  liked,
  likes,
  postId,
}) => {
  return (
    <button
      onClick={() => handleLikePost(liked, postId)}
      className={`flex gap-2 items-center px-[20px] py-[4px] rounded-lg  ${
        liked
          ? "bg-figmaBlue text-white  hover:bg-figmaBlueShade"
          : "bg-[#D9D9D9]  text-figmaGrayShade hover:text-white hover:bg-figmaGrayShade"
      }  transition-all duration-300`}
    >
      {liked ? <FaHeart /> : <FaRegHeart />} <span>{likes}</span>
    </button>
  );
};

export default ButtonLike;
