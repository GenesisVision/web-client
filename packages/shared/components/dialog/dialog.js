import "./dialog.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { CloseIcon } from "shared/components/icon/close-icon";
import Modal from "shared/components/modal/modal";

class Dialog extends Component {
  render() {
    const { t } = this.props;
    return (
      <Modal open={this.props.open} fixed disableBackdropClick>
        <Scrollbars>
          <div className="dialog__content">
            <div className="dialog__background" />
            <div className="dialog__backdrop" onClick={this.props.onClose} />
            <GVButton
              variant="text"
              color="secondary"
              className="dialog__close dialog__close--outside"
              onClick={this.props.onClose}
            >
              <CloseIcon /> {t("buttons.close")}
            </GVButton>
            <div className={classnames("dialog", this.props.className)}>
              <GVButton
                variant="text"
                color="secondary"
                className="dialog__close dialog__close--inside"
                onClick={this.props.onClose}
              >
                <CloseIcon />
              </GVButton>
              {this.props.children}
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
