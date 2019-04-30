import "../wallet-list/wallet-list.scss";

import { CopyTradingAccountInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import Tooltip from "shared/components/tooltip/tooltip";
import ArrowIcon from "shared/media/arrow-up.svg";

const _WalletCopytradingButtons: React.FC<Props & InjectedTranslateProps> = ({
  t,
  account,
  handleOpenWithdrawPopup,
  handleOpenAddFundsPopup
}) => (
  <>
    <Tooltip
      render={() => (
        <div className="wallet-list__tooltip-button">
          {t("wallet-page.buttons.withdraw")}
        </div>
      )}
    >
      <div className="wallet-list__button">
        <Chip
          className="wallet-list__withdraw"
          onClick={handleOpenWithdrawPopup(account)}
          // disabled={account.isWithdrawalEnabled === false}
        >
          <img src={ArrowIcon} alt="Arrow Icon" />
        </Chip>
      </div>
    </Tooltip>
    <Tooltip
      render={() => (
        <div className="wallet-list__tooltip-button">
          {t("wallet-page.buttons.deposit")}
        </div>
      )}
    >
      <div className="wallet-list__button">
        <Chip
          className="wallet-list__button-add-funds"
          type={CHIP_TYPE.POSITIVE}
          onClick={handleOpenAddFundsPopup(account)}
          // disabled={account.isDepositEnabled === false}
        >
          +
        </Chip>
      </div>
    </Tooltip>
  </>
);

interface Props {
  account?: CopyTradingAccountInfo;
  handleOpenWithdrawPopup(
    account?: CopyTradingAccountInfo
  ): (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenAddFundsPopup(
    account?: CopyTradingAccountInfo
  ): (event: React.MouseEvent<HTMLElement>) => void;
}

const WalletCopytradingButtons = React.memo(
  translate()(_WalletCopytradingButtons)
);
export default WalletCopytradingButtons;
