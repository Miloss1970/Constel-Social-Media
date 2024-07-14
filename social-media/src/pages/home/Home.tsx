import React, { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import PostCard from "../../components/postCard/PostCard";
import UserDropDownMenu from "../../components/userDropDownMenu/UserDropDownMenu";
import logo from "../../utills/images/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, storeAllPosts } from "../../store/postSlice";

import CreatePost from "../../components/createPost/CreatePost";
import { CurrentUser, Post } from "../../models/models";
import { callApi } from "../../service/service";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState<CurrentUser | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const posts = useSelector(getAllPosts);

  useEffect(() => {
    callApi({ method: "GET", url: "posts" }).then((res) => {
      if (res.error)
        return (
          <div className="h-[100vh] flex justify-center items-center font-bold text-[40px] text-red-700">
            {res.error.message}
          </div>
        );
      dispatch(storeAllPosts(res.posts));
    });

    callApi({ method: "GET", url: "accounts/me" }).then((res) =>
      setAccount(res.account)
    );
  }, []);

  const handleDropDownMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="container max-w-full grid grid-cols-1 lg:grid-cols-[300px,1fr,300px] relative">
      <div className="hidden lg:flex flex-col items-center pt-[20px]">
        <img
          src={logo}
          className="w-[50px] h-[50px] object-cover rounded-full mb-[20px]"
          alt=""
        />
        <h2 className="flex gap-[20px] text-[20px] text-figmaBlue font-bold items-center">
          <span className="text-[20px] text-figmaBlue">
            <TiHome />
          </span>
          Home
        </h2>
      </div>

      <div className="lg:hidden flex justify-between px-[50px]">
        <img
          src={logo}
          className="w-[50px] h-[50px] object-cover rounded-full mb-[20px]"
          alt=""
        />

        <img
          onClick={handleDropDownMenu}
          src={account?.picture}
          className="h-[40px] rounded-full w-[40x] cursor-pointer"
          alt=""
        />
      </div>

      <div className="border-l border-r border-gray-400 p-[20px]">
        <div>
          <div className="w-full rounded-md p-6  bg-figmaGray">
            {account && <CreatePost picture={account.picture} />}
          </div>
        </div>

        <div>
          {posts?.map((post: Post) => {
            return (
              <div key={post.post_id} className="my-[20px]">
                <PostCard data={post} account={account} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden lg:block p-[20px]">
        <div className="hidden lg:flex justify-end pr-[50px]">
          <img
            onClick={handleDropDownMenu}
            src={account?.picture}
            className="h-[40px] rounded-full w-[40x] cursor-pointer"
            alt=""
          />
        </div>
      </div>
      {isOpen ? <UserDropDownMenu /> : ""}
    </div>
  );
};

export default Home;
