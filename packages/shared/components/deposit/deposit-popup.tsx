import "./deposit.scss";

import {
  ProgramInvestInfo,
  WalletBaseData,
  WalletMultiAvailable
} from "gv-api-web";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import * as WalletServices from "shared/components/wallet/services/wallet.services";
import { ASSET, ROLE } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

import { DialogLoader } from "../dialog/dialog-loader/dialog-loader";
import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";

class _DepositPopup extends React.PureComponent<
  OwnProps & DispatchProps & StateProps,
  State
> {
  state = {
    wallets: undefined
  };

  componentDidMount() {
    const { id, fetchInfo, currency, service } = this.props;
    service.fetchBaseWallets().then((data: WalletMultiAvailable) => {
      this.setState({ wallets: data.wallets });
    });
    fetchInfo(id, currency);
  }

  render() {
    const {
      info,
      submitInfo,
      currency,
      invest,
      entryFee,
      asset,
      role
    } = this.props;
    const { wallets } = this.state;
    if (!info || !wallets) return <DialogLoader />;
    return (
      <Fragment>
        <DepositTop info={info} asset={asset} role={role} currency={currency} />
        <DepositForm
          wallets={wallets}
          entryFee={entryFee}
          asset={asset}
          role={role}
          errorMessage={submitInfo.errorMessage}
          currency={currency}
          info={info}
          disabled={submitInfo.isPending}
          onSubmit={invest}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): DispatchProps => ({
  service: bindActionCreators(WalletServices, dispatch)
});
const mapStateToProps = (state: RootState): StateProps => ({
  role: state.profileHeader.info.data
    ? (state.profileHeader.info.data.userType as ROLE)
    : (process.env.REACT_APP_PLATFORM as ROLE)
});

const DepositPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DepositPopup);

export default DepositPopup;

interface SubmitInfo {
  code: any;
  isPending: boolean;
  errorMessage: string;
}

interface OwnProps {
  id: string;
  fetchInfo: (id: string, currency: string) => {};
  info: ProgramInvestInfo;
  submitInfo: SubmitInfo;
  currency: string;
  invest: (amount: string) => {};
  entryFee: boolean;
  asset: ASSET;
}

interface State {
  wallets?: WalletBaseData[];
}

interface DispatchProps {
  service: any;
}

interface StateProps {
  role: ROLE;
}
