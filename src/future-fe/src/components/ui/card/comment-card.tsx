import React from "react";
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import Star from "../../icon/star";
import clsx from "clsx";

const StyledRating = styled(Rating)({
  "& .MuiRating-icon": {
    marginRight: "12px",
  },
});

interface Props {
  comment: IComment;
}

export default function CommentCard({ comment }: Props) {
  return (
    <div>
      <div className="flex gap-x-4">
        <img className="w-12 h-12 rounded-full" src={comment.user.avatar} />
        <div className="flex items-center justify-between flex-1">
          <div className="space-y-2">
            <p className="text-heading-9">{comment.user.name}</p>
            <p className="text-gray-500 text-heading-10">
              {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <StyledRating
            readOnly
            value={comment.rate}
            icon={<Star className="text-yellow" />}
            emptyIcon={<Star className="text-light-gray" />}
          />
        </div>
      </div>
      <p className="mt-2 ml-16 text-body-3">{comment.content}</p>
    </div>
  );
}
