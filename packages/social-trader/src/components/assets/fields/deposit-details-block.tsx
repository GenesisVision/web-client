import "./deposit-details.scss";

import { onSelectChange } from "components/select/select.test-helpers";
import SettingsBlock from "components/settings-block/settings-block";
import { HookFormWalletSelect as WalletSelect } from "components/wallet-select/wallet-select";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { convertToCurrency } from "utils/currency-converter";
import { CurrencyEnum } from "utils/types";

import AssetField from "../asset-fields/asset-field";
import useAssetSection from "../asset-section.hook";
import InputDepositAmount from "./input-deposit-amount";
import { formatCurrencyValue } from "utils/formatter";

const _DepositDetailsBlock: React.FC<Props> = ({
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
  const { rate, handleWalletChange, wallet, wallets } = useAssetSection({
    assetCurrency
  });
  const minimumDepositAmountInCurr = convertToCurrency(
    minimumDepositAmount,
    rate
  );
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

  const minimumDepositAmountInCurrFormatted =
    wallet.currency === assetCurrency
      ? minimumDepositAmountInCurr
      : +formatCurrencyValue(minimumDepositAmountInCurr, wallet.currency, {
          up: true
        });
  return (
    <SettingsBlock
      hide={hide}
      label={t("create-program-page.settings.deposit-details")}
      blockNumber={`0${blockNumber}`}
      withBorder={false}
    >
      <AssetField className="deposit-details">
        <WalletSelect
          name={walletFieldName}
          label={t("transfer.from")}
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
      </AssetField>
    </SettingsBlock>
  );
};

interface Props {
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
