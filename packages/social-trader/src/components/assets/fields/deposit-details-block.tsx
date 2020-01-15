import "./deposit-details.scss";

import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import GVFormikField from "components/gv-formik-field";
import { onSelectChange } from "components/select/select.test-helpers";
import SettingsBlock from "components/settings-block/settings-block";
import WalletSelect from "components/wallet-select/wallet-select";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { convertToCurrency } from "utils/currency-converter";
import { CurrencyEnum } from "utils/types";

import AssetField from "../asset-fields/asset-field";
import useAssetSection from "../asset-section.hook";
import AmountInfo from "./amount-info";
import InputDepositAmount from "./input-deposit-amount";

const _DepositDetailsBlock: React.FC<Props> = ({
  setFieldTouched,
  enterMinDeposit,
  enterMinDepositName,
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
  const minimumDepositAmountInCurr = convertToCurrency(
    minimumDepositAmount,
    rate
  );
  useEffect(() => {
    setFieldValue(rateName, rate);
  }, [rate]);
  useEffect(() => {
    if (!wallet) return;
    setFieldValue(inputName, "");
    setFieldValue(availableName, wallet.available);
    setFieldValue(walletFieldName, wallet.id);
  }, [wallet]);

  useEffect(() => {
    if (enterMinDeposit) {
      setFieldValue(inputName, minimumDepositAmountInCurr);
      setFieldTouched(inputName);
    }
  }, [enterMinDeposit, minimumDepositAmountInCurr]);
  useEffect(() => {
    if (!enterMinDeposit) setFieldValue(inputName, "");
  }, [enterMinDeposit]);

  if (!wallet) return null;
  return (
    <SettingsBlock
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
          disabled={enterMinDeposit}
          name={inputName}
          walletCurrency={wallet.currency}
          walletAvailable={wallet.available}
          assetCurrency={assetCurrency}
          depositAmount={depositAmount}
          rate={rate}
          setFieldValue={setFieldValue}
        />
        <GVFormikField
          type="checkbox"
          color="primary"
          name={enterMinDepositName}
          label={<>{t("create-asset-page.min-deposit")}</>}
          component={GVCheckbox}
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
  enterMinDeposit?: boolean;
  enterMinDepositName: string;
  availableName: string;
  rateName: string;
  blockNumber?: number;
  walletFieldName: string;
  inputName: string;
  depositAmount?: number;
  minimumDepositAmount: number;
  setFieldTouched: Function;
  setFieldValue: Function;
  assetCurrency: CurrencyEnum;
}

const DepositDetailsBlock = React.memo(_DepositDetailsBlock);
export default DepositDetailsBlock;
