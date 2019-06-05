import "./modal.scss";

import classNames from "classnames";
import * as React from "react";
import EventListener from "react-event-listener";
import Portal from "shared/components/portal/portal";

class Modal extends React.PureComponent<Props> {
  handleKeyPress = (
    event: KeyboardEvent & React.MouseEvent<HTMLElement>
  ): void => {
    if (event.keyCode !== 27) return;
    this.handleClose(event);
  };

  handleBackdropClick = (event: React.MouseEvent<HTMLElement>): void => {
    this.handleClose(event);
  };

  handleClose = (event: React.MouseEvent<HTMLElement>): void => {
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
          className={classNames("modal", {
            "modal--position-absolute": !disableBackdropClick && !fixed,
            "modal--position-fixed": fixed
          })}
        >
          {disableBackdropClick || (
            <EventListener target={document} onKeyUp={this.handleKeyPress}>
              <div
                className={classNames("modal__backdrop", {
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

interface Props {
  onClose?(event: React.MouseEvent<HTMLElement>): void;
  open: boolean;
  disableBackdropClick?: boolean;
  transparentBackdrop?: boolean;
  fixed?: boolean;
}

export default Modal;
