import "./deposit.scss";

import { FundInvestInfo, ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { fetchBaseWallets } from "shared/components/wallet/services/wallet.services";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";
import { TInvest } from "./deposit.types";

const _DepositPopup: React.FC<Props> = ({
  currency,
  invest,
  hasEntryFee = false,
  asset,
  errorMessage,
  wallets,
  investInfo
}) => {
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
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchBaseWallets },
    dispatch
  )
});

const DepositPopup = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  connect<null, DispatchProps, OwnProps, RootState>(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_DepositPopup);
export default DepositPopup;

interface OwnProps {
  currency: CurrencyEnum;
  invest: TInvest;
  asset: ASSET;
  errorMessage: string;
  wallets: WalletBaseData[];
  investInfo: ProgramInvestInfo | FundInvestInfo;
  hasEntryFee?: boolean;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchBaseWallets: typeof fetchBaseWallets;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps {}
