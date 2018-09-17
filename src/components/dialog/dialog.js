import "./dialog.scss";

import classnames from "classnames";
import Modal from "components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Dialog extends Component {
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <div className={classnames("dialog", this.props.className)}>
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
