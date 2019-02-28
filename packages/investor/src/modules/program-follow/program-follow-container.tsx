import { CopyTradingAccountsList, WalletData } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { FOLLOW_TYPE } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import FollowForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  getSignalAccounts,
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
  signalAccounts: any | null;
}
class ProgramFollowContainer extends React.Component<
  IProgramFollowContainerProps,
  IProgramFollowContainerState
> {
  state = {
    isPending: false,
    signalAccounts: []
  };

  componentDidMount() {
    if (!authService.getAuthArg()) return;
    this.setState({ isPending: true });
    getSignalAccounts().then(
      (CopyTradingAccountsList: CopyTradingAccountsList) => {
        const { accounts } = CopyTradingAccountsList;
        this.setState({ signalAccounts: accounts, isPending: false });
      }
    );
  }

  render() {
    const {
      service,
      wallets,
      open,
      onClose,
      onApply,
      currency,
      id,
      type,
      programName
    } = this.props;
    const { isPending, signalAccounts } = this.state;
    if (isPending) return null;
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
        <FollowForm
          alertError={service.alertError}
          alertSuccess={service.alertSuccess}
          id={id}
          signalAccounts={signalAccounts}
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
  const { programDeposit, wallet } = state;
  return {
    wallets: wallet.info.data ? wallet.info.data.wallets : null,
    info: programDeposit.info,
    submitInfo: programDeposit.submit
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
