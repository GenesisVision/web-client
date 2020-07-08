import { Center } from "components/center/center";
import GVSwitch from "components/gv-switch";
import { RowItem } from "components/row-item/row-item";
import useApiRequest from "hooks/api-request.hook";
import {
  addNotificationMethod,
  removeNotificationMethod
} from "modules/notification-settings/services/notification-settings.services";
import React, { useCallback } from "react";

import styles from "./general-notification.module.scss";

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
    successMessage: `notifications-page:general.${name}.enabled-alert`,
    middleware: [onSuccess]
  });

  const {
    sendRequest: removeNotification,
    isPending: isRemovePending
  } = useApiRequest({
    request: removeNotificationMethod,
    successMessage: `notifications-page:general.${name}.disabled-alert`,
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
    <Center>
      <RowItem>
        <GVSwitch
          touched={false}
          name={name}
          value={!!setting}
          disabled={isPending}
          color="primary"
          onChange={handleSwitch}
        />
      </RowItem>
      <RowItem className={styles["notification-setting__label"]}>
        {label}
      </RowItem>
    </Center>
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
