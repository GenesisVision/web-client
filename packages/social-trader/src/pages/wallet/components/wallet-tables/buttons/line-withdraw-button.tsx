import WalletWithdrawButton, {
  WALLET_DEPOSIT_BUTTON_TYPE
} from "modules/wallet-withdraw/wallet-withdraw.button";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import LineWalletButton from "./line-wallet-button";

export const _LineWithdrawButton: React.FC<Props> = ({
  disabled,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <LineWalletButton title={t("wallet-page:buttons.withdraw")}>
      <WalletWithdrawButton
        type={WALLET_DEPOSIT_BUTTON_TYPE.SMALL}
        currency={currency}
        disabled={disabled}
      />
    </LineWalletButton>
  );
};

interface Props {
  currency: CurrencyEnum;
  disabled?: boolean;
}

const LineWithdrawButton = React.memo(_LineWithdrawButton);
export default LineWithdrawButton;
