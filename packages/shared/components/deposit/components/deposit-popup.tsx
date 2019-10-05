import "./deposit.scss";

import { FundInvestInfo, ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import React from "react";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
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
  return (
    <>
      <DepositTop
        title={investInfo.title}
        availableToInvestBase={
          (investInfo as ProgramInvestInfo).availableToInvestBase
        }
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

const DepositPopup = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_DepositPopup);
export default DepositPopup;

interface Props {
  currency: CurrencyEnum;
  invest: TInvest;
  asset: ASSET;
  errorMessage: string;
  wallets: WalletBaseData[];
  investInfo: ProgramInvestInfo | FundInvestInfo;
  hasEntryFee?: boolean;
}
