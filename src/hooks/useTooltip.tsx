import React, { Children, ReactNode, ReactText } from "react";
import { IoReturnUpForwardOutline } from "react-icons/io5";
import { Tooltip } from "react-tippy";

export const useTooltip = ({
  trigger,
}: {
  trigger: "click" | "mouseenter";
}) => {
  const MyTooltip = ({
    children,
    tooltipContent,
  }: {
    children: ReactNode;
    tooltipContent: Exclude<ReactNode, "string"> | string;
  }) => (
    <Tooltip
      title="Welcome to React"
      position="bottom-start"
      trigger={trigger}
      interactive
      interactiveBorder={10}
      arrow
      html={
        typeof tooltipContent === "string" ? (
          <p className="text-white bg-black py-2 px-4">{tooltipContent}</p>
        ) : (
          tooltipContent
        )
      }
    >
      <div>{children}</div>
    </Tooltip>
  );
  return { MyTooltip };
};
