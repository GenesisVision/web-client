import "./modal.scss";

import classnames from "classnames";
import Portal from "shared/components/portal/portal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EventListener from "react-event-listener";
import posed, { PoseGroup } from "react-pose";

const BackdropBox = posed.div({
  enter: {
    opacity: 0.7,
    transition: { duration: 150 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 150 }
  }
});

class Modal extends Component {
  state = {
    isOpen: false
  };

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

  componentDidUpdate(prev) {
    if (!prev.open && this.props.open) {
      this.props.onOpen && this.props.onOpen();
    }
  }

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
          <PoseGroup animateOnMount>
            {disableBackdropClick ? null : (
              <BackdropBox
                key="backdrop-box"
                className={classnames("modal__backdrop", {
                  "modal__backdrop--transparent": transparentBackdrop
                })}
                onClick={this.handleBackdropClick}
              >
                <EventListener
                  target={document}
                  onKeyUp={this.handleKeyPress}
                />
              </BackdropBox>
            )}
          </PoseGroup>
          {children}
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  transparentBackdrop: PropTypes.bool,
  fixed: PropTypes.bool
};

export default Modal;
