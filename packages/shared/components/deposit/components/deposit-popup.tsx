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
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { fetchBaseWallets } from "shared/components/wallet/services/wallet.services";
import { ASSET, ROLE_ENV } from "shared/constants/constants";
import RootState from "shared/reducers/root-reducer";
import { RootThunk, SetSubmittingType } from "shared/utils/types";

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
    const { currency, invest, hasEntryFee, asset, errorMessage } = this.props;
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
          currency={currency}
        />
        <DepositForm
          wallets={wallets}
          hasEntryFee={hasEntryFee}
          asset={asset}
          role={ROLE_ENV}
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

const DepositPopup = connect<null, DispatchProps, OwnProps, RootState>(
  null,
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
    setSubmitting: SetSubmittingType
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

interface Props extends OwnProps, DispatchProps {}

interface State {
  wallets?: WalletBaseData[];
  investInfo?: ProgramInvestInfo | FundInvestInfo;
}
