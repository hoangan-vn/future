import React, { useState } from "react";
import { authenticateApi } from "../../../api/authenticate.api";
import { useNavigate } from "react-router-dom";
import Button from "../../form/button/button";
import { toast } from "react-hot-toast";
import Logo_Login from "../../../images/logo_login.jpg";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [inputVerifyCode, setInputVerifyCode] = useState<string>("");
  const navigate = useNavigate();
  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const request = {
        email,
      };
      if (email === "") {
        toast.error("Email is empty");
        return;
      }
      const emailRes = await authenticateApi.sendCode(request);
      console.log(emailRes);
      setIsEmail(true);
      setVerifyCode(emailRes);
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };
  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verifyCode === inputVerifyCode) {
      navigate("/register/info", { state: { email } });
    } else {
      toast.error("Verify code is incorrect!!");
    }
  };
  return (
    <div>
      {!isEmail ? (
        <div className="w-full h-screen flex items-center">
          <div className="relative w-1/2 h-full flex flex-col">
            <img
              src={Logo_Login}
              alt="login-logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
            <h1 className="w-full max-w-[500px] mx-auto text-4xl text-teal-700 font-extrabold">
              Future Shop Decor
            </h1>
            <div className="w-full flex flex-col max-w-[500px]">
              <div className="w-full flex flex-col mb-5">
                <h3 className="text-3xl font-semibold mb-2">
                  Email Verification
                </h3>
                <p className="text-base mb-2">Please enter your email below!</p>
              </div>
              <div className="w-full flex flex-col">
                <form
                  onSubmit={handleSendCode}
                  className="flex flex-col h-[400px]"
                >
                  <label className="text-2xl py-2">Enter your email</label>
                  <input
                    className="w-[25vw] mb-[20px] pt-[15px] pb-[15px] pr-[20px] pl-[20px] border-2 focus:border-black"
                    type="text"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <Button
                    type="submit"
                    title="Send Code"
                    variant="primary"
                    className="w-[250px] pt-[15px] pb-[15px] pr-[25px] pl-[25px] hover:bg-teal-700 active:bg-teal-900"
                  ></Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center">
          <div className="relative w-1/2 h-full flex flex-col">
            <img
              src={Logo_Login}
              alt="login-logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
            <h1 className="w-full max-w-[500px] mx-auto text-4xl text-teal-700 font-extrabold">
              Future Shop Decor
            </h1>
            <div className="w-full flex flex-col max-w-[500px]">
              <div className="w-full flex flex-col mb-5">
                <h3 className="text-3xl font-semibold mb-2">
                  Code Verification
                </h3>
                <p className="text-base mb-2">
                  Please enter your code you have received in your email!
                </p>
              </div>
              <div className="w-full flex flex-col">
                <form
                  onSubmit={handleVerifyCode}
                  className="flex flex-col h-[400px]"
                >
                  <label className="text-2xl py-2">Enter your code</label>
                  <input
                    className="w-[25vw] mb-[20px] pt-[15px] pb-[15px] pr-[20px] pl-[20px] border-2 focus:border-black"
                    type="text"
                    placeholder="Your code"
                    value={inputVerifyCode}
                    onChange={(e) => setInputVerifyCode(e.target.value)}
                  ></input>
                  <Button
                    type="submit"
                    title="Verify"
                    variant="primary"
                    className="w-[250px] pt-[15px] pb-[15px] pr-[25px] pl-[25px] hover:bg-teal-700 active:bg-teal-900"
                  ></Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
