import "./general-notification.scss";

import React, { useCallback } from "react";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import useApiRequest from "shared/hooks/api-request.hook";
import { IRemoveNotificationSettingProps } from "shared/modules/notification-settings/actions/notification-settings.actions";

const _GeneralNotification: React.FC<Props> = ({
  setting,
  name,
  label,
  addNotification,
  assetId,
  removeNotification
}) => {
  const request = !!setting
    ? () =>
        removeNotification({
          id: setting.id!, // TODO ask backend remove optional from id
          assetId: assetId,
          type: name
        })
    : () =>
        addNotification({
          type: name,
          assetId: assetId
        });
  const { sendRequest, isPending } = useApiRequest({
    request
  });
  const handleSwitch = useCallback(() => sendRequest(), [
    name,
    assetId,
    setting
  ]);
  return (
    <span className="notification-setting">
      <GVSwitch
        touched={false}
        className="notification-setting__switch"
        name={name}
        value={!!setting}
        disabled={isPending}
        color="primary"
        onChange={handleSwitch}
      />
      <span className="notification-setting__label">{label}</span>
    </span>
  );
};

export type Setting = {
  id?: string;
  assetId?: string;
  managerId?: string;
  type?: string;
  conditionType?: string;
  conditionAmount?: number;
};

interface Props {
  setting: Setting;
  name: string;
  label: string;
  assetId?: string;
  addNotification: (opts: Setting) => any;
  removeNotification: (opts: IRemoveNotificationSettingProps) => any;
}

const GeneralNotification = React.memo(_GeneralNotification);
export default GeneralNotification;
