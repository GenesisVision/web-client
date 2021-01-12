import DepositDetailsDefaultBlock, {
  IDepositDetailsDefaultBlockProps
} from "components/assets/fields/deposit-details-default-block";
import {
  BrokerTradeServerType,
  TradingAccountMinCreateAmount
} from "gv-api-web";
import { getMinDeposit } from "modules/follow-module/services/follow-module-service";
import React from "react";
import { useSelector } from "react-redux";
import { tradingAccountMinDepositAmountsSelector } from "reducers/platform-reducer";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import useAssetSection from "../asset-section.hook";

interface Props extends IDepositDetailsDefaultBlockProps {
  minimumDepositAmount: number;
  broker?: BrokerTradeServerType;
}

interface Props {
  broker?: BrokerTradeServerType;
  hide?: boolean;
  blockNumber?: number;
  walletFieldName: string;
  inputName: string;
  depositAmount?: number | string;
  minimumDepositAmount: number;
  setFieldValue: Function;
  assetCurrency: CurrencyEnum;
}

const hasMinAmount = (
  tradingAccountMinDepositAmounts: TradingAccountMinCreateAmount[],
  currency: CurrencyEnum,
  broker?: BrokerTradeServerType
) => {
  if (!broker) return false;
  const brokerDepositAmounts = tradingAccountMinDepositAmounts.find(
    ({ serverType }) => serverType === broker
  );
  if (!brokerDepositAmounts) return false;
  return !!brokerDepositAmounts.minDepositCreateAsset.find(
    deposit => deposit.currency === currency
  );
};

const _DepositDetailsBlock: React.FC<Props> = ({
  broker,
  hide,
  blockNumber = 3,
  walletFieldName,
  inputName,
  assetCurrency,
  depositAmount,
  minimumDepositAmount = 0,
  setFieldValue
}) => {
  const tradingAccountMinDepositAmounts = useSelector(
    tradingAccountMinDepositAmountsSelector
  );
  const assetSection = useAssetSection({
    assetCurrency
  });
  const { rate, wallet } = assetSection;

  if (!wallet) return null;

  const isWalletWithMinAmount = hasMinAmount(
    tradingAccountMinDepositAmounts,
    wallet.currency,
    broker
  );

  const minimumDepositAmountInCurr =
    broker && isWalletWithMinAmount
      ? getMinDeposit({
          isExternal: false,
          tradingAccountMinDepositAmounts,
          broker,
          currency: wallet.currency
        })
      : convertToCurrency(minimumDepositAmount, rate);

  const minimumDepositAmountInCurrFormatted =
    wallet.currency === assetCurrency
      ? minimumDepositAmountInCurr
      : +formatCurrencyValue(minimumDepositAmountInCurr, wallet.currency, {
          up: true
        });

  return (
    <DepositDetailsDefaultBlock
      assetSection={assetSection}
      hide={hide}
      blockNumber={blockNumber}
      walletFieldName={walletFieldName}
      inputName={inputName}
      depositAmount={depositAmount}
      minimumDepositAmount={minimumDepositAmountInCurrFormatted}
      setFieldValue={setFieldValue}
      assetCurrency={assetCurrency}
    />
  );
};

const DepositDetailsBlock = React.memo(_DepositDetailsBlock);
export default DepositDetailsBlock;
