import "./popover.scss";

import classNames from "classnames";
import * as React from "react";
import { RefObject } from "react";
import EventListener from "react-event-listener";
import Modal from "shared/components/modal/modal";

const MARGIN_OFFSET = 10;

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

const getAnchorEl = (el?: anchorElType) => {
  return typeof el === "function" ? el() : el;
};

export default class Popover extends React.PureComponent<OwnProps, State> {
  state: State = {
    windowWidth: 0,
    windowHeight: 0,
    scrollTop: window.scrollY
  };

  popover: RefObject<HTMLDivElement>;

  constructor(props: OwnProps) {
    super(props);
    this.popover = React.createRef();
  }

  componentDidUpdate() {
    if (this.popover.current) {
      const left = this.getLeft();
      const top = this.getTop();
      const width = this.props.ownWidth ? "auto" : this.getAnchorBounds().width;
      const transform = this.getTransformPosition();
      this.popover.current.style.left = left;
      this.popover.current.style.top = top;
      this.popover.current.style.minWidth = `${width}px`;
      this.popover.current.style.transform = transform;
    }
  }

  static getDerivedStateFromProps() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scrollTop: window.scrollY
    };
  }
  getAnchorBounds = (): ClientRect => {
    const anchorEl = getAnchorEl(this.props.anchorEl);
    const box = anchorEl.getBoundingClientRect();
    return {
      width: box.width,
      height: box.height,
      top: box.top + this.state.scrollTop,
      left: box.left,
      bottom: box.bottom,
      right: box.right
    };
  };

  getPopoverBounds = (): ClientRect => {
    return this.popover.current
      ? this.popover.current.getBoundingClientRect()
      : { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 };
  };

  getTransformPosition = () => {
    const horizontal = this.getHorizontalPosition();
    const vertical = this.getVerticalPosition();
    let translateX = `0`;
    let translateY = `0`;

    if (horizontal === HORIZONTAL_POPOVER_POS.CENTER) {
      translateX = `-50%`;
    }

    if (horizontal === HORIZONTAL_POPOVER_POS.RIGHT) {
      translateX = `-100%`;
    }

    if (vertical === VERTICAL_POPOVER_POS.CENTER) {
      translateY = `-50%`;
    }

    if (vertical === VERTICAL_POPOVER_POS.TOP) {
      translateY = `-100%`;
    }

    return `translate(${translateX}, ${translateY})`;
  };

  getTop = () => {
    const anchorBounds = this.getAnchorBounds();
    const vertical = this.getVerticalPosition();

    if (vertical === VERTICAL_POPOVER_POS.CENTER) {
      return `${anchorBounds.top + anchorBounds.height / 2}px`;
    }

    if (vertical === VERTICAL_POPOVER_POS.TOP) {
      return `${anchorBounds.top - MARGIN_OFFSET}px`;
    }

    return `${anchorBounds.top + anchorBounds.height + MARGIN_OFFSET}px`;
  };

  getLeft = () => {
    const anchorBounds = this.getAnchorBounds();
    const horizontal = this.getHorizontalPosition();

    if (horizontal === HORIZONTAL_POPOVER_POS.RELATIVE) {
      return null;
    }

    if (horizontal === HORIZONTAL_POPOVER_POS.CENTER) {
      return `${anchorBounds.left + anchorBounds.width / 2}px`;
    }

    if (horizontal === HORIZONTAL_POPOVER_POS.RIGHT) {
      return `${anchorBounds.right}px`;
    }

    return `${anchorBounds.left}px`;
  };

  getVerticalPosition = (): VERTICAL_POPOVER_POS => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    if (
      this.state.windowHeight +
        this.state.scrollTop -
        anchorBounds.top -
        anchorBounds.height -
        MARGIN_OFFSET <
        popoverBounds.height &&
      anchorBounds.top + MARGIN_OFFSET > popoverBounds.height
    ) {
      return VERTICAL_POPOVER_POS.TOP;
    }
    return this.props.vertical || VERTICAL_POPOVER_POS.BOTTOM;
  };

  getHorizontalPosition = (): HORIZONTAL_POPOVER_POS => {
    return this.props.horizontal || HORIZONTAL_POPOVER_POS.LEFT;
  };

  handleScroll = () => this.setState({ scrollTop: window.scrollY });

  render() {
    const { anchorEl, noPadding, children, className, ...props } = this.props;
    return (
      <Modal open={Boolean(anchorEl)} transparentBackdrop {...props}>
        <EventListener target={"window"} onScroll={this.handleScroll} />
        <div
          className={classNames("popover", className, {
            "popover--no-padding": noPadding
          })}
          ref={this.popover}
        >
          {children}
        </div>
      </Modal>
    );
  }
}

interface OwnProps {
  onClose?(event: React.MouseEvent<HTMLElement>): void;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
  anchorEl?: anchorElType;
  noPadding?: boolean;
  noAbsolute?: boolean;
  className?: string;
  fixed?: boolean;
  ownWidth?: boolean;
}
interface State {
  windowWidth: number;
  windowHeight: number;
  scrollTop: number;
}

export type anchorElType = EventTarget | Function | HTMLElement;
