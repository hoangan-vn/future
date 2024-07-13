import React, { useEffect, useRef, useState } from "react";
import { userApi } from "../api/user.api";
import Input from "../components/form/input/input";
import Button from "../components/form/button/button";
import moment from "moment";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface FormValue {
  name: string;
  email: string;
  birthday: string;
}
export default function AccountSettingPage() {
  const [userInfo, setUserInfo] = useState<UpdateUser>();
  const [userAvatar, setUserAvatar] = useState<string>(
    "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
  );
  const [file, setFile] = useState<File>();
  const [isChange, setIsChange] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      name: "",
      email: "",
      birthday: "",
    },
  });

  const avatarRef = useRef<HTMLInputElement>(null);
  const handleGetUserInfo = async () => {
    const data = await userApi.getUserInfo();
    setUserInfo(data);
    setUserAvatar(data.avatar);
  };

  const handleChange = () => {
    setIsChange(true);
  };

  const handleChangeAvatar = () => {
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  };

  const handleAvatarInput = () => {
    const file = avatarRef.current?.files?.[0];
    if (file) {
      setUserAvatar(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const onSubmit = async (value: FormValue) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("avatar", file);
      }
      if (value.name) {
        formData.append("name", value.name);
      }
      if (value.email) {
        formData.append("email", value.email);
      }
      if (value.birthday) {
        formData.append("birthday", value.birthday);
      }
      const res = await userApi.updateUserInfo(formData);
      setUserInfo(res);
      setUserAvatar(res.avatar);
      setIsChange(false);
      toast.success("Cập nhập thông tin thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhập thông tin thất bại");
    }
  };
  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-heading-7">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-[100px] h-[100px] flex rounded-full overflow-hidden my-[30px]">
          <img
            src={userAvatar}
            alt="avatar"
            className="inline-block object-cover w-[100px] h-[100px]"
          />
        </div>
        {isChange ? (
          <form className="flex justify-end w-[300px]">
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              ref={avatarRef}
              style={{ display: "none" }}
              onChange={handleAvatarInput}
            />
            <Button
              title="Chọn ảnh"
              variant="secondary"
              className="px-2 py-3 text-heading-10"
              onClick={handleChangeAvatar}
            />
          </form>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>

      <form
        className="space-y-[30px] bg-scarlet px-7 py-[34px] h-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex">
          <div className="flex flex-col justify-between mr-4">
            <div className="flex items-center mb-4">
              <h3 className="w-[100px] leading-[35px] font-bold mr-[50px]">
                Tên
              </h3>
              <div className="flex items-center">
                {isChange ? (
                  <Input
                    variation="outlined"
                    placeholder={userInfo ? userInfo.name : "Name"}
                    className="w-[300px] h-[35px]"
                    register={register}
                    name="name"
                  />
                ) : (
                  <p className="text-philippine-gray">
                    {userInfo ? userInfo.name : "Name"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center mb-4">
              <h3 className="w-[100px] leading-[35px] font-bold mr-[50px]">
                Email
              </h3>
              <div className="flex items-center">
                {isChange ? (
                  <Input
                    variation="outlined"
                    placeholder={userInfo ? userInfo.email : "Email"}
                    className="w-[300px] h-[35px]"
                    register={register}
                    name="email"
                  />
                ) : (
                  <p className="text-philippine-gray">
                    {userInfo ? userInfo.email : "Email"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center mb-4">
              <h3 className="w-[100px] leading-[35px] font-bold mr-[50px]">
                Ngày sinh
              </h3>
              <div className="flex items-center">
                {isChange ? (
                  <input
                    type="date"
                    placeholder={"01-01-2023"}
                    className={`w-[300px] h-[35px] px-5 py-[22px] text-body-1 leading-5 outline-none 
                    border-[1px] border-light-gray bg-transparent text-philippine-gray`}
                    {...register("birthday")}
                  />
                ) : (
                  <p className="text-philippine-gray">
                    {moment(userInfo ? userInfo.birthday : "2023/01/01").format(
                      "L"
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-start justify-end">
            {isChange ? (
              <React.Fragment></React.Fragment>
            ) : (
              <Button
                title="Cập nhập thông tin"
                variant="secondary"
                className="px-2 py-3 text-heading-10"
                onClick={handleChange}
              />
            )}
          </div>
        </div>
        {isChange ? (
          <div className="flex justify-end">
            <Button
              title="Xác nhận"
              variant="primary"
              className="py-3 font-medium text-white px-14"
              // onClick={handleConfirm}
              type="submit"
            />
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </form>
    </div>
  );
}
