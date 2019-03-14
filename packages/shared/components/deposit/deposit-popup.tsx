import "./deposit.scss";

import { ProgramInvestInfo, WalletData } from "gv-api-web";
import React, { Fragment } from "react";
import translate from "react-i18next/src/translate";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import * as WalletServices from "shared/components/wallet/services/wallet.services";
import { ASSET, ROLE } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

import { DialogLoader } from "../dialog/dialog-loader/dialog-loader";
import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";

export type SubmitInfo = {
  code: any;
  isPending: boolean;
  errorMessage: string;
};

export interface IDepositPopupProps {
  wallets: WalletData[];
  id: string;
  fetchInfo: (id: string, currency: string) => {};
  info: ProgramInvestInfo;
  submitInfo: SubmitInfo;
  currency: string;
  invest: (amount: string) => {};
  entryFee: boolean;
  asset: ASSET;
  role: ROLE;
}

export interface IDepositPopupDispatchProps {
  service: any;
}
class DepositPopup extends React.Component<
  IDepositPopupProps & IDepositPopupDispatchProps
> {
  componentDidMount() {
    const { id, fetchInfo, currency, service } = this.props;
    service.fetchWallets();
    fetchInfo(id, currency);
  }

  render() {
    const {
      wallets,
      info,
      submitInfo,
      currency,
      invest,
      entryFee,
      asset,
      role
    } = this.props;
    if (!info) return <DialogLoader />;
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

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => {
  return {
    service: bindActionCreators(
      {
        ...WalletServices
      },
      dispatch
    )
  };
};
const mapStateToProps = (state: RootState) => ({
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : null,
  role: state.profileHeader.info.data
    ? state.profileHeader.info.data.userType
    : null
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate()
)(DepositPopup);
