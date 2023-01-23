import React, { ComponentProps, ComponentPropsWithoutRef, FC } from "react";
import { clsx } from "clsx";

export type ButtonColor = "red" | "blue" | "green" | "skeleton";
export type ButtonType = "outlined" | "filled" | "underlined";

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
const getBorderBottomAndTextColor = (buttonColor: ButtonColor) => {
  switch (buttonColor) {
    case "red":
      return "border-b border-red-500 text-red-500";
    case "blue":
      return "border-b border-blue-500 text-blue-500";
    case "green":
      return "border-b border-green-500 text-green-500";
    case "skeleton":
      return "border-b border-gray-300 text-gray-300";
  }
};

const ButtonBase: FC<
  ComponentPropsWithoutRef<"button"> & {
    buttonCategory: { color: ButtonColor; type: ButtonType };
  } & {
    specificClass: string;
  }
> = ({
  className,
  children,
  specificClass,
  buttonCategory: { color, type },
  ...props
}) => {
  const colorClass =
    type === "filled"
      ? getBgColor(color)
      : type === "outlined"
      ? getBorderAndTextColor(color)
      : type === "underlined"
      ? getBorderBottomAndTextColor(color)
      : "";
  const commonClass =
    "px-4 py-2 hover:brightness-90 hover:contrast-125 transition duration-300";

  return (
    <button
      {...props}
      className={clsx(colorClass, commonClass, specificClass, className)}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
