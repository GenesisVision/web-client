import React, { ComponentType, HTMLProps, RefObject, useRef } from "react";

import { createUseObserverVisible } from "./create-observer-visible";

type Props = {
  children: React.ReactNode;
  useObserver?: (containerRef: RefObject<HTMLElement>) => boolean;
  wrapper?: ComponentType | string;
  wrapperProps?: HTMLProps<HTMLElement>;
};

const wrapperStyles = { display: "contents" };
const EMPTY_HTML = { __html: "" };
const useObserverVisible = createUseObserverVisible();

const LazyHydrate: React.FC<Props> = ({
  children,
  useObserver = useObserverVisible,
  wrapper = "div",
  wrapperProps = {}
}) => {
  const containerRef = useRef(null);
  const isVisible = useObserver(containerRef);

  return isVisible
    ? React.createElement(
        wrapper,
        { ref: containerRef, style: wrapperStyles, ...wrapperProps },
        children
      )
    : React.createElement(wrapper, {
        ref: containerRef,
        style: wrapperStyles,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: EMPTY_HTML,
        ...wrapperProps
      });
};

export default LazyHydrate;
