import "./wallet-balance.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import ArrowIcon from "shared/media/arrow-up.svg";
import ConvertIcon from "shared/media/convert.svg";
import WalletDeposit from "shared/modules/wallet-deposit/wallet-deposit";

const _WalletBalanceButtons: React.FC<Props> = ({
  t,
  handleWithdraw,
  handleTransfer,
  isDepositEnabled,
  isWithdrawalEnabled
}) => (
  <div className="wallet-balance__buttons">
    <WalletDeposit disabled={isDepositEnabled === false} />
    <GVButton
      color="secondary"
      variant="outlined"
      onClick={handleWithdraw}
      disabled={isWithdrawalEnabled === false}
    >
      <>
        <img
          className="wallet-balance__button-icon"
          src={ArrowIcon}
          alt="Arrow icon"
        />
        {t("wallet-page.withdraw")}
      </>
    </GVButton>
    {handleTransfer && (
      <GVButton color="secondary" variant="outlined" onClick={handleTransfer}>
        <>
          <img
            className="wallet-balance__button-icon"
            src={ConvertIcon}
            alt="Convert icon"
          />
          {t("wallet-page.transfer")}
        </>
      </GVButton>
    )}
  </div>
);

interface Props extends WithTranslation {
  handleWithdraw: () => void;
  handleTransfer?: () => void;
  isDepositEnabled?: boolean;
  isWithdrawalEnabled?: boolean;
}

const WalletBalanceButtons = translate()(React.memo(_WalletBalanceButtons));
export default WalletBalanceButtons;
