import "./popover.scss";

import classnames from "classnames";
import Modal from "components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EventListener from "react-event-listener";

const MARGIN_OFFSET = 10;

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
    return `${anchorBounds.top}px`;
  };

  getLeft = () => {
    const anchorBounds = this.getAnchorBounds();
    return `${anchorBounds.left}px`;
  };

  getLeftTransform = () => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    const horizontal = this.getHorizontalPosition();

    if (horizontal === "center") {
      const aCenter = anchorBounds.width / 2;
      const pCenter = popoverBounds.width / 2;
      return `${aCenter - pCenter}px`;
    }
    if (horizontal === "right") {
      const r = anchorBounds.width - popoverBounds.width;
      return `${r}px`;
    }
    return 0;
  };

  getTopTransform = () => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    const vertical = this.getVerticalPosition();

    if (vertical === "center") {
      const aCenter = anchorBounds.height / 2;
      const pCenter = popoverBounds.height / 2;
      return `${aCenter - pCenter}px`;
    }
    if (vertical === "top") {
      return `${-popoverBounds.height - MARGIN_OFFSET}px`;
    }
    return `${anchorBounds.height + MARGIN_OFFSET}px`;
  };

  getTransform = () => {
    return [this.getLeftTransform(), this.getTopTransform()];
  };

  handleWindowResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  getVerticalPosition = () => {
    const anchorBounds = this.getAnchorBounds();
    const popoverBounds = this.getPopoverBounds();
    if (
      this.state.windowHeight - anchorBounds.bottom - MARGIN_OFFSET <
        popoverBounds.height &&
      anchorBounds.top + MARGIN_OFFSET > popoverBounds.height
    ) {
      return "top";
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
      const transform = this.getTransform();
      const position = this.getVerticalPosition();

      this.popover.current.style.left = left;
      this.popover.current.style.top = top;
      this.popover.current.style.transform = `translate(${[
        transform[0],
        transform[1]
      ]})`;
    }
  }
}

Popover.propTypes = {
  onClose: PropTypes.func,
  horizontal: PropTypes.oneOf(["left", "right", "center"]),
  vertical: PropTypes.oneOf(["top", "bottom", "center"]),
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
