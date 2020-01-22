import React, { useRef } from "react";
import { animated, useTransition } from "react-spring";
import { getElementHeight } from "routes/ssr/landing-page/utils";

const visibleStyle = { height: "auto", opacity: 1, overflow: "visible" };
const hiddenStyle = { opacity: 0, height: 0, overflow: "hidden" };

export type TAccordionContent = {
  text?: string | JSX.Element;
  list?: Array<{
    text: string | JSX.Element;
  }>;
};

interface Props {
  forceSlideIn?: boolean;
  isVisible: boolean;
  contents: TAccordionContent[];
}

const _AccordionContent: React.FC<Props> = ({
  isVisible,
  contents,
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
  return transitions.map(({ item, props, key }) => {
    return item ? (
      <animated.div ref={containerRef} key={key} style={props}>
        <div ref={innerRef} className="accordion__content">
          {contents.map((content, index) => (
            <div key={index}>
              {content.text && <p>{content.text}</p>}
              {content.list && (
                <ul>
                  {content.list.map((item, index) => (
                    <li key={index}>{item.text}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </animated.div>
    ) : null;
  });
};

_AccordionContent.defaultProps = {
  forceSlideIn: false
};

const AccordionContent = React.memo(_AccordionContent);
export default AccordionContent;
