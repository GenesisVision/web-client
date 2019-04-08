import "./deposit.scss";

import {
  FundInvestInfo,
  ProgramInvestInfo,
  WalletBaseData,
  WalletMultiAvailable
} from "gv-api-web";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { fetchBaseWallets } from "shared/components/wallet/services/wallet.services";
import { ASSET, ROLE } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";
import { RootThunk } from "shared/utils/types";

import { DialogLoader } from "../dialog/dialog-loader/dialog-loader";
import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";

class _DepositPopup extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    hasEntryFee: false
  };

  state: State = {
    wallets: undefined,
    investInfo: undefined
  };

  componentDidMount() {
    const { id, fetchInfo, currency, service } = this.props;
    service.fetchBaseWallets().then(data => {
      this.setState({ wallets: data.wallets });
    });
    fetchInfo(id, currency).then(data => {
      this.setState({ investInfo: data });
    });
  }

  render() {
    const {
      currency,
      invest,
      hasEntryFee,
      asset,
      role,
      errorMessage
    } = this.props;
    const { wallets, investInfo } = this.state;
    if (!wallets || !investInfo) return <DialogLoader />;

    const availableToInvestBase = (investInfo as ProgramInvestInfo)
      ? (investInfo as ProgramInvestInfo).availableToInvestBase
      : undefined;

    return (
      <Fragment>
        <DepositTop
          title={investInfo.title}
          availableToInvestBase={availableToInvestBase}
          asset={asset}
          role={role}
          currency={currency}
        />
        <DepositForm
          wallets={wallets}
          hasEntryFee={hasEntryFee}
          asset={asset}
          role={role}
          errorMessage={errorMessage}
          currency={currency}
          info={investInfo}
          onSubmit={invest}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<
    {
      fetchBaseWallets: () => RootThunk<Promise<WalletMultiAvailable>>;
    },
    {
      fetchBaseWallets: () => Promise<WalletMultiAvailable>;
    }
  >({ fetchBaseWallets }, dispatch)
});
const mapStateToProps = (state: RootState): StateProps => ({
  role: state.profileHeader.info.data
    ? (state.profileHeader.info.data.userType as ROLE)
    : (process.env.REACT_APP_PLATFORM as ROLE)
});

const DepositPopup = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(_DepositPopup);

export default DepositPopup;

interface OwnProps {
  id: string;
  fetchInfo: (
    id: string,
    currency: string
  ) => Promise<ProgramInvestInfo | FundInvestInfo>;
  currency: string;
  invest: (
    amount: number,
    currency: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
  hasEntryFee: boolean;
  asset: ASSET;
  errorMessage: string;
}

interface DispatchProps {
  service: {
    fetchBaseWallets(): Promise<WalletMultiAvailable>;
  };
}

interface StateProps {
  role: ROLE;
}

interface Props extends OwnProps, DispatchProps, StateProps {}

interface State {
  wallets?: WalletBaseData[];
  investInfo?: ProgramInvestInfo | FundInvestInfo;
}
