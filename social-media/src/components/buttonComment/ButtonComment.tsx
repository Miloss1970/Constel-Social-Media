import React from "react";
import { FaRegComment } from "react-icons/fa";

type ButtonCommentProps = {
  type: string;
  action?: () => void | null;
  comments: number;
};

const ButtonComment: React.FC<ButtonCommentProps> = ({
  type,
  action,
  comments,
}) => {
  const handleClick = () => {
    if (type === "modal" && action) {
      action();
    }
  };

  return (
    <button
      className="flex gap-2 items-center px-[20px] py-[4px] rounded-lg text-figmaGrayShade bg-figmaGrayLight hover:text-white hover:bg-figmaGrayShade transition-all duration-300"
      onClick={handleClick}
    >
      <FaRegComment /> <span>{comments}</span>
    </button>
  );
};

export default ButtonComment;
