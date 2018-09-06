import "./popover.scss";

import classnames from "classnames";
import Modal from "components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EventListener from "react-event-listener";

const MARGIN_OFFSET = 10;

const VERTICAL_TOP_POSITION = "top";
const VERTICAL_BOTTOM_POSITION = "bottom";
const VERTICAL_CENTER_POSITION = "center";

const HORIZONTAL_LEFT_POSITION = "left";
const HORIZONTAL_RIGHT_POSITION = "right";
const HORIZONTAL_CENTER_POSITION = "center";

const getAnchorEl = el => {
  return typeof el === "function" ? el() : el;
};

class Popover extends Component {
  state = {
    windowWidth: undefined,
    windowHeight: undefined
  };

  static getDerivedStateFromProps() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  }

  constructor(props) {
    super(props);
    this.popover = React.createRef();
  }

  getAnchorBounds = () => {
    const anchorEl = getAnchorEl(this.props.anchorEl);
    return anchorEl.getBoundingClientRect();
  };

  getPopoverBounds = () => {
    return this.popover.current
      ? this.popover.current.getBoundingClientRect()
      : {};
  };

  getTop = () => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    const vertical = this.getVerticalPosition();

    if (vertical === VERTICAL_TOP_POSITION) {
      const top = Math.min(
        anchorBounds.top - popoverBounds.height - MARGIN_OFFSET,
        this.state.windowHeight - popoverBounds.height - MARGIN_OFFSET
      );
      return `${top}px`;
    }

    if (vertical === VERTICAL_CENTER_POSITION) {
      const aCenter = anchorBounds.top + anchorBounds.height / 2;
      const popoverOffset = popoverBounds.height / 2;
      return `${aCenter - popoverOffset}px`;
    }

    return `${anchorBounds.bottom + MARGIN_OFFSET}px`;
  };

  getLeft = () => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    const horizontal = this.getHorizontalPosition();

    if (horizontal === HORIZONTAL_CENTER_POSITION) {
      const aCenter = anchorBounds.left + anchorBounds.width / 2;
      const popoverOffset = popoverBounds.width / 2;
      return `${aCenter - popoverOffset}px`;
    }
    if (horizontal === HORIZONTAL_RIGHT_POSITION) {
      const left = Math.max(
        MARGIN_OFFSET,
        anchorBounds.right - popoverBounds.width
      );
      return `${left}px`;
    }

    const left = Math.min(
      anchorBounds.left,
      this.state.windowWidth - popoverBounds.width - MARGIN_OFFSET
    );

    return `${left}px`;
  };

  handleWindowResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  getVerticalPosition = () => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    if (
      this.state.windowHeight - anchorBounds.bottom - MARGIN_OFFSET <
        popoverBounds.height &&
      anchorBounds.top + MARGIN_OFFSET > popoverBounds.height
    ) {
      return VERTICAL_TOP_POSITION;
    }
    return this.props.vertical;
  };

  getHorizontalPosition = () => {
    return this.props.horizontal;
  };

  render() {
    const { anchorEl, noPadding, children, className, ...props } = this.props;
    return (
      <Modal open={Boolean(anchorEl)} transparentBackdrop {...props}>
        <EventListener target="window" onResize={this.handleWindowResize} />
        <div
          className={classnames("popover", className, {
            "popover--no-padding": noPadding
          })}
          ref={this.popover}
        >
          {children}
        </div>
      </Modal>
    );
  }

  componentDidUpdate() {
    if (this.popover.current) {
      const left = this.getLeft();
      const top = this.getTop();
      this.popover.current.style.left = left;
      this.popover.current.style.top = top;
    }
  }
}

Popover.propTypes = {
  onClose: PropTypes.func,
  horizontal: PropTypes.oneOf([
    HORIZONTAL_CENTER_POSITION,
    HORIZONTAL_LEFT_POSITION,
    HORIZONTAL_RIGHT_POSITION
  ]),
  vertical: PropTypes.oneOf([
    VERTICAL_TOP_POSITION,
    VERTICAL_CENTER_POSITION,
    VERTICAL_BOTTOM_POSITION
  ]),
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  noPadding: PropTypes.bool,
  disabledBackdrop: PropTypes.bool,
  className: PropTypes.string
};

Popover.defaultProps = {
  horizontal: "left",
  vertical: "bottom"
};

export default Popover;
