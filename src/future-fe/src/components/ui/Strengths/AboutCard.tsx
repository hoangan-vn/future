import React from "react";
import CircleBtn from "../../form/button-circle/social-btn";
import { RocketIcon, LockIcon, ReloadIcon, PhoneIcon } from "../../icon";

interface Props {
  children?: React.ReactNode;
  title: string;
  icon: "rocket" | "lock" | "reload" | "phone";
  className?: string;
}

function AboutCard({ children, title, icon, className }: Props) {
  const returnIcon = () => {
    switch (icon) {
      case "rocket":
        return <RocketIcon />;
      case "lock":
        return <LockIcon />;
      case "reload":
        return <ReloadIcon />;
      case "phone":
        return <PhoneIcon />;
    }
  };

  return (
    <div className={`${className}`}>
      <CircleBtn type="gray" className="p-[15px] w-[60px] h-[60px]">
        {returnIcon()}
      </CircleBtn>
      <h2 className="mt-10 mb-[15px] font-bold text-heading-7">{title}</h2>
      <span className="text-body-3 leading-[25px] text-philippine-gray">
        {children}
      </span>
    </div>
  );
}

export default AboutCard;
