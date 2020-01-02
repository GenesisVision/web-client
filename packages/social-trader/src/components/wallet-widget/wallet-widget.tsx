import "./wallet-widget.scss";

import classNames from "classnames";
import HeaderIcon from "components/header/header-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Popover from "components/popover/popover";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import { WalletsGrandTotal } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import WalletDeposit, {
  WALLET_DEPOSIT_BUTTON_TYPE
} from "modules/wallet-deposit/wallet-deposit";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.routes";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";

const _WalletWidget: React.FC<Props> = ({
  data: { currency, available, invested, trading, total },
  className
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
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
        <PopoverContent>
          <PopoverContentCardBlock stretched>
            <StatisticItemList vertical>
              <StatisticItem label={t("wallet-widget.total-balance")}>
                {`${formatCurrencyValue(total, currency)} ${currency}`}
              </StatisticItem>
              <StatisticItem label={t("wallet-widget.available")}>
                {`${formatCurrencyValue(available, currency)} ${currency}`}
              </StatisticItem>
              <StatisticItem label={t("wallet-widget.invested")}>
                {`${formatCurrencyValue(invested, currency)} ${currency}`}
              </StatisticItem>
              <StatisticItem label={t("wallet-widget.trading")}>
                {`${formatCurrencyValue(trading, currency)} ${currency}`}
              </StatisticItem>
              <StatisticItem>
                <Link
                  to={linkCreator(WALLET_TOTAL_PAGE_ROUTE)}
                  onClick={clearAnchor}
                >
                  {t("wallet-widget.details")} ›
                </Link>
              </StatisticItem>
            </StatisticItemList>
          </PopoverContentCardBlock>
        </PopoverContent>
      </Popover>
    </>
  );
};

interface Props {
  data: WalletsGrandTotal;
  className?: string;
}

const WalletWidget = withBlurLoader(React.memo(_WalletWidget));
export default WalletWidget;
