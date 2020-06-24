import { LabeledValue } from "components/labeled-value/labeled-value";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { Row } from "components/row/row";
import { StatisticItemContainerBlock } from "components/statistic-item/statistic-item-container.block";
import styles from "components/wallet-widget/wallet-widget.module.scss";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.paths";
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
      <PopoverContentCardBlock
        className={styles["wallet-widget__popover"]}
        stretched
      >
        <Row>
          <LabeledValue label={t("wallet-widget.total-balance")}>
            {`${formatCurrencyValue(total, currency)} ${currency}`}
          </LabeledValue>
        </Row>
        <Row>
          <LabeledValue label={t("wallet-widget.available")}>
            {`${formatCurrencyValue(available, currency)} ${currency}`}
          </LabeledValue>
        </Row>
        <Row>
          <LabeledValue label={t("wallet-widget.invested")}>
            {`${formatCurrencyValue(invested, currency)} ${currency}`}
          </LabeledValue>
        </Row>
        <Row>
          <LabeledValue label={t("wallet-widget.trading")}>
            {`${formatCurrencyValue(trading, currency)} ${currency}`}
          </LabeledValue>
        </Row>
        <Row>
          <StatisticItemContainerBlock>
            <Link
              to={linkCreator(WALLET_TOTAL_PAGE_ROUTE)}
              onClick={clearAnchor}
            >
              {t("wallet-widget.details")} ›
            </Link>
          </StatisticItemContainerBlock>
        </Row>
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
