import { ProgramNotificationSettingList } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import Dialog from "shared/components/dialog/dialog";
import GVButton from "shared/components/gv-button";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
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
import withLoader, { WithLoaderProps } from "../../decorators/with-loader";

class _AssetNotificationsCustom extends React.PureComponent<Props, State> {
  state = {
    isOpenCreatePopup: false
  };

  handleSubmit = (
    values: ICustomNotificationCreateFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { t, service } = this.props;
    service
      .addNotification(
        {
          assetId: this.props.asset.assetId,
          ...values
        },
        t(`notifications-page.custom.create-alert`)
      )
      .then(() => this.handleClosePopup())
      .catch(() => {
        setSubmitting(false);
      });
  };

  handleClosePopup = () => this.setState({ isOpenCreatePopup: false });

  handleOpenPopup = () => this.setState({ isOpenCreatePopup: true });

  render() {
    const {
      t,
      asset,
      errorMessage,
      removeNotification,
      toggleNotification
    } = this.props;
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
          <GVButton variant="text" onClick={this.handleOpenPopup}>
            <>
              <Chip type={CHIP_TYPE.POSITIVE}>+</Chip>
              {t("notifications-page.create.title")}
            </>
          </GVButton>
        </div>
        <Dialog
          open={this.state.isOpenCreatePopup}
          onClose={this.handleClosePopup}
        >
          <CustomNotificationCreateForm
            asset={asset}
            errorMessage={errorMessage}
            onSubmit={this.handleSubmit}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => ({
  errorMessage: state.programNotifications.errorMessage
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

interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    InjectedTranslateProps {}

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

interface State {
  isOpenCreatePopup: boolean;
}

const AssetNotificationsCustom = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_AssetNotificationsCustom);
export default AssetNotificationsCustom;
