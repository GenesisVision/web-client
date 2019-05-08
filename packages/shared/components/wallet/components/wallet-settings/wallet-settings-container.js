import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  offPayFeesWithGvt,
  onPayFeesWithGvt
} from "../../services/wallet.services";
import WalletSettings from "./wallet-settings";

class WalletSettingsContainer extends Component {
  state = {
    isPayFeesWithGvt: this.props.isPayFeesWithGvt,
    isOpenGVTFees: false,
    isPending: false
  };

  catchError = err => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.error(err.errorMessage));
    this.setState({ isPending: false });
  };

  handleOn = () => {
    const { services, t } = this.props;
    this.setState({ isPending: true });
    return services
      .onPayFeesWithGvt()
      .then(() => {
        this.setState({ isPayFeesWithGvt: true, isPending: false });
      })
      .catch(this.catchError);
  };

  handleOff = () => {
    const { services, t } = this.props;
    this.setState({ isPending: true });
    return services
      .offPayFeesWithGvt()
      .then(() => {
        this.setState({ isPayFeesWithGvt: false, isPending: false });
      })
      .catch(this.catchError);
  };

  handleOpenGVTFees = () => {
    this.setState({ isOpenGVTFees: true });
  };

  handleCloseGVTFees = () => this.setState({ isOpenGVTFees: false });

  handleSwitch = () => {
    if (this.props.isPayFeesWithGvt) this.handleOff();
    else this.handleOn();
  };

  render() {
    const { t } = this.props;
    const { isPayFeesWithGvt, isPending, isOpenGVTFees } = this.state;

    return (
      <WalletSettings
        name="PayGVTFee"
        label={t("wallet-page.settings.label")}
        isPayFeesWithGvt={isPayFeesWithGvt}
        isPending={isPending}
        handleOpenGVTFees={this.handleOpenGVTFees}
        handleCloseGVTFees={this.handleCloseGVTFees}
        handleSwitch={this.handleSwitch}
        isOpenGVTFees={isOpenGVTFees}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(
    { onPayFeesWithGvt, offPayFeesWithGvt },
    dispatch
  ),
  dispatch
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(WalletSettingsContainer);
