import { ProgramNotificationSettingList } from "gv-api-web";
import React from "react";
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
import CustomNotification from "shared/modules/program-notifications/custom-notification";
import ProgramNotificationCreateForm, {
  IProgramNotificationCreateFormValues
} from "shared/modules/program-notifications/program-notification-create-form";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import { addProgramNotification } from "./services/program-notifications.services";

class _ProgramNotificationsCustom extends React.PureComponent<Props, State> {
  state = {
    isOpenCreatePopup: false
  };

  handleSubmit = (
    values: IProgramNotificationCreateFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { t, service } = this.props;
    service
      .addProgramNotification(
        {
          assetId: this.props.program.assetId,
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
    const { t, program, errorMessage } = this.props;
    return (
      <div className="notification-settings custom-notifications">
        <h3 className="notification-settings__subtitle">
          {t("notifications-page.custom.title")}
        </h3>
        {program.settingsCustom.map(settings => (
          <CustomNotification settings={settings} key={settings.id} />
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
          <ProgramNotificationCreateForm
            program={program}
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { success: alertMessageActions.success, addProgramNotification },
    dispatch
  )
});

interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    InjectedTranslateProps {}

interface OwnProps {
  program: ProgramNotificationSettingList;
}

interface StateProps {
  errorMessage?: string;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  success: typeof alertMessageActions.success;
  addProgramNotification: typeof addProgramNotification;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface State {
  isOpenCreatePopup: boolean;
}

const ProgramNotificationsCustom = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_ProgramNotificationsCustom);
export default ProgramNotificationsCustom;
