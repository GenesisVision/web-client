import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Chip from "shared/components/chip/chip";
import Dialog from "shared/components/dialog/dialog";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { addErrorMessage } from "shared/modules/program-notifications/actions/program-notifications.actions";
import CustomNotification from "shared/modules/program-notifications/custom-notification";
import { addProgramNotificationService } from "shared/modules/program-notifications/services/program-notifications.services";

import ProgramNotificationCreateForm from "./program-notification-create-form";

class ProgramNotificationsCustom extends Component {
  state = {
    isOpenCreatePopup: false
  };

  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
  };

  handleSubmit = values => {
    const { t } = this.props;
    this.props.services
      .addProgramNotificationService({
        assetId: this.props.program.assetId,
        ...values
      })
      .then(() => this.handleClosePopup())
      .then(() => {
        this.success(t(`notifications.program.custom.create-alert`));
      });
  };

  handleClosePopup = () => {
    this.setState({ isOpenCreatePopup: false }, () => {
      this.props.dispatch(addErrorMessage());
    });
  };

  handleOpenPopup = () => {
    this.setState({ isOpenCreatePopup: true });
  };

  render() {
    const { t, program, errorMessage } = this.props;
    return (
      <div className="notification-settings custom-notifications">
        <h3 className="notification-settings__subtitle">
          {t("notifications.program.custom.title")}
        </h3>
        {program.settingsCustom.map(settings => (
          <CustomNotification settings={settings} key={settings.assetId} />
        ))}
        <div className="custom-notification__create">
          <GVButton variant="text" onClick={this.handleOpenPopup}>
            <Chip type="positive">+</Chip>
            {t("notifications.program.create.title")}
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

ProgramNotificationsCustom.propTypes = {
  settings: PropTypes.array
};

const mapStateToProps = state => ({
  errorMessage: state.programNotifications.errorMessage
});

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators({ addProgramNotificationService }, dispatch),
  dispatch
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramNotificationsCustom);
