import "./wallet-copytrading.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import * as walletService from "../../services/wallet.services";
import Chip from "shared/components/chip/chip";

class WalletCopytradingActions extends Component {
  state = {
    anchor: null,
    isResendPending: false,
    isCancelPending: false
  };

  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });

  cancelWithdrawRequest = () => {
    const { transaction, service } = this.props;

    this.setState({ isCancelPending: true }, () => {
      service
        .cancelWithdrawRequest(transaction.id)
        .then(({ isPending }) => this.setState({ isCancelPending: isPending }))
        .catch(err => this.setState({ isCancelPending: false }));
    });
  };

  resendWithdrawRequest = () => {
    const { transaction, service } = this.props;

    this.setState({ isResendPending: true }, () => {
      service
        .resendWithdrawRequest(transaction.id)
        .then(({ isPending }) => this.setState({ isResendPending: isPending }))
        .catch(err => this.setState({ isResendPending: false }));
    });
  };

  render() {
    const { t, transaction, disabled } = this.props;
    const { resendWithdrawRequest, cancelWithdrawRequest } = this;
    /*if (transaction.destinationType !== "WithdrawalRequest" || disabled) {
      return (
        <ActionsCircleIcon className="wallet-transaction-actions__disabled-actions" />
      );
    }*/

    return (
      <div className="wallet-copytrading-actions">
        <Chip
          className="wallet-list__button-transfer"
          // onClick={this.handleOpenTransferPopup.bind(this, wallet)}
        >
          {t("wallet-page.copytrading-actions.transfer")}
        </Chip>
        <Chip
          className="wallet-list__withdraw"
          // onClick={this.handleOpenWithdrawPopup.bind(this, wallet)}
        >
          {t("wallet-page.copytrading-actions.trade-history")}
        </Chip>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(walletService, dispatch)
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(WalletCopytradingActions);
