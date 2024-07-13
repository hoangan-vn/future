import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { selectCategories } from "../../../redux/reducers/category-slice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import CategoryCard from "../category/category-card";
import clsx from "clsx";
import CommentCard from "../card/comment-card";
import { ChervonLeft, ChervonRight } from "../../icon";

interface Props {
  decription: string;
  comments: IComment[];
}
const DescriptionReview = ({ decription, comments }: Props) => {
  const categories = useAppSelector(selectCategories);
  const [tab, setTab] = useState<"description" | "comment">("description");
  const [commentPage, setCommentPage] = useState<number>(1);

  const handleTabClick = (tab: "description" | "comment") => () => {
    setTab(tab);
    setCommentPage(1);
  };

  const handlePageComment = (action: "next" | "previous") => () => {
    console.log("vo");
    if (action === "next") {
      setCommentPage(commentPage + 1);
    } else {
      setCommentPage(commentPage - 1);
    }
  };

  return (
    <div className="mt-[90px] flex px-[76px] py-5">
      <div className="flex-1 mr-6">
        <div className="relative">
          <ul className="flex gap-x-12">
            <li
              onClick={handleTabClick("description")}
              className={clsx(
                "font-bold tab cursor-pointer transition-all duration-300",
                tab === "description" ? "text-teal-800" : "text-black"
              )}
            >
              <p className="relative z-10 leading-6 text-heading-6 font-heading text-end">
                Mô tả
              </p>
              {tab === "description" && (
                <p className="relative bottom-0 z-0 -translate-y-[130%] h-[6px] bg-wheat"></p>
              )}
            </li>
            <li
              onClick={handleTabClick("comment")}
              className={clsx(
                "font-bold tab cursor-pointer transition-all duration-300",
                tab === "comment" ? "text-teal-800" : "text-black"
              )}
            >
              <p className="relative z-10 leading-6 text-heading-6 font-heading text-end">
                Đánh giá
              </p>
              {tab === "comment" && (
                <p className="relative bottom-0 z-0 -translate-y-[130%] h-[6px] bg-wheat"></p>
              )}
            </li>
          </ul>
        </div>

        {tab === "description" && (
          <div className="mt-6">
            <p className="text-justify whitespace-pre-wrap">{decription}</p>
          </div>
        )}

        {tab === "comment" && (
          <>
            {comments.length > 0 ? (
              <div className="mt-6 space-y-8">
                {comments
                  .slice((commentPage - 1) * 4, commentPage * 4)
                  .map((item) => (
                    <CommentCard comment={item} key={item._id} />
                  ))}

                <div className="flex justify-center gap-x-1">
                  <button
                    disabled={commentPage === 1}
                    onClick={handlePageComment("previous")}
                    className="disabled:cursor-not-allowed"
                  >
                    <ChervonLeft />
                  </button>
                  <p>{commentPage}</p>/
                  <p>
                    {comments.length % 4 > 0
                      ? Math.floor(comments.length / 4 + 1)
                      : Math.floor(comments.length / 4)}
                  </p>
                  <button
                    disabled={commentPage * 4 >= comments.length}
                    onClick={handlePageComment("next")}
                    className="disabled:cursor-not-allowed"
                  >
                    <ChervonRight />
                  </button>
                </div>
              </div>
            ) : (
              <p>Sản phẩm hiện chưa có đánh giá</p>
            )}
          </>
        )}
      </div>

      <Swiper
        className="flex-1 h-fit"
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
      >
        {categories.length > 0 &&
          categories.map((item) => (
            <SwiperSlide key={item._id}>
              <CategoryCard
                _id={item._id}
                image={item.image}
                title={item.name}
                subTitle={"Sản phẩm đa dạng, phù hợp với nhu cầu của bạn"}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default DescriptionReview;
