import "./modal.scss";

import Portal from "components/portal/portal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EventListener from "react-event-listener";

class Modal extends Component {
  handleKeyPress = event => {
    if (event.keyCode !== 27) return;

    this.handleClose(event);
  };

  handleBackdropClick = event => {
    this.handleClose(event);
  };

  handleClose = event => {
    if (this.props.onClose) {
      this.props.onClose(event);
    }
  };

  render() {
    return (
      <Portal open={this.props.open}>
        <div className="modal">
          {this.props.disabledBackdrop || (
            <EventListener target={document} onKeyUp={this.handleKeyPress}>
              <div
                style={this.props.backdropStyle}
                className="modal__backdrop"
                onClick={this.handleBackdropClick}
              />
            </EventListener>
          )}
          {this.props.children}
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  backdropStyle: PropTypes.object,
  disabledBackdrop: PropTypes.bool
};

export default Modal;
