import "./popover.scss";

import classnames from "classnames";
import Modal from "components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import EventListener from "react-event-listener";

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
    // console.info(this.popover.current);
    return this.popover.current
      ? this.popover.current.getBoundingClientRect()
      : {};
  };

  getVertical = value => {
    const bounds = this.getAnchorBounds();
    return {
      top: bounds[value]
    };
  };

  getHorizontal = value => {
    const position = {};
    const bounds = this.getAnchorBounds();
    const pBounds = this.getPopoverBounds();
    // console.info(pBounds);
    // if (value === "left") {
    //   position[value] = bounds.left;
    // }
    // if (value === "right") {
    //   position[value] = this.state.windowWidth - bounds.right;
    // }
    // if (true) {
    //   position[value] =
    //     this.state.windowWidth - (bounds.right - bounds.left) / 2;
    // }
    return position;
  };

  getPosition = () => {
    let position = {};
    if (getAnchorEl(this.props.anchorEl)) {
      position = {
        ...position,
        ...this.getVertical(this.props.vertical),
        ...this.getHorizontal(this.props.horizontal)
      };
    }

    return position;
  };

  handleWindowResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  render() {
    const {
      anchorEl,
      horizontal,
      vertical,
      noPadding,
      children,
      className,
      ...props
    } = this.props;
    const position = this.getPosition();
    return (
      <Modal open={Boolean(anchorEl)} transparentBackdrop {...props}>
        <EventListener target="window" onResize={this.handleWindowResize} />
        <div
          className={classnames("popover", className, {
            "popover--no-padding": noPadding
          })}
          style={position}
          ref={this.popover}
        >
          {children}
        </div>
      </Modal>
    );
  }

  componentDidUpdate() {
    if (this.popover.current) {
      const pBounds = this.getPopoverBounds();
      const aBounds = this.getAnchorBounds();

      if (true) {
        const aCenter = aBounds.left + aBounds.width / 2;
        this.popover.current.style.left = `${aCenter - pBounds.width / 2}px`;
      }
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
