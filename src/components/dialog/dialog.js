import "./dialog.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Dialog extends Component {
  render() {
    return (
      <div className={classnames("dialog", this.props.className)}>
        {this.props.top && <div className="dialog__top">{this.props.top}</div>}
        {this.props.children}
        {this.props.bottom && (
          <div className="dialog__bottom">{this.props.bottom}</div>
        )}
      </div>
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
