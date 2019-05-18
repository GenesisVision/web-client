import "./general-notification.scss";

import * as React from "react";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import { IRemoveNotificationSettingProps } from "shared/modules/notification-settings/actions/notification-settings.actions";

export type Setting = {
  id?: string;
  assetId?: string;
  managerId?: string;
  type?: string;
  conditionType?: string;
  conditionAmount?: number;
};

interface IGeneralNotificationProps {
  setting: Setting;
  name: string;
  label: string;
  assetId: string;
  addNotification(opts?: Setting): Promise<any>;
  removeNotification(opts?: IRemoveNotificationSettingProps): Promise<any>;
}

interface IGeneralNotificationState {
  isPending: boolean;
}

class GeneralNotification extends React.PureComponent<
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
        id: this.props.setting.id!, // TODO ask backend remove optional from id
        assetId: this.props.assetId,
        type: this.props.name
      })
      .then(() => this.setState({ isPending: false }))
      .catch(() => this.setState({ isPending: false }));
  };

  render() {
    const { setting, name, label } = this.props;
    return (
      <span className="notification-setting">
        <GVSwitch
          touched={false}
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
