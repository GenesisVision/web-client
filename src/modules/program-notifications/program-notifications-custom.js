import Dialog from "components/dialog/dialog";
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
    console.info(program);
    return (
      <div>
        <h3>{t("notifications.program.custom.title")}</h3>
        <ul>
          {program.settingsCustom.map(settings => (
            <CustomNotification settings={settings} />
          ))}
        </ul>
        <button onClick={this.handleOpenPopup}>
          {t("notifications.program.create.title")}
        </button>
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
