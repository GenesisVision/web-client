import WalletDeposit, {
  WALLET_DEPOSIT_BUTTON_TYPE
} from "modules/wallet-deposit/wallet-deposit";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";
import LineWalletButton from "pages/wallet/components/wallet-tables/buttons/line-wallet-button";

export const _LineBuyButton: React.FC<Props> = ({ disabled, currency }) => {
  const [t] = useTranslation();
  return (
    <>
      <LineWalletButton title={t("wallet-page:buttons.deposit")}>
        <WalletDeposit
          disabled={disabled}
          currency={currency}
          type={WALLET_DEPOSIT_BUTTON_TYPE.SMALL}
        />
      </LineWalletButton>
    </>
  );
};

interface Props {
  currency: CurrencyEnum;
  disabled?: boolean;
}

const LineBuyButton = React.memo(_LineBuyButton);
export default LineBuyButton;
