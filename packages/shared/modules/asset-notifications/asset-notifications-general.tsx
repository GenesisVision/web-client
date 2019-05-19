import {
  NotificationSettingViewModel,
  NotificationSettingViewModelTypeEnum
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GeneralNotification from "shared/components/general-notification/general-notification";

import {
  IAddNotificationSettingProps,
  IRemoveNotificationSettingProps
} from "../notification-settings/actions/notification-settings.actions";
import {
  TAddNotification,
  TRemoveNotification
} from "./asset-notifications.types";

class _AssetNotificationsGeneral extends React.PureComponent<Props> {
  getNotification = (
    type: NotificationSettingViewModelTypeEnum
  ): NotificationSettingViewModel =>
    this.props.settings.find(setting => setting.type === type)!;

  handleAdd = (options: IAddNotificationSettingProps) => {
    const { service, t } = this.props;
    return service.addNotification(
      options,
      t(`notifications-page.general.${options.type}.enabled-alert`)
    );
  };

  handleRemove = (options: IRemoveNotificationSettingProps) => {
    const { service, t } = this.props;
    return service.removeNotification(
      options,
      t(`notifications-page.general.${options.type}.disabled-alert`)
    );
  };

  render() {
    const { t, assetId, notifications } = this.props;
    return (
      <div className="notification-settings">
        <h3 className="notification-settings__subtitle">
          {t("notifications-page.general.title")}
        </h3>
        {notifications.map(notification => (
          <GeneralNotification
            key={notification.name}
            name={notification.name}
            label={notification.label}
            assetId={assetId}
            setting={this.getNotification(notification.name)}
            addNotification={this.handleAdd}
            removeNotification={this.handleRemove}
          />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { addNotification, removeNotification }: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      addNotification,
      removeNotification
    },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

interface OwnProps {
  settings: NotificationSettingViewModel[];
  assetId: string;
  notifications: INotification[];
  addNotification: TAddNotification;
  removeNotification: TRemoveNotification;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  addNotification: TAddNotification;
  removeNotification: TRemoveNotification;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

export interface INotification {
  name: NotificationSettingViewModelTypeEnum;
  label: string;
}

const AssetNotificationsGeneral = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(_AssetNotificationsGeneral);
export default AssetNotificationsGeneral;
