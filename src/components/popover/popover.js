import "./popover.scss";

import Portal from "components/portal/portal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EventListener from "react-event-listener";

const getAnchorEl = el => {
  return typeof el === "function" ? el() : el;
};

class Popover extends Component {
  static getDerivedStateFromProps() {
    return {
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    this.handleWindowResize();
  }

  handleClose = () => {
    if (typeof this.props.onClose === "function") {
      this.props.onClose();
    }
  };

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

  render() {
    const position = this.getPosition();
    return (
      Boolean(this.props.anchorEl) && (
        <Portal onClose={this.handleClose}>
          <EventListener target="window" onResize={this.handleWindowResize}>
            <div className="popover" style={position}>
              {this.props.children}
            </div>
          </EventListener>
        </Portal>
      )
    );
  }
}

Popover.propTypes = {
  onClose: PropTypes.func,
  horizontal: PropTypes.oneOf(["left", "right"]),
  vertical: PropTypes.oneOf(["top", "bottom"]),
  anchorEl: PropTypes.any
};

Popover.defaultProps = {
  horizontal: "left",
  vertical: "bottom"
};

export default Popover;
