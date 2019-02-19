import {
  CopyTradingAccountsList,
  WalletData,
  WalletInfo,
  WalletsInfo
} from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import { FOLLOW_TYPE } from "shared/constants/constants";
import authService from "shared/services/auth-service";

import FollowForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  getSignalAccounts,
  getWalletsAddresses,
  updateAttachToSignal
} from "./services/program-follow-service";
import { bindActionCreators } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

export interface IProgramFollowContainerProps {
  service: any;
  programName: string;
  type: FOLLOW_TYPE;
  wallets: WalletData[];
  open: boolean;
  onClose: () => {};
  currency: string;
  id: string;
}
interface IProgramFollowContainerState {
  isPending: boolean;
  walletsAddresses: WalletInfo[] | null;
  signalAccounts: any | null;
}
class ProgramFollowContainer extends React.Component<
  IProgramFollowContainerProps,
  IProgramFollowContainerState
> {
  state = {
    isPending: false,
    walletsAddresses: null,
    signalAccounts: null
  };

  componentDidMount() {
    if (!authService.getAuthArg()) return;
    this.setState({ isPending: true });
    getWalletsAddresses().then((wallets: WalletsInfo) => {
      this.setState({ walletsAddresses: wallets.wallets });
    });
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
      currency,
      id,
      type,
      programName
    } = this.props;
    const { isPending, walletsAddresses, signalAccounts } = this.state;
    if (!walletsAddresses || isPending) return null;
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
          walletsAddresses={walletsAddresses}
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
      alertError: (msg: string) => alertMessageActions.error(msg),
      alertSuccess: (msg: string) => alertMessageActions.success(msg)
    },
    dispatch
  )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramFollowContainer);
