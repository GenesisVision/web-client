import "./dialog.scss";

import classnames from "classnames";
import Modal from "components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Dialog extends Component {
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose} fixed>
        <button
          className="dialog__close dialog__close--outside"
          onClick={this.props.onClose}
        >
          X Close
        </button>
        <div className={classnames("dialog", this.props.className)}>
          <button
            className="dialog__close dialog__close--inside"
            onClick={this.props.onClose}
          >
            X Close
          </button>
          {this.props.top && (
            <div className="dialog__top">{this.props.top}</div>
          )}
          {this.props.children}
          {this.props.bottom && (
            <div className="dialog__bottom">{this.props.bottom}</div>
          )}
        </div>
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

export default Dialog;
