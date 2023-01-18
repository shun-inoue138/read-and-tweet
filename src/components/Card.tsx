import React, { FC, ReactNode } from "react";

const Card: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="p-5 rounded-md shadow-md">{children}</div>;
};

export default Card;
