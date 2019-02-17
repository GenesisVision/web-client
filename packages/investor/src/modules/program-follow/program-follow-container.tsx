import * as React from "react";
import { connect } from "react-redux";
import Dialog from "shared/components/dialog/dialog";

import FollowForm from "./follow-popup/follow-popup-form";
import FollowTop from "./follow-popup/follow-popup-top";
import {
  CopyTradingAccountsList,
  WalletData,
  WalletInfo,
  WalletsInfo
} from "gv-api-web";
import {
  attachToSignal,
  getSignalAccounts,
  getWalletsAddresses,
  updateAttachToSignal
} from "./services/program-follow-service";
import { FOLLOW_TYPE } from "shared/constants/constants";

export interface IProgramFollowContainerProps {
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
        <FollowTop programName={programName} />
        <FollowForm
          id={id}
          walletsAddresses={walletsAddresses}
          signalAccounts={signalAccounts}
          currency={currency}
          wallets={wallets}
          submitMethod={submitMethod}
          handleSubmit={handleSubmit}
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

export default connect(mapStateToProps)(ProgramFollowContainer);
