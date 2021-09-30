import { useRulesValues } from "components/assets/fields/use-rules-values.hook";
import SettingsBlock from "components/settings-block/settings-block";
import { WalletSelectContainer } from "components/wallet-select/wallet-select.container";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";
import { depositAmountRules } from "utils/validators/validators";

import { TUseAssetSectionOutput } from "../asset-section.hook";
import InputDepositAmount from "./input-deposit-amount";

export interface IDepositDetailsDefaultBlockProps {
  hide?: boolean;
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
    if (!wallet) return;
    setFieldValue(inputName, undefined, true);
    setFieldValue(walletFieldName, wallet.id, true);
  }, [wallet]);

  const minDepositInCurText = parseFloat(
    formatCurrencyValue(minimumDepositAmount, wallet.currency)
  );

  const rules = useMemo(
    () => ({
      minValue: minimumDepositAmount,
      minText: minDepositInCurText,
      max: wallet.available
    }),
    [minimumDepositAmount, minDepositInCurText, wallet]
  );

  const { getValues } = useRulesValues(rules);

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
          withUpdateButton
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
          rules={depositAmountRules({
            t,
            getValues
          })}
        />
      </div>
    </SettingsBlock>
  );
};

const DepositDetailsDefaultBlock = React.memo(_DepositDetailsDefaultBlock);
export default DepositDetailsDefaultBlock;
