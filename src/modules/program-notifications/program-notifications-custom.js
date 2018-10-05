import Chip from "components/chip/chip";
import Dialog from "components/dialog/dialog";
import { GVButton } from "gv-react-components";
import CustomNotification from "modules/program-notifications/custom-notification";
import { addProgramNotificationService } from "modules/program-notifications/services/program-notifications.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import ProgramNotificationCreateForm from "./program-notification-create-form";

class ProgramNotificationsCustom extends Component {
  state = {
    isOpenCreatePopup: false
  };

  handleSubmit = values => {
    this.props.services.addProgramNotificationService({
      programId: this.props.program.programId,
      ...values
    });
  };

  handleClosePopup = () => {
    this.setState({ isOpenCreatePopup: false });
  };

  handleOpenPopup = () => {
    this.setState({ isOpenCreatePopup: true });
  };

  render() {
    const { t, program } = this.props;
    return (
      <div className="notification-settings custom-notifications">
        <h3>{t("notifications.program.custom.title")}</h3>
        {program.settingsCustom.map(settings => (
          <CustomNotification settings={settings} />
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

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators({ addProgramNotificationService }, dispatch)
});

export default compose(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(ProgramNotificationsCustom);
