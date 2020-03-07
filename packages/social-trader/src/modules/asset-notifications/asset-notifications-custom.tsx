import ChipButton from "components/chip/chip-button";
import Dialog from "components/dialog/dialog";
import withLoader from "decorators/with-loader";
import { ProgramNotificationSettingList } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import {
  addNotificationMethod,
  IAddNotificationSettingProps
} from "modules/notification-settings/services/notification-settings.services";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";

import CustomNotification from "./custom-notification";
import { ICustomNotificationCreateFormValues } from "./custom-notification-create-form";

const CustomNotificationCreateForm = dynamic(() =>
  import("./custom-notification-create-form")
);

const _AssetNotificationsCustom: React.FC<Props> = ({ onSuccess, asset }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const [t] = useTranslation();
  const { sendRequest, errorMessage } = useApiRequest({
    request: (values: IAddNotificationSettingProps) => {
      return addNotificationMethod({ ...values, type: "ProgramCondition" });
    },
    successMessage: "notifications-page.custom.create-alert",
    middleware: [postponeCallback(setClosePopup), onSuccess]
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
          onSuccess={onSuccess}
          settings={settings}
          key={settings.id}
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
  onSuccess: VoidFunction;
  asset: ProgramNotificationSettingList;
}

const AssetNotificationsCustom = withLoader(
  React.memo(_AssetNotificationsCustom)
);
export default AssetNotificationsCustom;
