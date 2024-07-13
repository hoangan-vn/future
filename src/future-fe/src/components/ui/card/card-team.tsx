import React from "react";
import CircleBtn from "../../form/button-circle/social-btn";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../../icon";

interface Props {
  name: string;
  position: string;
  avatar: string;
}

export default function CardTeam({ name, position, avatar }: Props) {
  return (
    <div className="select-none">
      <div className="group">
        <img
          className="h-[450px] relative w-full object-cover object-top"
          alt="image"
          src={avatar}
        />
        <div className="absolute w-full h-64 transition-all duration-300 ease-in -translate-y-full opacity-0 bg-gradient-to-t group-hover:opacity-100 from-white/90"></div>
        <div className="absolute bottom-0 flex justify-center w-full overflow-hidden -translate-y-full pb-9 gap-x-6">
          <CircleBtn
            type="white"
            className="translate-y-[200%] group/facebook group-hover:translate-y-0 transition-all duration-300 hover:bg-dark-slate-gray "
          >
            <FacebookIcon className="text-black transition-colors duration-300 group-hover/facebook:text-wheat" />
          </CircleBtn>
          <CircleBtn
            type="white"
            className="translate-y-[200%] group/twitter group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-dark-slate-gray"
          >
            <TwitterIcon className="text-black transition-colors duration-300 group-hover/twitter:text-wheat" />
          </CircleBtn>
          <CircleBtn
            type="white"
            className="translate-y-[200%] group-hover:translate-y-0 transition-all duration-300 delay-150 group/instagram hover:bg-dark-slate-gray"
          >
            <InstagramIcon className="text-black transition-colors duration-300 group-hover/instagram:text-wheat" />
          </CircleBtn>
        </div>
      </div>
      <h2 className="mt-8 font-bold text-center text-heading-6">{name}</h2>
      <p className="mt-3 font-normal text-center capitalize text-heading-9 text-philippine-gray">
        {position}
      </p>
    </div>
  );
}
