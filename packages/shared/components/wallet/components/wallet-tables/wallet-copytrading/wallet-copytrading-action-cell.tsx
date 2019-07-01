import "./wallet-copytrading.scss";

import { CancelablePromise } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import Chip from "shared/components/chip/chip";
import { MiddlewareDispatch } from "shared/utils/types";

import * as walletService from "../../../services/wallet.services";

class WalletCopytradingActions extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined,
    isResendPending: false,
    isCancelPending: false
  };

  handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) =>
    this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: undefined });

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

interface Props extends DispatchProps, InjectedTranslateProps, OwnProps {}

interface OwnProps {
  transaction?: any;
  disabled?: boolean;
}

interface DispatchProps {
  service: {
    cancelWithdrawRequest: (id: string) => CancelablePromise<any>;
    resendWithdrawRequest: (id: string) => CancelablePromise<any>;
  };
}

interface State {
  isResendPending: boolean;
  isCancelPending: boolean;
  anchor?: HTMLElement;
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    cancelWithdrawRequest: (id: string) =>
      dispatch(walletService.cancelWithdrawRequest(id)),
    resendWithdrawRequest: (id: string) =>
      dispatch(walletService.resendWithdrawRequest(id))
  }
});

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(WalletCopytradingActions);
