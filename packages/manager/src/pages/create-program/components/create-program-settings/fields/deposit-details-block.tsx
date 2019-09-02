import { WalletData } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { ISelectChangeEvent } from "shared/components/select/select";
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
    <>
      <div className="create-program-settings__subheading">
        <span className="create-program-settings__block-number">
          0{blockNumber}
        </span>
        {t("manager.create-program-page.settings.deposit-details")}
      </div>
      <div className={"deposit-details create-program-settings__fill-block"}>
        <div className="create-program-settings__field deposit-details">
          <WalletSelect
            name={walletFieldName}
            label={t("transfer.from")}
            items={wallets}
            onChange={onWalletChange}
          />
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
        </div>
      </div>
    </>
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
  onWalletChange: (event: ISelectChangeEvent, child: JSX.Element) => void;
  assetCurrency: CurrencyEnum;
  walletAvailable: number;
  walletCurrency: CurrencyEnum;
}

const DepositDetailsBlock = React.memo(_DepositDetailsBlock);
export default DepositDetailsBlock;
