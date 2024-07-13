import React, { useRef, useState } from "react";
import Button from "../../form/button/button";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateApi } from "../../../api/authenticate.api";
import { toast } from "react-hot-toast";
import Logo_Login from "../../../images/logo_login.jpg";

export default function RegisterInfo() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const confirmPassword = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();
  const handleSubmitUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userInfo = {
        name,
        email,
        username,
        password,
        avatar,
      };
      if (name === "" || username === "" || password === "") {
        toast.error("Field is empty!");
        return;
      } else if (password !== confirmPassword.current?.value) {
        toast.error("It is not incorrect with password");
        return;
      }
      const userInfoRes: {
        _id: string;
        name: string;
      } = await authenticateApi.register(userInfo);
      console.log(userInfoRes);
      toast.success(`You ${userInfoRes.name} register success!`);
      if (userInfoRes) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="relative w-1/2 h-full flex flex-col">
        <img
          src={Logo_Login}
          alt="login-logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-10 justify-between items-center">
        <h1 className="w-full max-w-[500px] mx-auto text-4xl text-teal-700 font-extrabold">
          Form Register
        </h1>
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col">
            <form
              title="Form Register"
              onSubmit={handleSubmitUserInfo}
              className="flex flex-col h-auto py-3"
            >
              <div className="flex items-center py-3">
                <label className="text-xl w-[200px]">
                  Your name: &nbsp;<span className="text-red-600">(*)</span>
                </label>
                <input
                  className=" px-5 py-[22px] min-w-[300px] leading-5 outline-none border-[1px] focus:border-black"
                  type="text"
                  placeholder="Your name here..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center py-3">
                <label className="text-xl w-[200px]">
                  Email: <span className="text-red-600">(*)</span>
                </label>
                <input
                  disabled
                  className="px-5 py-[22px] min-w-[300px] leading-5 outline-none border-[1px] focus:border-black"
                  type="text"
                  placeholder="Email here..."
                  value={email}
                />
              </div>
              <div className="flex items-center py-3">
                <label className="text-xl w-[200px]">
                  Username: <span className="text-red-600">(*)</span>
                </label>
                <input
                  className="px-5 py-[22px] leading-5 min-w-[300px] outline-none border-[1px] focus:border-black"
                  type="text"
                  placeholder="Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center py-3">
                <label className="text-xl w-[200px]">
                  Password: <span className="text-red-600">(*)</span>
                </label>
                <input
                  className="px-5 py-[22px] leading-5 min-w-[300px] outline-none border-[1px] focus:border-black"
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center py-3">
                <label className="text-xl w-[200px]">
                  Confirm password: <span className="text-red-600">(*)</span>
                </label>
                <input
                  className="px-5 py-[22px] leading-5 min-w-[300px] outline-none border-[1px] focus:border-black"
                  type="password"
                  placeholder="Confirm password..."
                  ref={confirmPassword}
                />
              </div>
              <div className="flex items-center py-3">
                <label className="text-xl w-[200px]">Avatar: &nbsp;</label>
                <input
                  className="px-5 py-[22px] leading-5 min-w-[300px] outline-none border-[1px] focus:border-black"
                  type="text"
                  placeholder="Avatar..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  title="Register"
                  variant="primary"
                  className="w-[250px] pt-[15px] pb-[15px] pr-[25px] pl-[25px] hover:bg-teal-700 active:bg-teal-900"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
