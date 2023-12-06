import React, { RefObject, useEffect, useRef, useState } from "react";

const Tooltip = ({
  content,
  children,
  onHover,
}: {
  content: JSX.Element;
  children: JSX.Element;
  onHover?: () => void;
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [translation, setTranslation] = useState<[number, number]>([0, 0]);
  const tooltipReference = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (tooltipReference?.current) {
      setTranslation(getCalculatedTranslation(tooltipReference));
    }
  }, [tooltipReference.current?.clientHeight, isTooltipVisible]);

  const getCalculatedTranslation = (
    tooltipReference: RefObject<HTMLDetailsElement>
  ): [number, number] => {
    if (tooltipReference?.current) {
      let [translateX, translateY] = [0, 0];
      if (
        tooltipReference.current.getBoundingClientRect().right +
          Math.abs(translation[0]) >
        window.innerWidth
      ) {
        translateX = -tooltipReference.current.clientWidth;
      }
      translateY = -(tooltipReference?.current?.clientHeight + 5);
      return [translateX, translateY];
    }
    return translation;
  };

  useEffect(() => {
    if (tooltipReference.current) {
      tooltipReference.current.style.transform = `translate(${translation[0]}px, ${translation[1]}px)`;
    }
  }, [translation]);

  useEffect(() => {
    if (!tooltipReference.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setTranslation(getCalculatedTranslation(tooltipReference));
    });
    resizeObserver.observe(tooltipReference.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [tooltipReference.current]);

  return (
    <div
      onMouseEnter={() => {
        setIsTooltipVisible(true);
        onHover && onHover();
      }}
      onMouseLeave={() => {
        setIsTooltipVisible(false);
      }}
    >
      {isTooltipVisible && (
        <span
          ref={tooltipReference}
          className="absolute bg-white m-4 p-3 rounded-xl shadow-lg z-10 w-[320px] h-[200px] overflow-y-scroll"
        >
          {content}
        </span>
      )}
      <span className="hover:cursor-pointer">{children}</span>
    </div>
  );
};

export default Tooltip;
