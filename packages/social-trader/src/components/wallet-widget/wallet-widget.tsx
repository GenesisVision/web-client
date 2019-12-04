import "./wallet-widget.scss";

import classNames from "classnames";
import HeaderIcon from "components/header/header-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import Link from "components/link/link";
import Popover from "components/popover/popover";
import StatisticItem from "components/statistic-item/statistic-item";
import { WALLET_TOTAL_PAGE_ROUTE } from "components/wallet/wallet.routes";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import { WalletsGrandTotal } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import WalletDeposit, {
  WALLET_DEPOSIT_BUTTON_TYPE
} from "modules/wallet-deposit/wallet-deposit";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { formatCurrencyValue } from "utils/formatter";

const _WalletWidget: React.FC<Props> = ({ data, className }) => {
  const [t] = useTranslation();
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
          <HeaderIcon>
            <WalletIcon primary={anchor !== undefined} />
          </HeaderIcon>
          {`${formatCurrencyValue(available, currency)} ${currency}`}
        </div>
        <WalletDeposit type={WALLET_DEPOSIT_BUTTON_TYPE.SMALL} />
      </div>
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
