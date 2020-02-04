import ChipButton from "components/chip/chip-button";
import Dialog from "components/dialog/dialog";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { ProgramNotificationSettingList } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { SetSubmittingType } from "utils/types";

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
  t,
  service,
  asset,
  errorMessage,
  removeNotification,
  toggleNotification
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const handleSubmit = useCallback(
    (
      values: ICustomNotificationCreateFormValues,
      setSubmitting: SetSubmittingType
    ) =>
      service
        .addNotification(
          {
            assetId: asset.assetId,
            ...values
          },
          t(`notifications-page.custom.create-alert`)
        )
        .then(setClosePopup)
        .catch(() => {
          setSubmitting(false);
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

const mapStateToProps = (): StateProps => ({
  errorMessage: "" //state.programNotifications.errorMessage TODO
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { addNotification }: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { addNotification },
    dispatch
  )
});

interface Props extends OwnProps, StateProps, DispatchProps, WithTranslation {}

interface OwnProps {
  asset: ProgramNotificationSettingList;
  addNotification: TAddNotification;
  removeNotification: TRemoveNotification;
  toggleNotification: TToggleNotification;
}

interface StateProps {
  errorMessage?: string;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  addNotification: TAddNotification;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const AssetNotificationsCustom = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  React.memo
)(_AssetNotificationsCustom);
export default AssetNotificationsCustom;
