import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { LoginFormInputs } from "../../models/models";
import logIn from "../../service/service";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    logIn(data).then((res) => {
      if (!res.error) {
        localStorage.setItem("token", res);
        navigation("/home");
      } else {
        setErrorMessage(res.error.message);
      }
    });
  };

  return (
    <form
      className=" h-[100vh] flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[400px] p-[20px]">
        <div className="mb-[20px]">
          <label className="block font-bold mb-[5px]">Email</label>
          <input
            className="w-[100%] h-[40px] border p-2 border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0 rounded-md"
            type="email"
            {...register("email")}
          />
        </div>
        <div>
          <label className="block font-bold mb-[5px]">Password</label>
          <input
            className="w-[100%] h-[40px] border p-2 border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0 rounded-md"
            type="password"
            {...register("password")}
          />
        </div>

        {errorMessage && (
          <button
            type="button"
            className="w-full mt-[10px] py-1.5 rounded-lg bg-red-500 tracking-[1px] text-white cursor-pointer hover:opacity-[0.7] transition-all duration-300"
            onClick={() => setErrorMessage("")}
          >
            {errorMessage}
          </button>
        )}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full mt-[20px] py-3 ${
            isValid && isDirty
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400  hover:bg-gray-500"
          } tracking-[1px] rounded-lg bg-black text-white cursor-pointer transition-all duration-300`}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Login;
