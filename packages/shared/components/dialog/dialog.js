import "./dialog.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EventListener from "react-event-listener";
import { translate } from "react-i18next";
import { CloseIcon } from "shared/components/icon/close-icon";
import Modal from "shared/components/modal/modal";
import GVScroll from "shared/components/scroll/gvscroll";

class Dialog extends Component {
  handleKeyPress = event => {
    const { onClose } = this.props;

    //Esc
    if (event.keyCode === 27) {
      onClose(event);
    }
  };
  render() {
    const { t, open, onClose, className, children, wider } = this.props;
    return (
      <Modal open={open} fixed disableBackdropClick>
        <EventListener target={document} onKeyUp={this.handleKeyPress} />
        <GVScroll autoHide>
          <div className="dialog__content">
            <div className="dialog__background" />
            <div className="dialog__backdrop" onClick={onClose} />
            <GVButton
              variant="text"
              color="secondary"
              className={classnames("dialog__close dialog__close--outside", {
                "dialog__close--wider": wider
              })}
              onClick={onClose}
            >
              <CloseIcon /> {t("buttons.close")}
            </GVButton>
            <div className={classnames("dialog", className)}>
              <GVButton
                variant="text"
                color="secondary"
                className="dialog__close dialog__close--inside"
                onClick={onClose}
              >
                <CloseIcon />
              </GVButton>
              {children}
            </div>
          </div>
        </GVScroll>
      </Modal>
    );
  }
}

Dialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  top: PropTypes.element,
  bottom: PropTypes.element,
  className: PropTypes.string
};

export default translate()(Dialog);
