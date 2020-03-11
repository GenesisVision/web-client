import "./general-notification.scss";

import GVSwitch from "components/gv-selection/gv-switch";
import useApiRequest from "hooks/api-request.hook";
import {
  addNotificationMethod,
  removeNotificationMethod
} from "modules/notification-settings/services/notification-settings.services";
import React, { useCallback } from "react";

const _GeneralNotification: React.FC<Props> = ({
  onSuccess,
  setting,
  name,
  label,
  assetId
}) => {
  const {
    sendRequest: addNotification,
    isPending: isAddPending
  } = useApiRequest({
    request: addNotificationMethod,
    successMessage: `notifications-page.general.${name}.enabled-alert`,
    middleware: [onSuccess]
  });

  const {
    sendRequest: removeNotification,
    isPending: isRemovePending
  } = useApiRequest({
    request: removeNotificationMethod,
    successMessage: `notifications-page.general.${name}.disabled-alert`,
    middleware: [onSuccess]
  });

  const isPending = isAddPending || isRemovePending;

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

  const handleSwitch = useCallback(() => request(), [request]);

  return (
    <span className="notification-setting">
      <div className="notification-setting__switch-wrapper">
        <GVSwitch
          touched={false}
          name={name}
          value={!!setting}
          disabled={isPending}
          color="primary"
          onChange={handleSwitch}
        />
      </div>
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
  onSuccess: VoidFunction;
  setting?: Setting;
  name: string;
  label: string;
  assetId?: string;
}

const GeneralNotification = React.memo(_GeneralNotification);
export default GeneralNotification;
