import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { Task } from "src/utils/types/Task";

const UnderstandingRateStar = ({
  isDisplay,
  number,
  setUnderstandingRate,
}: {
  isDisplay: boolean;
  number: Task["understandingRate"];
  setUnderstandingRate?: React.Dispatch<
    React.SetStateAction<Task["understandingRate"]>
  >;
}) => {
  if (setUnderstandingRate === undefined) {
    return (
      <div className="text-yellow-400 text-3xl">
        {isDisplay ? <AiFillStar /> : <AiOutlineStar />}
      </div>
    );
  }
  return (
    <button
      onClick={() => {
        setUnderstandingRate(number);
      }}
      className="text-yellow-400 text-3xl"
    >
      {isDisplay ? <AiFillStar /> : <AiOutlineStar />}
    </button>
  );
};

export default UnderstandingRateStar;
