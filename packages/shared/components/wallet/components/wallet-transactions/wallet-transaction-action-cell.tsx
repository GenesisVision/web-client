import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";

import {
  cancelWithdrawRequest,
  resendWithdrawRequest
} from "../../services/wallet.services";

class _WalletTransactionActions extends React.Component<Props, State> {
  state = {
    anchor: undefined,
    isResendPending: false,
    isCancelPending: false
  };

  handleOpenDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: undefined });

  cancelWithdrawRequest = () => {
    const { transaction, service } = this.props;

    this.setState({ isCancelPending: true }, () => {
      service
        .cancelWithdrawRequest(transaction.id)
        .then(({ isPending }) => this.setState({ isCancelPending: isPending }))
        .catch(() => this.setState({ isCancelPending: false }));
    });
  };

  resendWithdrawRequest = () => {
    const { transaction, service } = this.props;

    this.setState({ isResendPending: true }, () => {
      service
        .resendWithdrawRequest(transaction.id)
        .then(({ isPending }) => this.setState({ isResendPending: isPending }))
        .catch(() => this.setState({ isResendPending: false }));
    });
  };

  render() {
    const { t, transaction, disabled } = this.props;
    const { resendWithdrawRequest, cancelWithdrawRequest } = this;
    if (transaction.destinationType !== "WithdrawalRequest" || disabled) {
      return (
        <ActionsCircleIcon className="wallet-transaction-actions__disabled-actions" />
      );
    }

    return (
      <div className="wallet-transaction-actions">
        <ActionsCircleIcon
          primary={!!this.state.anchor}
          onClick={this.handleOpenDropdown}
        />
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
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
              {t("wallet-page.transaction-actions.resend-email")}
            </GVButton>
            <GVButton
              variant="text"
              color="secondary"
              onClick={cancelWithdrawRequest}
              disabled={!transaction.destinationWithdrawalInfo.canCancelRequest}
            >
              {t("wallet-page.transaction-actions.cancel-request")}
            </GVButton>
          </div>
        </Popover>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { cancelWithdrawRequest, resendWithdrawRequest },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

interface OwnProps {
  transaction: any;
  disabled?: boolean;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  cancelWithdrawRequest: typeof cancelWithdrawRequest;
  resendWithdrawRequest: typeof resendWithdrawRequest;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface State {
  isResendPending: boolean;
  isCancelPending: boolean;
  anchor?: HTMLSpanElement;
}

const WalletTransactionActions = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_WalletTransactionActions);
export default WalletTransactionActions;
