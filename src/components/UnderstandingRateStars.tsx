import React from "react";
import UnderstandingRateStar from "./UnderstandingRateStar";

const UnderstandingRateStars = ({ maxnumber = 5 }) => {
  const [understandingRate, setUnderstandingRate] = React.useState(1);
  return (
    <ul className="flex gap-1">
      {Array.from({ length: maxnumber }, (_, i) => i + 1).map((number) => {
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
