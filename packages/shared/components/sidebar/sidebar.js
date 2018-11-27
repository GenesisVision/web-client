import "./sidebar.scss";

import * as classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import posed from "react-pose";
import Modal from "shared/components/modal/modal";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.box = posed.div({
      opened: {
        x: "0%",
        transition: { duration: 150 }
      },
      closed: {
        x: `${props.position === "right" ? "100" : "-100"}%`,
        transition: { duration: 150 }
      }
    });
  }
  state = {
    isOpen: false
  };
  handleOpen = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.close();
  };
  handlePoseComplete = event => {
    if (event === "closed") {
      this.props.onClose && this.props.onClose();
    }
    if (event === "opened") {
      this.props.onOpen && this.props.onOpen();
    }
  };
  close = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const SidebarBox = this.box;
    return (
      <Modal
        ref={this.props.ref}
        open={this.props.open}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        <SidebarBox
          className={classnames("sidebar", `sidebar--${this.props.position}`)}
          pose={this.state.isOpen ? "opened" : "closed"}
          onPoseComplete={this.handlePoseComplete}
        >
          {this.props.children}
        </SidebarBox>
      </Modal>
    );
  }
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  position: PropTypes.oneOf(["left", "right"])
};

Sidebar.defaultProps = {
  position: "left"
};

export default Sidebar;
