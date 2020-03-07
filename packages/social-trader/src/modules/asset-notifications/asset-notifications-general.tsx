import GeneralNotification from "components/general-notification/general-notification";
import { NotificationSettingViewModel } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

type NotificationSettingViewModelTypeEnum = any; // TODO declare type

const _AssetNotificationsGeneral: React.FC<Props> = ({
  onSuccess,
  assetId,
  notifications,
  settings
}) => {
  const [t] = useTranslation();

  const getNotification = useCallback(
    (
      type: NotificationSettingViewModelTypeEnum
    ): NotificationSettingViewModel | undefined =>
      settings.find(setting => setting.type === type),
    [settings]
  );

  return (
    <div className="notification-settings">
      <h3 className="notification-settings__subtitle">
        {t("notifications-page.general.title")}
      </h3>
      {notifications.map(notification => (
        <GeneralNotification
          onSuccess={onSuccess}
          key={notification.name}
          name={notification.name}
          label={notification.label}
          assetId={assetId}
          setting={getNotification(notification.name)}
        />
      ))}
    </div>
  );
};

interface Props {
  onSuccess: VoidFunction;
  settings: NotificationSettingViewModel[];
  notifications: INotification[];
  assetId?: string;
}

export interface INotification {
  name: NotificationSettingViewModelTypeEnum;
  label: string;
}

const AssetNotificationsGeneral = React.memo(_AssetNotificationsGeneral);
export default AssetNotificationsGeneral;
