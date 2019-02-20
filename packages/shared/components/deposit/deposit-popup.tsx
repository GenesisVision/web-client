import "./deposit.scss";

import React, { Fragment } from "react";

import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";
import { ROLE } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import translate from "react-i18next/src/translate";
import { ProgramInvestInfo, WalletData } from "gv-api-web";

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
  program: boolean;
  role: ROLE;
}

class DepositPopup extends React.Component<IDepositPopupProps> {
  componentDidMount() {
    const { id, fetchInfo, currency } = this.props;
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
      program,
      role
    } = this.props;
    return info ? (
      <Fragment>
        <DepositTop info={info} program={program} role={role} />
        <DepositForm
          wallets={wallets}
          entryFee={entryFee}
          program={program}
          role={role}
          errorMessage={submitInfo.errorMessage}
          currency={currency}
          info={info}
          disabled={submitInfo.isPending}
          onSubmit={invest}
        />
      </Fragment>
    ) : null;
  }
}

const mapStateToProps = (state: RootState) => ({
  wallets: state.wallet.info.data ? state.wallet.info.data.wallets : null,
  role: state.profileHeader.info.data
    ? state.profileHeader.info.data.userType
    : null
});

export default compose(
  connect(mapStateToProps),
  translate()
)(DepositPopup);
