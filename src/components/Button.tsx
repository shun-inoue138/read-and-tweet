import React, { ComponentProps, ComponentPropsWithoutRef, FC } from "react";
import { clsx } from "clsx";

type ButtonColor = "red" | "blue" | "green";

const getColor = (buttonColor: ButtonColor) => {
  switch (buttonColor) {
    case "red":
      return "bg-red-500";
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
  }
};

const Button: FC<
  ComponentPropsWithoutRef<"button"> & { buttonColor: ButtonColor }
> = ({ className, children, buttonColor, ...props }) => {
  const backgroundColor = getColor(buttonColor);
  return (
    <button
      {...props}
      className={clsx(
        backgroundColor,
        " text-white px-4 py-2 rounded-lg shadow-md hover:brightness-90 hover:contrast-125 transition duration-300",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
