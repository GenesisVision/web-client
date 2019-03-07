import "./general-notification.scss";

import { GVSwitch } from "gv-react-components";
import * as React from "react";

interface IGeneralNotificationProps {
  setting: {
    id: string;
    assetId: string;
    managerId: string;
    type: string;
    conditionType: string;
    conditionAmount: number;
  };
  name: string;
  label: string;
  assetId: string;
  addNotification(opts?: {
    assetId?: string;
    managerId?: string;
    type?: string;
    conditionType?: string;
    conditionAmount?: number;
  }): Promise<any>;
  removeNotification(opts?: { id: string; assetId: string }): Promise<any>;
}

interface IGeneralNotificationState {
  isPending: boolean;
}

class GeneralNotification extends React.Component<
  IGeneralNotificationProps,
  IGeneralNotificationState
> {
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
        assetId: this.props.assetId
      })
      .then(() => this.setState({ isPending: false }))
      .catch(() => this.setState({ isPending: false }));
  };

  removeNotification = () => {
    this.setState({ isPending: true });
    this.props
      .removeNotification({
        id: this.props.setting.id,
        assetId: this.props.assetId
        // type: this.props.name
      })
      .then(() => this.setState({ isPending: false }))
      .catch(() => this.setState({ isPending: false }));
  };

  render() {
    const { setting, name, label } = this.props;
    return (
      <span className="notification-setting">
        <GVSwitch
          className="notification-setting__switch"
          name={name}
          value={Boolean(setting)}
          disabled={this.state.isPending}
          color="primary"
          onChange={this.handleSwitch}
        />
        <span className="notification-setting__label">{label}</span>
      </span>
    );
  }
}

export default GeneralNotification;
