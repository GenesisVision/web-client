import { ActionsCircleIcon } from "components/icon/actions-circle-icon";
import Popover from "components/popover/popover";
import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import * as walletService from "../../services/wallet.services";

class WalletTransactionActions extends Component {
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
    const { t, transaction } = this.props;
    const { resendWithdrawRequest, cancelWithdrawRequest } = this;
    if (transaction.destinationType !== "WithdrawalRequest") {
      return null;
    }

    return (
      <div className="wallet-transaction-actions">
        <ActionsCircleIcon
          primary={!!this.state.anchor}
          onClick={this.handleOpenDropdown}
        />
        <Popover
          horizontal="right"
          vertical="bottom"
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <div className="popover-list">
            <GVButton
              variant="text"
              color="secondary"
              onClick={resendWithdrawRequest}
              disabled={!transaction.destinationWithdrawalInfo.canResendEmail}
            >
              {t("wallet.transaction-actions.resend-email")}
            </GVButton>
            <GVButton
              variant="text"
              color="secondary"
              onClick={cancelWithdrawRequest}
              disabled={!transaction.destinationWithdrawalInfo.canCancelRequest}
            >
              {t("wallet.transaction-actions.cancel-request")}
            </GVButton>
          </div>
        </Popover>
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
)(WalletTransactionActions);
