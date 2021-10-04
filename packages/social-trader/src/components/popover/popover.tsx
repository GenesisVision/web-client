import Modal from "components/modal/modal";
import { PopoverElement } from "components/popover/popover-element";
import React, { useCallback, useEffect, useRef, useState } from "react";
import EventListener from "react-event-listener";

export enum VERTICAL_POPOVER_POS {
  TOP = "top",
  BOTTOM = "bottom",
  CENTER = "center"
}
export enum HORIZONTAL_POPOVER_POS {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  RELATIVE = "relative"
}
export enum ORIENTATION_POPOVER {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center"
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onMouseEnter?: VoidFunction;
  fixedHorizontal?: boolean;
  fixedVertical?: boolean;
  orientation?: ORIENTATION_POPOVER;
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
  anchorEl?: anchorElType;
  noPadding?: boolean;
  absolute?: boolean;
  className?: string;
  fixed?: boolean;
  ownWidth?: boolean;
}

export type anchorElType = EventTarget | Function | HTMLElement;

const MARGIN_OFFSET = 10;

const getAnchorEl = (el?: anchorElType) =>
  typeof el === "function" ? el() : el;

const Popover: React.FC<Props> = props => {
  const {
    fixedHorizontal,
    onMouseEnter,
    onMouseLeave,
    fixedVertical,
    orientation = ORIENTATION_POPOVER.LEFT,
    horizontal = HORIZONTAL_POPOVER_POS.LEFT,
    vertical = VERTICAL_POPOVER_POS.BOTTOM,
    anchorEl,
    noPadding,
    className,
    ownWidth,
    children
  } = props;
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const popover = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (popover.current) {
      const width = ownWidth ? "auto" : getAnchorBounds().width;
      popover.current.style.left = getLeft();
      popover.current.style.top = `${getTop() + scrollTop}px`;
      popover.current.style.minWidth = `${width}px`;
      popover.current.style.transform = "none";
      popover.current.style.transform = getTransformPosition();
      popover.current.style.opacity = "1";
    }
  }, [anchorEl, scrollTop, popover.current]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setScrollTop(window.scrollY);
  }, [anchorEl]);

  const getAnchorBounds = (): ClientRect =>
    getAnchorEl(anchorEl).getBoundingClientRect();

  const getPopoverBounds = (): ClientRect =>
    popover.current
      ? popover.current.getBoundingClientRect()
      : { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 };

  const getTransformPosition = () => {
    let translateX = `0`;
    let translateY = `0`;
    let orientationValue = 0;
    switch (getOrientation()) {
      case ORIENTATION_POPOVER.RIGHT:
        orientationValue = 50;
        break;
      case ORIENTATION_POPOVER.CENTER:
        orientationValue = 0;
        break;
    }
    switch (horizontal) {
      case HORIZONTAL_POPOVER_POS.CENTER:
        translateX = `-${50 - orientationValue}%`;
        break;
      case HORIZONTAL_POPOVER_POS.RIGHT:
        translateX = `-${100 - orientationValue}%`;
        break;
    }
    switch (getVerticalPosition()) {
      case VERTICAL_POPOVER_POS.CENTER:
        translateY = `-50%`;
        break;
      case VERTICAL_POPOVER_POS.TOP:
        translateY = `-100%`;
        break;
    }
    return `translate(${translateX}, ${translateY})`;
  };

  const getTop = () => {
    const { top, height } = getAnchorBounds();
    switch (getVerticalPosition()) {
      case VERTICAL_POPOVER_POS.CENTER:
        return top + height / 2;
      case VERTICAL_POPOVER_POS.TOP:
        return top - MARGIN_OFFSET;
      default:
        return top + height + MARGIN_OFFSET;
    }
  };

  const getLeft = (): string => {
    const { left, width, right } = getAnchorBounds();
    switch (horizontal) {
      case HORIZONTAL_POPOVER_POS.RELATIVE:
        return "0px";
      case HORIZONTAL_POPOVER_POS.CENTER:
        return `${left + width / 2}px`;
      case HORIZONTAL_POPOVER_POS.RIGHT:
        return `${right}px`;
      case HORIZONTAL_POPOVER_POS.LEFT:
      default:
        return `${left}px`;
    }
  };

  const getVerticalPosition = (): VERTICAL_POPOVER_POS => {
    if (fixedVertical) return vertical;
    const anchorBounds = getAnchorBounds();
    const popoverBounds = getPopoverBounds();
    // const topAboveWindowBound = popoverBounds.top - MARGIN_OFFSET < 0;
    const bottomBelowWindowBound =
      windowHeight - anchorBounds.bottom - MARGIN_OFFSET < popoverBounds.height;
    if (bottomBelowWindowBound) return VERTICAL_POPOVER_POS.TOP;
    // if (topAboveWindowBound) return VERTICAL_POPOVER_POS.BOTTOM; // TODO fix it
    return vertical;
  };

  const getOrientation = (): ORIENTATION_POPOVER => {
    const popoverBounds = getPopoverBounds();
    let transform = 0;
    switch (horizontal) {
      case HORIZONTAL_POPOVER_POS.CENTER:
        transform = 0.5;
        break;
      case HORIZONTAL_POPOVER_POS.RIGHT:
        transform = 1;
        break;
    }
    if (
      !fixedHorizontal &&
      popoverBounds.left - popoverBounds.width * transform < 0
    ) {
      return ORIENTATION_POPOVER.RIGHT;
    }
    return orientation;
  };

  const handleScroll = useCallback(() => setScrollTop(window.scrollY), []);
  return (
    <Modal open={Boolean(anchorEl)} transparentBackdrop {...props}>
      <EventListener target={"window"} onScroll={handleScroll} />
      <PopoverElement
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={className}
        ref={popover}
      >
        {children}
      </PopoverElement>
    </Modal>
  );
};

export default Popover;
