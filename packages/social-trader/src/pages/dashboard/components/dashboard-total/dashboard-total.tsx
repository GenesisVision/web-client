import GVColors from "components/gv-styles/gv-colors";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Push } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { PieStatisticItem } from "components/statistic-item/pie-statistic-item";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import WalletDeposit from "modules/wallet-deposit/wallet-deposit";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import { KYCLimitContainer } from "pages/dashboard/components/kyc-limit/kyc-limit.container";
import {
  $pieAvailableColor,
  $piePendingColor
} from "pages/wallet/components/wallet-balance/wallet-balance-elements";
import { WALLET_TOTAL_PAGE_ROUTE } from "pages/wallet/wallet.paths";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { INVESTMENTS_ROUTE, TRADING_ROUTE } from "routes/dashboard.routes";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import { TDashboardTotal } from "../../dashboard.types";
import styles from "./dashboard-total.module.scss";

interface Props {
  currency: CurrencyEnum;
  data: TDashboardTotal;
}

const _DashboardTotal: React.FC<Props> = ({
  currency,
  data: { limitWithoutKyc, wallets, invested, trading, profits, total }
}) => {
  const [t] = useTranslation();
  const hasMoney = total > 0;
  const hasProfits =
    Object.values(profits)
      .map(({ profit }) => profit)
      .reduce((prev, cur) => prev + cur, 0) !== 0;
  return (
    <div className={styles["dashboard-total__values"]}>
      <Row wrap className={styles["dashboard-total__main-row"]}>
        <RowItem
          bottomOffset
          className={styles["dashboard-total__main-row-item"]}
        >
          <Row>
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "dashboard-page:tooltips.total.total-balance"
                  )}
                  labelText={t("dashboard-page:total.total")}
                />
              }
            >
              <Text size={"xlarge"} weight={"bold"}>
                {currency ? (
                  <NumberFormat
                    value={formatCurrencyValue(total, currency)}
                    thousandSeparator={" "}
                    suffix={` ${currency}`}
                    displayType="text"
                  />
                ) : (
                  total
                )}
              </Text>
            </LabeledValue>
          </Row>
          <Row>
            <StatisticItemList
              className={styles["dashboard-total__main-block-pie-item-list"]}
            >
              <PieStatisticItem
                onClick={useCallback(() => Push(INVESTMENTS_ROUTE), [])}
                suffix={currency}
                color={GVColors.$primaryColor}
                tooltipContentLabel={t(
                  "dashboard-page:tooltips.total.invested"
                )}
                label={t("dashboard-page:total.invested")}
                value={invested}
                total={total}
              />
              <PieStatisticItem
                onClick={useCallback(() => Push(TRADING_ROUTE), [])}
                suffix={currency}
                color={$piePendingColor}
                tooltipContentLabel={t("dashboard-page:tooltips.total.trading")}
                label={t("dashboard-page:total.pending")}
                value={trading}
                total={total}
              />
              <PieStatisticItem
                onClick={useCallback(() => Push(WALLET_TOTAL_PAGE_ROUTE), [])}
                suffix={currency}
                color={$pieAvailableColor}
                tooltipContentLabel={t("dashboard-page:tooltips.total.wallet")}
                label={t("dashboard-page:total.wallet")}
                value={wallets}
                total={total}
              />
              {!hasMoney && (
                <RowItem>
                  <WalletDeposit />
                </RowItem>
              )}
            </StatisticItemList>
          </Row>
        </RowItem>
        <RowItem
          bottomOffset
          className={styles["dashboard-total__main-row-item"]}
        >
          <KYCLimitContainer limitWithoutKyc={limitWithoutKyc} />
        </RowItem>
      </Row>
      {hasProfits && (
        <>
          <Row>
            <h5>
              <TooltipLabel
                tooltipContent={t("dashboard-page:tooltips.total.performance")}
                labelText={t("dashboard-page:total.performance")}
              />
            </h5>
          </Row>
          <Row size={"small"}>
            <DashboardStatisticPeriods
              data={profits}
              currency={currency}
              withProfitability
            />
          </Row>
        </>
      )}
    </div>
  );
};

const DashboardTotal = withBlurLoader(React.memo(_DashboardTotal));
export default DashboardTotal;
