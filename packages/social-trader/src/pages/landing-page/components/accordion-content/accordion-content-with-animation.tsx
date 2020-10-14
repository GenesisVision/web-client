import AccordionContent from "pages/landing-page/components/accordion-content/accordion-content";
import { getElementHeight } from "pages/landing-page/utils";
import React, { useRef } from "react";
import { animated, useTransition } from "react-spring";

const visibleStyle = { height: "auto", opacity: 1, overflow: "visible" };
const hiddenStyle = { opacity: 0, height: 0, overflow: "hidden" };

interface Props {
  forceSlideIn?: boolean;
  isVisible: boolean;
}

const AccordionContentWithAnimation: React.FC<Props> = ({
  isVisible,
  children,
  forceSlideIn
}) => {
  const isVisibleOnMount = useRef(isVisible && !forceSlideIn);
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  //@ts-ignore
  const transitions = useTransition(isVisible, null, {
    enter: () => async (next: any, cancel: any) => {
      const height = getElementHeight(innerRef);

      cancel();

      await next({ height, opacity: 1, overflow: "hidden" });
      await next(visibleStyle);
    },
    leave: () => async (next: any, cancel: any) => {
      const height = getElementHeight(containerRef);

      cancel();

      await next({ height, overflow: "hidden" });
      await next(hiddenStyle);

      isVisibleOnMount.current = false;
    },
    from: isVisibleOnMount.current ? visibleStyle : hiddenStyle,
    unique: true
  });

  //@ts-ignore
  return (
    <>
      {transitions.map(({ item, props, key }) => {
        return item ? (
          <animated.div ref={containerRef} key={key} style={props}>
            <AccordionContent isVisible refProp={innerRef}>
              {children}
            </AccordionContent>
          </animated.div>
        ) : null;
      })}
    </>
  );
};

export default AccordionContentWithAnimation;
