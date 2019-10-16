import { ProgramNotificationSettingList } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import Dialog from "shared/components/dialog/dialog";
import GVButton from "shared/components/gv-button";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import {
  TAddNotification,
  TRemoveNotification,
  TToggleNotification
} from "./asset-notifications.types";
import CustomNotification from "./custom-notification";
import CustomNotificationCreateForm, {
  ICustomNotificationCreateFormValues
} from "./custom-notification-create-form";

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
      <div className="custom-notification__create">
        <GVButton variant="text" onClick={setOpenPopup}>
          <>
            <Chip type={CHIP_TYPE.POSITIVE}>+</Chip>
            {t("notifications-page.create.title")}
          </>
        </GVButton>
      </div>
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

const mapStateToProps = (state: AuthRootState): StateProps => ({
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_AssetNotificationsCustom);
export default AssetNotificationsCustom;
