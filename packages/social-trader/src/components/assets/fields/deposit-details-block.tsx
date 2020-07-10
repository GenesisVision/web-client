import { onSelectChange } from "components/select/select.test-helpers";
import SettingsBlock from "components/settings-block/settings-block";
import { HookFormWalletSelect as WalletSelect } from "components/wallet-select/wallet-select";
import {
  BrokerTradeServerType,
  TradingAccountMinCreateAmount
} from "gv-api-web";
import { getMinDeposit } from "modules/follow-module/services/follow-module-service";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { tradingAccountMinDepositAmountsSelector } from "reducers/platform-reducer";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import useAssetSection from "../asset-section.hook";
import InputDepositAmount from "./input-deposit-amount";

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
  setAvailable,
  setRate,
  blockNumber = 3,
  walletFieldName,
  inputName,
  assetCurrency,
  depositAmount,
  minimumDepositAmount = 0,
  setFieldValue
}) => {
  const [t] = useTranslation();
  const tradingAccountMinDepositAmounts = useSelector(
    tradingAccountMinDepositAmountsSelector
  );
  const { rate, handleWalletChange, wallet, wallets } = useAssetSection({
    assetCurrency
  });
  useEffect(() => {
    setRate(rate);
  }, [rate]);
  useEffect(() => {
    if (!wallet) return;
    setFieldValue(inputName, undefined, true);
    setAvailable(wallet.available);
    setFieldValue(walletFieldName, wallet.id, true);
  }, [wallet]);

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
    <SettingsBlock
      hide={hide}
      label={t("create-account:settings.deposit-details")}
      blockNumber={`0${blockNumber}`}
      withBorder={false}
    >
      <div>
        <WalletSelect
          name={walletFieldName}
          label={t("transfer:from")}
          items={wallets}
          onChange={onSelectChange(handleWalletChange)}
        />
        <InputDepositAmount
          minAmount={minimumDepositAmountInCurrFormatted}
          name={inputName}
          walletCurrency={wallet.currency}
          walletAvailable={wallet.available}
          assetCurrency={assetCurrency}
          depositAmount={depositAmount}
          rate={rate}
          setFieldValue={setFieldValue}
        />
      </div>
    </SettingsBlock>
  );
};

interface Props {
  broker?: BrokerTradeServerType;
  hide?: boolean;
  setRate: (value: number) => void;
  setAvailable: (value: number) => void;
  blockNumber?: number;
  walletFieldName: string;
  inputName: string;
  depositAmount?: number | string;
  minimumDepositAmount: number;
  setFieldValue: Function;
  assetCurrency: CurrencyEnum;
}

const DepositDetailsBlock = React.memo(_DepositDetailsBlock);
export default DepositDetailsBlock;
