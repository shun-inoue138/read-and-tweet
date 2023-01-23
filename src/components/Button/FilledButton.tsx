import React, { ComponentPropsWithoutRef, FC } from "react";
import ButtonBase, { ButtonColor } from "./ButtonBase";

const FilledButton: FC<
  ComponentPropsWithoutRef<"button"> & { buttonColor: ButtonColor }
> = ({ children, buttonColor, ...props }) => {
  const specificClass = "text-white  rounded-lg shadow-md";

  return (
    <ButtonBase
      {...props}
      buttonCategory={{ color: buttonColor, type: "filled" }}
      specificClass={specificClass}
    >
      {children}
    </ButtonBase>
  );
};

export default FilledButton;
