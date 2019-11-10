import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { onSelectChange } from "shared/components/select/select.test-helpers";
import SettingsBlock from "shared/components/settings-block/settings-block";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import { CurrencyEnum } from "shared/utils/types";

import AssetField from "../asset-fields/asset-field";
import useAssetSection from "../asset-section.hook";
import AmountInfo from "./amount-info";
import InputDepositAmount from "./input-deposit-amount";

const _DepositDetailsBlock: React.FC<Props> = ({
  rateName,
  availableName,
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
  useEffect(() => {
    setFieldValue(rateName, rate);
  }, [rate]);
  useEffect(() => {
    if (!wallet) return;
    setFieldValue(inputName, "");
    setFieldValue(availableName, wallet.available);
    setFieldValue(walletFieldName, wallet.id);
  }, [wallet]);
  if (!wallet) return null;
  return (
    <SettingsBlock
      label={t("create-program-page.settings.deposit-details")}
      blockNumber={`0${blockNumber}`}
      withBorder={false}
    >
      <AssetField className="deposit-details">
        <div className="deposit-amount-field">
          <WalletSelect
            name={walletFieldName}
            label={t("transfer.from")}
            items={wallets}
            onChange={onSelectChange(handleWalletChange)}
          />
        </div>
        <InputDepositAmount
          name={inputName}
          walletCurrency={wallet.currency}
          walletAvailable={wallet.available}
          assetCurrency={assetCurrency}
          depositAmount={depositAmount}
          rate={rate}
          setFieldValue={setFieldValue}
        />
        <AmountInfo
          assetCurrency={assetCurrency}
          minimumDepositsAmount={minimumDepositAmount}
          walletAvailable={wallet.available}
          walletCurrency={wallet.currency}
        />
      </AssetField>
    </SettingsBlock>
  );
};

interface Props {
  availableName: string;
  rateName: string;
  blockNumber?: number;
  walletFieldName: string;
  inputName: string;
  depositAmount?: number;
  minimumDepositAmount: number;
  setFieldValue: Function;
  assetCurrency: CurrencyEnum;
}

const DepositDetailsBlock = React.memo(_DepositDetailsBlock);
export default DepositDetailsBlock;
