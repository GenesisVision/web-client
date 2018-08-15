import "./popover.scss";

import Portal from "components/portal/portal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EventListener from "react-event-listener";

const getAnchorEl = el => {
  return typeof el === "function" ? el() : el;
};

class Popover extends Component {
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
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  handleDocumentClick = () => {
    this.handleClose();
  };

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const position = this.getPosition();
    return (
      <Portal open={Boolean(this.props.anchorEl)}>
        <div className="popover" style={position}>
          <EventListener target="window" onResize={this.handleWindowResize} />
          <EventListener target="document" onClick={this.handleDocumentClick} />
          {this.props.children}
        </div>
      </Portal>
    );
  }
}

Popover.propTypes = {
  onClose: PropTypes.func,
  horizontal: PropTypes.oneOf(["left", "right"]),
  vertical: PropTypes.oneOf(["top", "bottom"]),
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

Popover.defaultProps = {
  horizontal: "left",
  vertical: "bottom"
};

export default Popover;
