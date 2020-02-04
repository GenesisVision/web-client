import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { StatisticItemContainerBlock } from "components/statistic-item/statistic-item-container.block";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.routes";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _WalletWidgetPopoverContent: React.FC<Props> = ({
  total,
  available,
  invested,
  trading,
  currency,
  clearAnchor
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
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
          <StatisticItemContainerBlock>
            <Link
              to={linkCreator(WALLET_TOTAL_PAGE_ROUTE)}
              onClick={clearAnchor}
            >
              {t("wallet-widget.details")} ›
            </Link>
          </StatisticItemContainerBlock>
        </StatisticItemList>
      </PopoverContentCardBlock>
    </PopoverContent>
  );
};

interface Props {
  total: number;
  available: number;
  invested: number;
  trading: number;
  currency: CurrencyEnum;
  clearAnchor: VoidFunction;
}

const WalletWidgetPopoverContent = React.memo(_WalletWidgetPopoverContent);
export default WalletWidgetPopoverContent;
