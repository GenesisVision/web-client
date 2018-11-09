import Chip from "shared/components/chip/chip";
import Dialog from "shared/components/dialog/dialog";
import { GVButton } from "gv-react-components";
import CustomNotification from "modules/fund-notifications/custom-notification";
import { addFundNotificationsService } from "modules/fund-notifications/services/fund-notifications.services";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import FundNotificationCreateForm from "./fund-notification-create-form";

class FundNotificationsCustom extends Component {
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
      .addFundNotificationsService({
        fundId: this.props.fund.fundId,
        ...values
      })
      .then(() => this.handleClosePopup())
      .then(() => {
        this.success(t(`fund.custom.create-alert`));
      });
  };

  handleClosePopup = () => {
    this.setState({ isOpenCreatePopup: false });
  };

  handleOpenPopup = () => {
    this.setState({ isOpenCreatePopup: true });
  };

  render() {
    const { t, fund } = this.props;
    return (
      <div className="notification-settings custom-notifications">
        <h3>{t("notifications.fund.custom.title")}</h3>
        {fund.settingsCustom.map(settings => (
          <CustomNotification settings={settings} key={settings.fundId} />
        ))}
        <div className="custom-notification__create">
          <GVButton variant="text" onClick={this.handleOpenPopup}>
            <Chip type="positive">+</Chip>
            {t("notifications.fund.create.title")}
          </GVButton>
        </div>
        <Dialog
          open={this.state.isOpenCreatePopup}
          onClose={this.handleClosePopup}
        >
          <FundNotificationCreateForm
            fund={fund}
            onSubmit={this.handleSubmit}
          />
        </Dialog>
      </div>
    );
  }
}

FundNotificationsCustom.propTypes = {
  settings: PropTypes.array
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators({ addFundNotificationsService }, dispatch),
  dispatch
});

export default compose(translate(), connect(undefined, mapDispatchToProps))(
  FundNotificationsCustom
);
