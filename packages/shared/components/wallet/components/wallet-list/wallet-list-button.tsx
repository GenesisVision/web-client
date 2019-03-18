import { WalletData } from "gv-api-web";
import React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import Tooltip from "shared/components/tooltip/tooltip";
import ArrowIcon from "shared/media/arrow-up.svg";
import ConvertIcon from "shared/media/convert.svg";

interface IWalletListButton {
  wallet: WalletData;
  handleOpenTransferPopup(
    wallet: WalletData
  ): (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenWithdrawPopup(
    wallet: WalletData
  ): (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenAddFundsPopup(
    wallet: WalletData
  ): (event: React.MouseEvent<HTMLElement>) => void;
}

const WalletListButton: React.FC<
  IWalletListButton & InjectedTranslateProps
> = ({
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
          {t("wallet-page.buttons.deposit")}
        </div>
      )}
    >
      <div className="wallet-list__button">
        <Chip
          className="wallet-list__button-add-funds"
          type={CHIP_TYPE.POSITIVE}
          onClick={handleOpenAddFundsPopup(wallet)}
          disabled={wallet.isDepositEnabled === false}
        >
          +
        </Chip>
      </div>
    </Tooltip>
  </React.Fragment>
);

export default translate()(WalletListButton);
