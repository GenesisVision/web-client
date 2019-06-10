import "./deposit.scss";

import { FundInvestInfo, ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { fetchBaseWallets } from "shared/components/wallet/services/wallet.services";
import { ASSET } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

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
      <>
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
          errorMessage={errorMessage}
          currency={currency}
          info={investInfo}
          onSubmit={invest}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchBaseWallets },
    dispatch
  )
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

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchBaseWallets: typeof fetchBaseWallets;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps {}

interface State {
  wallets?: WalletBaseData[];
  investInfo?: ProgramInvestInfo | FundInvestInfo;
}
