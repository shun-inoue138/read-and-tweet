import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const UnderstandingRateStar = ({
  isDisplay,
  number,
  setUnderstandingRate,
}: {
  isDisplay: boolean;
  number: number;
  setUnderstandingRate: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
