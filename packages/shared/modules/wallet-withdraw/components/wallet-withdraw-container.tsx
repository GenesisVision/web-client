import {
  CancelablePromise,
  CopyTradingAccountInfo,
  CreateWithdrawalRequestModel,
  WalletData
} from "gv-api-web";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import * as React from "react";
import { connect } from "react-redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { updateWalletTimestamp } from "shared/components/wallet/actions/wallet.actions";

import {
  MiddlewareDispatch,
  ResponseError,
  SetSubmittingType
} from "../../../utils/types";
import { CurrentWallet } from "../../wallet-add-funds/components/wallet-add-funds-container";
import * as walletWithdrawService from "../services/wallet-withdraw.services";
import WalletWithdrawForm, {
  IWalletWithdrawFormValues
} from "./wallet-withdraw-form";
import WalletWithdrawRequest from "./wallet-withdraw-request/wallet-withdraw-request";

class WalletWithdrawContainer extends React.PureComponent<Props, State> {
  state = {
    errorMessage: undefined,
    success: false
  };

  handleSubmit = (
    values: IWalletWithdrawFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    this.props.service
      .newWithdrawRequest({ ...values, amount: Number(values.amount) })
      .then(() => {
        this.setState({
          success: true
        });
        this.props.service.updateWalletTimestamp();
      })
      .catch((error: ResponseError) => {
        this.setState({
          success: false,
          errorMessage: error.errorMessage
        });
        setSubmitting(false);
      });
  };

  render() {
    const { errorMessage, success } = this.state;
    const { twoFactorEnabled, wallets, currentWallet } = this.props;

    if (!wallets.length) return <DialogLoader />;

    const enabledWallets = wallets.filter(wallet => wallet.isWithdrawalEnabled);

    return success ? (
      <WalletWithdrawRequest />
    ) : (
      <WalletWithdrawForm
        wallets={enabledWallets}
        currentWallet={currentWallet}
        errorMessage={errorMessage}
        onSubmit={this.handleSubmit}
        twoFactorEnabled={twoFactorEnabled}
      />
    );
  }
}

interface Props extends DispatchProps, StateProps, OwnProps {}

interface OwnProps {
  currentWallet: CurrentWallet;
}

interface DispatchProps {
  service: {
    newWithdrawRequest: (
      data: CreateWithdrawalRequestModel
    ) => CancelablePromise<any>;
    updateWalletTimestamp: () => void;
  };
}

interface StateProps {
  wallets: WalletData[];
  twoFactorEnabled: boolean;
}

interface State {
  success: boolean;
  errorMessage?: string;
}

const mapStateToProps = (state: InvestorRootState): StateProps => {
  if (!state.accountSettings) return { twoFactorEnabled: false, wallets: [] };
  const wallets = state.wallet.info.data ? state.wallet.info.data.wallets : [];
  const twoFactorEnabled = state.accountSettings.twoFactorAuth.data
    ? state.accountSettings.twoFactorAuth.data.twoFactorEnabled
    : false;
  return { twoFactorEnabled, wallets };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    updateWalletTimestamp: () => dispatch(updateWalletTimestamp()),
    newWithdrawRequest: data =>
      dispatch(walletWithdrawService.newWithdrawRequest(data))
  }
});

export default connect<StateProps, DispatchProps, OwnProps, InvestorRootState>(
  mapStateToProps,
  mapDispatchToProps
)(WalletWithdrawContainer);
