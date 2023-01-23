import React, { ComponentPropsWithoutRef, FC } from "react";
import ButtonBase, { ButtonColor } from "./ButtonBase";

const UnderlinedButton: FC<
  ComponentPropsWithoutRef<"button"> & { buttonColor: ButtonColor }
> = ({ children, buttonColor, ...props }) => {
  const specificClass = "";

  return (
    <ButtonBase
      {...props}
      buttonCategory={{ color: buttonColor, type: "underlined" }}
      specificClass={specificClass}
    >
      {children}
    </ButtonBase>
  );
};

export default UnderlinedButton;
