import React from "react";
import { Task } from "src/utils/types/Task";
import UnderstandingRateStar from "./UnderstandingRateStar";
import { Default_Max_Number_of_Understanding_Rate as Max_Number } from "src/utils/const";

//setUnderstandingRateがundefinedの場合は理解度を表示するだけ。動的な機能を持たない。
//todo:本当はisOnlyDisplay等のpropsを渡すことで制御したいがTSの型の関係でうまくいかないので、一旦このようにしている。
const UnderstandingRateStars = ({
  understandingRate,
  setUnderstandingRate,
}: {
  understandingRate: Task["understandingRate"];
  setUnderstandingRate?: React.Dispatch<
    React.SetStateAction<Task["understandingRate"]>
  >;
}) => {
  return (
    <ul className="flex gap-1">
      {Array.from({ length: Max_Number }, (_, i) => i + 1).map((number) => {
        if (setUnderstandingRate === undefined) {
          return (
            <li key={number}>
              <UnderstandingRateStar
                number={number}
                isDisplay={number < understandingRate + 1}
              />
            </li>
          );
        }
        return (
          <li key={number}>
            <UnderstandingRateStar
              number={number}
              isDisplay={number < understandingRate + 1}
              setUnderstandingRate={setUnderstandingRate}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default UnderstandingRateStars;
