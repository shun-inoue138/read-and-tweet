import React, { ComponentPropsWithoutRef, FC } from "react";
import ButtonBase, { ButtonColor } from "./ButtonBase";

const OutlinedButton: FC<
  ComponentPropsWithoutRef<"button"> & { buttonColor: ButtonColor }
> = ({ children, buttonColor, ...props }) => {
  const specificClass = "rounded-lg shadow-md";

  return (
    <ButtonBase
      {...props}
      buttonCategory={{ color: buttonColor, type: "outlined" }}
      specificClass={specificClass}
    >
      {children}
    </ButtonBase>
  );
};

export default OutlinedButton;
