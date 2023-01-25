import React, { useLayoutEffect } from "react";

export const useAccordion = () => {
  const [isOpenAccordion, setIsOpenAccordion] = React.useState(false);
  const EL = React.useRef<HTMLDivElement>(null);
  const [AccordionStyle, setAccordionStyle] = React.useState({
    height: `${EL.current?.clientHeight}px`,
  });
  useLayoutEffect(() => {
    setAccordionStyle({
      height: isOpenAccordion ? "auto" : `${EL.current?.clientHeight}px`,
    });
  }, [isOpenAccordion]);
  const toggleAccordion = () => {
    setIsOpenAccordion(!isOpenAccordion);
  };

  return { toggleAccordion, EL, AccordionStyle, isOpenAccordion };
};
