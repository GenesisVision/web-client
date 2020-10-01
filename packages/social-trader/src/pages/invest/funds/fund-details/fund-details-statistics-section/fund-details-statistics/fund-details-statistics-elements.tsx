import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { DetailsStatisticColumn } from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistic-column";
import { DetailsStatisticElement } from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistic-element";
import DetailsStatisticsElements from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics-elements";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import { FundChartStatistic } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { localizedDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _FundDetailsStatisticsElements: React.FC<IFundDetailsStatisticsElementsProps> = ({
  period,
  data: { statisticCurrency, statistic }
}) => {
  const [t] = useTranslation();
  return (
    <DetailsStatisticsElements
      Current={() => (
        <>
          <DetailsStatisticColumn>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page:tooltip.balance")}
                  labelText={t("asset-details:statistics.balance")}
                />
              }
            >
              <Text weight={"bold"} wrap={false}>
                <NumberFormat
                  value={formatCurrencyValue(
                    statistic.balance,
                    statisticCurrency
                  )}
                  thousandSeparator={" "}
                  displayType="text"
                  suffix={` ${statisticCurrency}`}
                />
              </Text>
            </DetailsStatisticElement>
            <DetailsStatisticElement
              bottomOffset={false}
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page:tooltip.start-day")}
                  labelText={t("asset-details:statistics.start-day")}
                />
              }
            >
              <Text wrap={false}>{localizedDate(statistic.creationDate)}</Text>
            </DetailsStatisticElement>
          </DetailsStatisticColumn>
          <DetailsStatisticColumn>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page:tooltip.investors")}
                  labelText={t("asset-details:statistics.investors")}
                />
              }
            >
              <NumberFormat
                value={statistic.investors}
                thousandSeparator={" "}
                displayType="text"
              />
            </DetailsStatisticElement>
          </DetailsStatisticColumn>
        </>
      )}
      Particular={() => (
        <>
          <DetailsStatisticColumn>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page:tooltip.calmar-ratio")}
                  labelText={t("asset-details:statistics.calmarRatio")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.calmarRatio !== null ? statistic.calmarRatio : "-"
                }
                displayType="text"
                decimalScale={2}
              />
            </DetailsStatisticElement>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page:tooltip.profit-change")}
                  labelText={t("asset-details:statistics.profit-change")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.profitPercent !== null
                    ? statistic.profitPercent
                    : "-"
                }
                displayType="text"
                suffix="%"
                decimalScale={2}
              />
            </DetailsStatisticElement>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page:tooltip.max-drawdown")}
                  labelText={t("asset-details:statistics.max-drawdown")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.maxDrawdown !== null ? statistic.maxDrawdown : "-"
                }
                displayType="text"
                suffix="%"
                decimalScale={2}
              />
            </DetailsStatisticElement>
          </DetailsStatisticColumn>
          <DetailsStatisticColumn>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page:tooltip.sharpe-ratio")}
                  labelText={t("asset-details:statistics.sharpe-ratio")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.sharpeRatio !== null ? statistic.sharpeRatio : "-"
                }
                displayType="text"
                decimalScale={2}
              />
            </DetailsStatisticElement>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page:tooltip.sortino-ratio")}
                  labelText={t("asset-details:statistics.sortino-ratio")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.sortinoRatio !== null ? statistic.sortinoRatio : "-"
                }
                displayType="text"
                decimalScale={2}
              />
            </DetailsStatisticElement>
          </DetailsStatisticColumn>
        </>
      )}
      periodType={period.type}
    />
  );
};

export interface IFundStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: FundChartStatistic;
}

export interface IFundDetailsStatisticsElementsProps {
  period: ChartDefaultPeriod;
  data: IFundStatisticData;
}

const FundDetailsStatisticsElements = React.memo(
  withBlurLoader(_FundDetailsStatisticsElements)
);
export default FundDetailsStatisticsElements;
