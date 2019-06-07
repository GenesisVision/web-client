import {
  NotificationSettingViewModel,
  NotificationSettingViewModelTypeEnum
} from "gv-api-web";
import React, { useCallback } from "react";
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
} from "shared/modules/notification-settings/actions/notification-settings.actions";

import {
  TAddNotification,
  TRemoveNotification
} from "./asset-notifications.types";

const _AssetNotificationsGeneral: React.FC<Props> = ({
  t,
  assetId,
  notifications,
  service,
  settings
}) => {
  const getNotification = useCallback(
    (
      type: NotificationSettingViewModelTypeEnum
    ): NotificationSettingViewModel =>
      settings.find(setting => setting.type === type)!,
    [settings]
  );

  const handleAdd = useCallback(
    (options: IAddNotificationSettingProps) =>
      service.addNotification(
        options,
        t(`notifications-page.general.${options.type}.enabled-alert`)
      ),
    [service]
  );

  const handleRemove = useCallback(
    (options: IRemoveNotificationSettingProps) =>
      service.removeNotification(
        options,
        t(`notifications-page.general.${options.type}.disabled-alert`)
      ),
    [service]
  );

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
          setting={getNotification(notification.name)}
          addNotification={handleAdd}
          removeNotification={handleRemove}
        />
      ))}
    </div>
  );
};

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
  notifications: INotification[];
  addNotification: TAddNotification;
  removeNotification: TRemoveNotification;
  assetId?: string;
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
  ),
  React.memo
)(_AssetNotificationsGeneral);
export default AssetNotificationsGeneral;
