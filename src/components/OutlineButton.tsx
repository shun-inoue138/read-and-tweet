import React, { ComponentProps, ComponentPropsWithoutRef, FC } from "react";
import { clsx } from "clsx";

type ButtonColor = "red" | "blue" | "green" | "skeleton";

const getBgColor = (buttonColor: ButtonColor) => {
  switch (buttonColor) {
    case "red":
      return "bg-red-500";
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    case "skeleton":
      return "bg-gray-300";
  }
};
const getBorderAndTextColor = (buttonColor: ButtonColor) => {
  switch (buttonColor) {
    case "red":
      return "border border-red-500 text-red-500";
    case "blue":
      return "border border-blue-500 text-blue-500";
    case "green":
      return "border border-green-500 text-green-500";
    case "skeleton":
      return "border border-gray-300 text-gray-300";
  }
};

const OutlineButton: FC<
  ComponentPropsWithoutRef<"button"> & { buttonColor: ButtonColor }
> = ({ className, children, buttonColor, ...props }) => {
  const borderColorAndTextColor = getBorderAndTextColor(buttonColor);
  return (
    <button
      {...props}
      className={clsx(
        borderColorAndTextColor,
        " text-white px-4 py-2 rounded-lg shadow-md hover:brightness-90 hover:contrast-125 transition duration-300",
        className
      )}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
