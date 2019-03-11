import { WalletData } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import Chip from "shared/components/chip/chip";
import Tooltip from "shared/components/tooltip/tooltip";
import ArrowIcon from "shared/media/arrow-up.svg";
import ConvertIcon from "shared/media/convert.svg";

interface IWalletListButton {
  wallet: WalletData;
  handleOpenTransferPopup(wallet: WalletData): void;
  handleOpenWithdrawPopup(wallet: WalletData): void;
  handleOpenAddFundsPopup(wallet: WalletData): void;
}

const WalletListButton: React.FC<IWalletListButton & WithTranslation> = ({
  t,
  wallet,
  handleOpenTransferPopup,
  handleOpenWithdrawPopup,
  handleOpenAddFundsPopup
}) => (
  <React.Fragment>
    <Tooltip
      render={() => (
        <div className="wallet-list__tooltip-button">
          {t("wallet-page.buttons.internal-transfer")}
        </div>
      )}
    >
      <div className="wallet-list__button">
        <Chip
          className="wallet-list__button-transfer"
          onClick={handleOpenTransferPopup(wallet)}
        >
          <img src={ConvertIcon} alt="Convert Icon" />
        </Chip>
      </div>
    </Tooltip>
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
          onClick={handleOpenWithdrawPopup(wallet)}
          disabled={wallet.isWithdrawalEnabled === false}
        >
          <img src={ArrowIcon} alt="Arrow Icon" />
        </Chip>
      </div>
    </Tooltip>
    <Tooltip
      render={() => (
        <div className="wallet-list__tooltip-button">
          {t("wallet-page.buttons.add-funds")}
        </div>
      )}
    >
      <div className="wallet-list__button">
        <Chip
          className="wallet-list__button-add-funds"
          type="positive"
          onClick={handleOpenAddFundsPopup(wallet)}
          disabled={wallet.isDepositEnabled === false}
        >
          +
        </Chip>
      </div>
    </Tooltip>
  </React.Fragment>
);

export default withTranslation()(WalletListButton);
