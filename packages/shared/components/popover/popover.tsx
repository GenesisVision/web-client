import "./popover.scss";

import classNames from "classnames";
import * as React from "react";
import { RefObject } from "react";
import { connect } from "react-redux";
import Modal from "shared/components/modal/modal";
import RootState from "shared/reducers/root-reducer";
import { Nullable } from "shared/utils/types";

export enum VERTICAL_POPOVER_POS {
  TOP = "top",
  BOTTOM = "bottom",
  CENTER = "center"
}

export enum HORIZONTAL_POPOVER_POS {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center"
}

export type anchorElType = { [keys: string]: any } | Function;

interface IPopoverProps {
  onClose?(event: React.MouseEvent<HTMLElement>): void;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
  anchorEl: Nullable<anchorElType>;
  noPadding?: boolean;
  disableBackdropClick?: boolean;
  className?: string;
  scrollTop?: number;
}
interface IPopoverState {
  windowWidth: number;
  windowHeight: number;
}

const MARGIN_OFFSET = 10;

const getAnchorEl = (el: Nullable<anchorElType>) => {
  return typeof el === "function" ? el() : el;
};

class Popover extends React.Component<IPopoverProps, IPopoverState> {
  popover: RefObject<HTMLDivElement>;
  constructor(props: IPopoverProps) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    };
    this.popover = React.createRef();
  }

  componentDidUpdate() {
    if (this.popover.current) {
      const left = this.getLeft();
      const top = this.getTop();
      const width = this.getAnchorBounds().width;
      this.popover.current.style.left = left;
      this.popover.current.style.top = top;
      this.popover.current.style.minWidth = `${width}px`;
    }
  }

  static getDerivedStateFromProps() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  }
  getAnchorBounds = (): ClientRect => {
    const anchorEl = getAnchorEl(this.props.anchorEl);
    const box = anchorEl.getBoundingClientRect();
    return {
      width: box.width,
      height: box.height,
      top: box.top + this.props.scrollTop,
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

  getTop = () => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    const vertical = this.getVerticalPosition();

    if (vertical === VERTICAL_POPOVER_POS.CENTER) {
      const aCenter = anchorBounds.top + anchorBounds.height / 2;
      const popoverOffset = popoverBounds.height / 2;
      return `${aCenter - popoverOffset}px`;
    }

    if (vertical === VERTICAL_POPOVER_POS.TOP) {
      return `${anchorBounds.top - popoverBounds.height - MARGIN_OFFSET}px`;
    }

    return `${anchorBounds.top + anchorBounds.height + MARGIN_OFFSET}px`;
  };

  getLeft = () => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    const horizontal = this.getHorizontalPosition();

    if (horizontal === HORIZONTAL_POPOVER_POS.CENTER) {
      const aCenter = anchorBounds.left + anchorBounds.width / 2;
      const popoverOffset = popoverBounds.width / 2;
      return `${aCenter - popoverOffset}px`;
    }
    if (horizontal === HORIZONTAL_POPOVER_POS.RIGHT) {
      const left = Math.max(
        MARGIN_OFFSET,
        anchorBounds.left + anchorBounds.width - popoverBounds.width
      );
      return `${left}px`;
    }

    return `${anchorBounds.left}px`;
  };

  getVerticalPosition = (): VERTICAL_POPOVER_POS => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    if (
      this.state.windowHeight +
        this.props.scrollTop -
        anchorBounds.top -
        anchorBounds.height -
        MARGIN_OFFSET <
        popoverBounds.height &&
      anchorBounds.top + MARGIN_OFFSET > popoverBounds.height
    ) {
      return VERTICAL_POPOVER_POS.TOP;
    }
    return this.props.vertical;
  };

  getHorizontalPosition = (): HORIZONTAL_POPOVER_POS => {
    return this.props.horizontal || HORIZONTAL_POPOVER_POS.LEFT;
  };

  render() {
    const { anchorEl, noPadding, children, className, ...props } = this.props;
    return (
      <Modal open={Boolean(anchorEl)} transparentBackdrop {...props}>
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

const mapStateToProps = (state: RootState) => ({
  scrollTop: state.ui.scrollTop
});

export default connect(mapStateToProps)(Popover);
