import React from "react";
import { MdLogout } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const UserDropDownMenu: React.FC = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-[200px] p-3 absolute top-[70px] bg-[#F9F9F9] right-[80px] rounded-lg">
      <p className="flex gap-2 items-center mb-[15px] text-[16px] font-bold hover:bg-[#A6A6A6] p-1 rounded-md cursor-pointer">
        <span className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white">
          <IoPerson className="text-blue-500 text-[20px]" />
        </span>
        My Profile
      </p>
      <p
        onClick={logOut}
        className="flex gap-2 items-center  text-[16px] font-bold hover:bg-[#A6A6A6] p-1 rounded-md cursor-pointer"
      >
        <span className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white">
          <MdLogout className="text-blue-500 text-[20px]" />
        </span>
        Log Out
      </p>
    </div>
  );
};

export default UserDropDownMenu;
