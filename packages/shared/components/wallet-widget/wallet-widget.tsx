import "./wallet-widget.scss";

import classNames from "classnames";
import { WalletsGrandTotal } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import Popover from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import { WithBlurLoaderProps, withBlurLoader } from "shared/decorators/with-blur-loader";
import useAnchor from "shared/hooks/anchor.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import WalletAddFundsPopup from "shared/modules/wallet-add-funds/wallet-add-funds-popup";
import { formatCurrencyValue } from "shared/utils/formatter";

import { walletsSelector } from "../wallet/reducers/wallet.reducers";

const _WalletWidget: React.FC<Props> = ({ data, className }) => {
  const [t] = useTranslation();
  const wallets = useSelector(walletsSelector);
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const {
    currencyCcy: currency,
    availableCcy: available,
    investedCcy: invested,
    pendingCcy: pending,
    totalCcy: totalBalance
  } = data;
  return (
    <>
      <div className={classNames("wallet-widget", className)}>
        <div className="wallet-widget__wallet" onClick={setAnchor}>
          <WalletIcon primary={anchor !== undefined} />
          <span className="wallet-widget__value">{`${formatCurrencyValue(
            available,
            currency
          )} ${currency}`}</span>
        </div>
        <div className="wallet-widget__add">
          <Chip type={CHIP_TYPE.POSITIVE} onClick={setOpenPopup}>
            +
          </Chip>
        </div>
      </div>
      <WalletAddFundsPopup
        currentWallet={wallets.find(wallet => wallet.currency === "GVT")!}
        onClose={setClosePopup}
        open={isOpenPopup}
      />
      <Popover anchorEl={anchor} onClose={clearAnchor}>
        <div className="wallet-details">
          <div className="wallet-details__item">
            <StatisticItem label={t("wallet-widget.total-balance")}>
              {`${formatCurrencyValue(totalBalance, currency)} ${currency}`}
            </StatisticItem>
          </div>
          <div className="wallet-details__item">
            <StatisticItem label={t("wallet-widget.available")}>
              {`${formatCurrencyValue(available, currency)} ${currency}`}
            </StatisticItem>
          </div>
          <div className="wallet-details__item">
            <StatisticItem label={t("wallet-widget.invested")}>
              {`${formatCurrencyValue(invested, currency)} ${currency}`}
            </StatisticItem>
          </div>
          <div className="wallet-details__item">
            <StatisticItem label={t("wallet-widget.pending")}>
              {`${formatCurrencyValue(pending, currency)} ${currency}`}
            </StatisticItem>
          </div>
          <div className="wallet-details__item">
            <div className="wallet-details__value">
              <Link to={WALLET_TOTAL_PAGE_ROUTE} onClick={clearAnchor}>
                {t("wallet-widget.details")} ›
              </Link>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};

interface Props {
  data: WalletsGrandTotal;
  className?: string;
}

const WalletWidget = compose<
  React.ComponentType<Props & WithBlurLoaderProps<WalletsGrandTotal>>
>(
  withBlurLoader,
  React.memo
)(_WalletWidget);
export default WalletWidget;
