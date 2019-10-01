import CreateAssetField from "components/create-asset/create-asset-field/create-asset-field";
import CreateAssetSection from "components/create-asset/create-asset-section/create-asset-section";
import { WalletData } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { onSelectChange } from "shared/components/select/select.test-helpers";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import { CurrencyEnum } from "shared/utils/types";

import AmountInfo from "./amount-info";
import InputDepositAmount from "./input-deposit-amount";

const _DepositDetailsBlock: React.FC<Props> = ({
  blockNumber = 3,
  walletFieldName,
  inputName,
  assetCurrency,
  depositAmount,
  minimumDepositAmount,
  wallets,
  rate,
  setFieldValue,
  walletAvailable,
  walletCurrency,
  onWalletChange
}) => {
  const [t] = useTranslation();
  return (
    <CreateAssetSection
      title={t("manager.create-program-page.settings.deposit-details")}
      blockNumber={`0${blockNumber}`}
      withBorder={false}
    >
      <CreateAssetField className="deposit-details">
        <div className="deposit-amount-field">
          <WalletSelect
            name={walletFieldName}
            label={t("transfer.from")}
            items={wallets}
            onChange={onSelectChange(onWalletChange)}
          />
        </div>
        <InputDepositAmount
          name={inputName}
          walletCurrency={walletCurrency}
          walletAvailable={walletAvailable}
          assetCurrency={assetCurrency}
          depositAmount={depositAmount}
          rate={rate}
          setFieldValue={setFieldValue}
        />
        <AmountInfo
          assetCurrency={assetCurrency}
          minimumDepositsAmount={minimumDepositAmount}
          walletAvailable={walletAvailable}
          walletCurrency={walletCurrency}
        />
      </CreateAssetField>
    </CreateAssetSection>
  );
};

interface Props {
  blockNumber?: number;
  walletFieldName: string;
  inputName: string;
  depositAmount?: number;
  minimumDepositAmount: number;
  wallets: WalletData[];
  rate: number;
  setFieldValue: Function;
  onWalletChange: (value: any) => void;
  assetCurrency: CurrencyEnum;
  walletAvailable: number;
  walletCurrency: CurrencyEnum;
}

const DepositDetailsBlock = React.memo(_DepositDetailsBlock);
export default DepositDetailsBlock;
