import "./general-notification.scss";

import { GVSwitch } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";

class GeneralNotification extends Component {
  state = {
    isPending: false
  };

  handleSwitch = () => {
    const { setting } = this.props;
    if (!Boolean(setting)) {
      this.addNotification();
    } else {
      this.removeNotification();
    }
  };

  addNotification = () => {
    this.setState({ isPending: true });
    this.props
      .addNotification({
        type: this.props.name,
        programId: this.props.programId
      })
      .finally(this.setState({ isPending: false }));
  };

  removeNotification = () => {
    this.setState({ isPending: true });
    this.props
      .removeNotification({
        id: this.props.setting.id,
        programId: this.props.programId,
        type: this.props.name
      })
      .finally(() => this.setState({ isPending: false }));
  };

  render() {
    const { setting, name, label } = this.props;
    return (
      <label className="notification-setting">
        <GVSwitch
          className="notification-setting__switch"
          name={name}
          value={Boolean(setting)}
          disabled={this.state.isPending}
          color="primary"
          onChange={this.handleSwitch}
        />
        <span className="notification-setting__label">{label}</span>
      </label>
    );
  }
}

GeneralNotification.propTypes = {
  setting: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  programId: PropTypes.string,
  addNotification: PropTypes.func,
  removeNotification: PropTypes.func
};

export default GeneralNotification;
