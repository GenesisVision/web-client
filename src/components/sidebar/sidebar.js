import "./sidebar.scss";

import * as classnames from "classnames";
import Modal from "components/modal/modal";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <div
          className={classnames("sidebar", `sidebar--${this.props.position}`)}
        >
          {this.props.children}
        </div>
      </Modal>
    );
  }
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  position: PropTypes.oneOf(["left", "right"])
};

Sidebar.defaultProps = {
  position: "left"
};

export default Sidebar;
