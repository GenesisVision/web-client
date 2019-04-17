import { WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { FOLLOW_TYPE } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import FollowPopupForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  getSignalAccounts,
  getSignalInfo,
  updateAttachToSignal
} from "./services/program-follow-service";

export interface IProgramFollowContainerProps {
  service: any;
  programName: string;
  type: FOLLOW_TYPE;
  wallets: WalletData[];
  open: boolean;
  onClose(): void;
  onApply(): void;
  currency: string;
  id: string;
}
interface IProgramFollowContainerState {
  isPending: boolean;
  accounts: any | null;
  hasSignalAccount?: boolean;
}
class ProgramFollowContainer extends React.Component<
  IProgramFollowContainerProps,
  IProgramFollowContainerState
> {
  state = {
    hasSignalAccount: undefined,
    isPending: false,
    accounts: []
  };

  componentDidMount() {
    if (!authService.getAuthArg()) return;
    this.setState({ isPending: true });
    getSignalAccounts()
      .then(CopyTradingAccountsList => {
        const { accounts } = CopyTradingAccountsList;
        this.setState({ accounts });
        return getSignalInfo(this.props.id);
      })
      .then(info => {
        const { hasSignalAccount } = info;
        this.setState({ hasSignalAccount, isPending: false });
      });
  }

  render() {
    const {
      service,
      wallets,
      open,
      onClose,
      currency,
      id,
      type,
      programName
    } = this.props;
    const { isPending, accounts, hasSignalAccount } = this.state;
    if (isPending) return <DialogLoader />;
    const handleClose = () => {
      onClose();
    };
    const handleSubmit = () => {
      onClose();
    };
    const submitMethod =
      type === FOLLOW_TYPE.CREATE ? attachToSignal : updateAttachToSignal;
    return (
      <Dialog open={open} onClose={handleClose}>
        <FollowPopupForm
          hasSignalAccount={hasSignalAccount!}
          alertError={service.alertError}
          alertSuccess={service.alertSuccess}
          id={id}
          accounts={accounts}
          currency={currency}
          wallets={wallets}
          submitMethod={submitMethod}
          handleSubmit={handleSubmit}
          programName={programName}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { wallet } = state;
  return {
    wallets: wallet.info.data ? wallet.info.data.wallets : null
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  service: bindActionCreators(
    {
      alertError: alertMessageActions.error,
      alertSuccess: alertMessageActions.success
    },
    dispatch
  )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramFollowContainer);
