import React from "react";
import { CurrentUser } from "../../models/models";

const UserInfo: React.FC<CurrentUser> = ({ picture, username, full_name }) => {
  return (
    <div className="flex gap-2">
      <img
        src={picture}
        className="w-[40px] h-[40px] object-cover rounded-full"
        alt="user_picture"
      />
      <div>
        <p className="text-[14px] text-figmaGrayShade">@{username}</p>
        <p className="text-[16px] text-[#222222]">{full_name}</p>
      </div>
    </div>
  );
};

export default UserInfo;
