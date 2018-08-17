import "./sidebar.scss";

import { ControlsIcon, RingIcon } from "components/icon/icon";
import Modal from "components/modal/modal";
import Tag from "components/tag/tag";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <div className="sidebar">
          <div className="sidebar__header">
            <RingIcon />
            Notifications
            <div className="notifications__count">
              <Tag type="danger">3</Tag>
            </div>
            <div className="profile-widget__avatar">
              <ControlsIcon />
            </div>
          </div>
          <div className="sidebar__content">hello</div>
        </div>
      </Modal>
    );
  }
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Sidebar;
