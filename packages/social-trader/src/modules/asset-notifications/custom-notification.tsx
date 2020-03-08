import "./custom-notification.scss";

import GVButton from "components/gv-button";
import GVSwitch from "components/gv-selection/gv-switch";
import GVTextField from "components/gv-text-field";
import { NotificationSettingViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import {
  removeNotificationMethod,
  toggleNotificationMethod
} from "modules/notification-settings/services/notification-settings.services";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";

const _CustomNotification: React.FC<Props> = ({ onSuccess, settings }) => {
  const [t] = useTranslation();
  const status = !settings.isEnabled;
  const {
    sendRequest: removeNotification,
    isPending: isRemovePending
  } = useApiRequest({
    request: removeNotificationMethod,
    successMessage: `notifications-page.custom.delete-alert`,
    middleware: [onSuccess]
  });

  const {
    sendRequest: toggleNotification,
    isPending: isTogglePending
  } = useApiRequest({
    request: toggleNotificationMethod,
    successMessage: `notifications-page.custom.${
      status ? "enabled" : "disabled"
    }-alert`,
    middleware: [onSuccess]
  });

  const isPending = isTogglePending || isRemovePending;

  const handleSwitch = useCallback(() => {
    return toggleNotification({
      id: settings.id,
      assetId: settings.assetId,
      enabled: status
    });
  }, [settings]);
  const handleDelete = useCallback(() => {
    return removeNotification(settings);
  }, [settings]);

  return (
    <div className="custom-notification">
      <label className="notification-setting">
        <GVSwitch
          className="notification-setting__switch"
          name={settings.type}
          value={settings.isEnabled}
          disabled={isPending}
          color="primary"
          onChange={handleSwitch}
          touched={false}
        />
        <span className="notification-setting__label">
          {t(`notifications-page.create.${settings.conditionType}.title`)}
        </span>
      </label>
      <div className="custom-notification__offset">
        <GVTextField
          name="conditionAmount"
          value={settings.conditionAmount.toString()}
          disabled
          label={t(`notifications-page.create.${settings.conditionType}.label`)}
          adornment={settings.conditionType === "Profit" ? "%" : undefined}
          InputComponent={NumberFormat}
        />
        <GVButton
          noPadding
          variant="text"
          color="danger"
          disabled={isPending}
          onClick={handleDelete}
        >
          {t("buttons.delete")}
        </GVButton>
      </div>
    </div>
  );
};

interface Props {
  onSuccess: VoidFunction;
  settings: NotificationSettingViewModel;
}

const CustomNotification = React.memo(_CustomNotification);
export default CustomNotification;
