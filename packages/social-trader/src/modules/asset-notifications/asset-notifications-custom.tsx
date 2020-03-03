import ChipButton from "components/chip/chip-button";
import Dialog from "components/dialog/dialog";
import withLoader from "decorators/with-loader";
import { ProgramNotificationSettingList } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import { IAddNotificationSettingProps } from "modules/notification-settings/actions/notification-settings.actions";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { postponeCallback } from "utils/hook-form.helpers";

import {
  TAddNotification,
  TRemoveNotification,
  TToggleNotification
} from "./asset-notifications.types";
import CustomNotification from "./custom-notification";
import { ICustomNotificationCreateFormValues } from "./custom-notification-create-form";

const CustomNotificationCreateForm = dynamic(() =>
  import("./custom-notification-create-form")
);

const _AssetNotificationsCustom: React.FC<Props> = ({
  addNotification,
  asset,
  removeNotification,
  toggleNotification
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const { sendRequest, errorMessage } = useApiRequest({
    request: (values: IAddNotificationSettingProps) => {
      return dispatch(addNotification({ ...values, type: "ProgramCondition" }));
    },
    successMessage: "notifications-page.custom.create-alert",
    middleware: [postponeCallback(setClosePopup)]
  });

  const handleSubmit = useCallback(
    (values: ICustomNotificationCreateFormValues) =>
      sendRequest({
        assetId: asset.assetId,
        ...values
      }),
    [asset]
  );
  return (
    <div className="notification-settings custom-notifications">
      <h3 className="notification-settings__subtitle">
        {t("notifications-page.custom.title")}
      </h3>
      {asset.settingsCustom.map(settings => (
        <CustomNotification
          settings={settings}
          key={settings.id}
          removeNotification={removeNotification}
          toggleNotifications={toggleNotification}
        />
      ))}
      <ChipButton
        onClick={setOpenPopup}
        label={t("notifications-page.create.title")}
        chipLabel={"+"}
      />
      <Dialog open={isOpenPopup} onClose={setClosePopup}>
        <CustomNotificationCreateForm
          asset={asset}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
        />
      </Dialog>
    </div>
  );
};

interface Props {
  asset: ProgramNotificationSettingList;
  addNotification: TAddNotification;
  removeNotification: TRemoveNotification;
  toggleNotification: TToggleNotification;
}

const AssetNotificationsCustom = withLoader(
  React.memo(_AssetNotificationsCustom)
);
export default AssetNotificationsCustom;
