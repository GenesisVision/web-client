import "./modal.scss";

import classnames from "classnames";
import Portal from "shared/components/portal/portal";
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
    const {
      open,
      disableBackdropClick,
      transparentBackdrop,
      children,
      fixed
    } = this.props;
    return (
      <Portal open={open}>
        <div
          className={classnames("modal", {
            "modal--position-absolute": !disableBackdropClick && !fixed,
            "modal--position-fixed": fixed
          })}
        >
          {disableBackdropClick || (
            <EventListener target={document} onKeyUp={this.handleKeyPress}>
              <div
                className={classnames("modal__backdrop", {
                  "modal__backdrop--transparent": transparentBackdrop
                })}
                onClick={this.handleBackdropClick}
              />
            </EventListener>
          )}
          {children}
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  transparentBackdrop: PropTypes.bool,
  fixed: PropTypes.bool
};

export default Modal;
