import "./dialog.scss";

import classNames from "classnames";
import { CloseIcon } from "components/icon/close-icon";
import Modal from "components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";

class Dialog extends Component {
  render() {
    const { t } = this.props;
    return (
      <Modal open={this.props.open} fixed disableBackdropClick>
        <Scrollbars>
          <div className="dialog__content">
            <div className="dialog__background" />
            <div className="dialog__backdrop" onClick={this.props.onClose} />
            <button
              className="dialog__close dialog__close--outside"
              onClick={this.props.onClose}
            >
              <CloseIcon /> {t("buttons.close")}
            </button>
            <div className={classNames("dialog", this.props.className)}>
              <button
                className="dialog__close dialog__close--inside"
                onClick={this.props.onClose}
              >
                {t("buttons.close")}
              </button>
              {this.props.top && (
                <div className="dialog__top">{this.props.top}</div>
              )}
              {this.props.children}
              {this.props.bottom && (
                <div className="dialog__bottom">{this.props.bottom}</div>
              )}
            </div>
          </div>
        </Scrollbars>
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
