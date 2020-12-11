import SettingsBlock from "components/settings-block/settings-block";
import { WalletSelectContainer } from "components/wallet-select/wallet-select.container";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import { TUseAssetSectionOutput } from "../asset-section.hook";
import InputDepositAmount from "./input-deposit-amount";

export interface IDepositDetailsDefaultBlockProps {
  hide?: boolean;
  setRate?: (value: number) => void;
  setAvailable: (value: number) => void;
  blockNumber?: number;
  walletFieldName: string;
  inputName: string;
  depositAmount?: number | string;
  setFieldValue: Function;
  assetCurrency: CurrencyEnum;
}

interface OwnProps {
  minimumDepositAmount: number;
  assetSection: TUseAssetSectionOutput;
}

interface Props extends IDepositDetailsDefaultBlockProps, OwnProps {}

const _DepositDetailsDefaultBlock: React.FC<Props> = ({
  assetSection,
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

  const { isRatePending, rate, handleWalletChange, wallet } = assetSection;
  useEffect(() => {
    setRate && setRate(rate);
  }, [rate]);
  useEffect(() => {
    if (!wallet) return;
    setFieldValue(inputName, undefined, true);
    setAvailable(wallet.available);
    setFieldValue(walletFieldName, wallet.id, true);
  }, [wallet]);

  return (
    <SettingsBlock
      hide={hide}
      label={t("create-account:settings.deposit-details")}
      blockNumber={`0${blockNumber}`}
      withBorder={false}
    >
      <div>
        <WalletSelectContainer
          disabled={isRatePending}
          name={walletFieldName}
          label={t("transfer:from")}
          onChange={handleWalletChange}
        />
        <InputDepositAmount
          disabled={isRatePending}
          minAmount={minimumDepositAmount}
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

const DepositDetailsDefaultBlock = React.memo(_DepositDetailsDefaultBlock);
export default DepositDetailsDefaultBlock;
