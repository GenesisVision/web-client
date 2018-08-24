import "./popover.scss";

import classnames from "classnames";
import Modal from "components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EventListener from "react-event-listener";

const getAnchorEl = el => {
  return typeof el === "function" ? el() : el;
};

class Popover extends Component {
  state = {
    windowWidth: undefined
  };

  static getDerivedStateFromProps() {
    return {
      windowWidth: window.innerWidth
    };
  }

  getAnchorBounds = () => {
    const anchorEl = getAnchorEl(this.props.anchorEl);
    return anchorEl.getBoundingClientRect();
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
    if (value === "left") {
      position[value] = bounds.left;
    }
    if (value === "right") {
      position[value] = this.state.windowWidth - bounds.right;
    }
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
      ...props
    } = this.props;
    const position = this.getPosition();
    return (
      <Modal
        open={Boolean(anchorEl)}
        backdropStyle={{
          backgroundColor: "transparent"
        }}
        {...props}
      >
        <EventListener target="window" onResize={this.handleWindowResize} />
        <div
          className={classnames("popover", {
            "popover--no-padding": noPadding
          })}
          style={position}
        >
          {children}
        </div>
      </Modal>
    );
  }
}

Popover.propTypes = {
  onClose: PropTypes.func,
  horizontal: PropTypes.oneOf(["left", "right"]),
  vertical: PropTypes.oneOf(["top", "bottom"]),
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  noPadding: PropTypes.bool,
  disabledBackdrop: PropTypes.bool
};

Popover.defaultProps = {
  horizontal: "left",
  vertical: "bottom"
};

export default Popover;
