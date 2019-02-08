import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  offWalletPayGVTFee,
  onWalletPayGVTFee
} from "../../services/wallet.services";
import WalletSettings from "./wallet-settings";

class WalletSettingsContainer extends Component {
  state = {
    currentSetting: false,
    isPending: false
  };

  success = text => {
    const { dispatch } = this.props;
    dispatch(alertMessageActions.success(text));
  };

  handleOn = () => {
    const { services, t } = this.props;
    this.setState({ isPending: true });
    return services
      .onWalletPayGVTFee()
      .then(() => {
        this.setState({ currentSetting: true, isPending: false });
        this.success(
          "You won!"
          // t(`notifications-page.general.${options.type}.enabled-alert`)
        );
      })
      .catch(() => this.setState({ isPending: false }));
  };

  handleOff = () => {
    const { services, t } = this.props;
    this.setState({ isPending: true });
    return services
      .offWalletPayGVTFee()
      .then(() => {
        this.setState({ currentSetting: false, isPending: false });
        this.success(
          "You lose :("
          // t(`notifications-page.general.${options.type}.disabled-alert`)
        );
      })
      .catch(() => this.setState({ isPending: false }));
  };

  render() {
    const { t } = this.props;
    const { currentSetting, isPending } = this.state;

    return (
      <WalletSettings
        name="PayGVTFee"
        label={t("wallet-page.settings.label")}
        setting={currentSetting}
        isPending={isPending}
        onPayGVTFee={this.handleOn}
        offPayGVTFee={this.handleOff}
      />
    );
  }
}

WalletSettingsContainer.propTypes = {
  settings: PropTypes.object,
  services: PropTypes.shape({
    walletPayGVTFeeOff: PropTypes.func,
    walletPayGVTFeeOn: PropTypes.func
  })
};

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(
    { onWalletPayGVTFee, offWalletPayGVTFee },
    dispatch
  ),
  dispatch
});

export default compose(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  )
)(WalletSettingsContainer);
