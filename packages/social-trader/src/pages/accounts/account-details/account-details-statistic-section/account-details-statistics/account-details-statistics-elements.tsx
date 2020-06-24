import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { DetailsStatisticColumn } from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistic-column";
import { DetailsStatisticElement } from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistic-element";
import DetailsStatisticsElements from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics-elements";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProgramChartStatistic } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _AccountDetailsStatisticsElements: React.FC<IAccountDetailsStatisticsElementsProps> = ({
  data: { statistic, statisticCurrency },
  period
}) => {
  const [t] = useTranslation();
  return (
    <DetailsStatisticsElements
      Current={() => (
        <LabeledValue
          label={
            <TooltipLabel
              tooltipContent={t("program-details-page:tooltip.equity")}
              labelText={t("asset-details:statistics.equity")}
            />
          }
        >
          <Text weight={"bold"}>
            <NumberFormat
              value={formatCurrencyValue(statistic.balance, statisticCurrency)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${statisticCurrency}`}
            />
          </Text>
        </LabeledValue>
      )}
      Particular={() => (
        <>
          <DetailsStatisticColumn>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t("program-details-page:tooltip.trades")}
                  labelText={t("asset-details:statistics.trades")}
                />
              }
            >
              <NumberFormat
                value={statistic.trades !== undefined ? statistic.trades : "-"}
                thousandSeparator={" "}
                displayType="text"
              />
            </DetailsStatisticElement>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page:tooltip.profit-factor"
                  )}
                  labelText={t("asset-details:statistics.profit-factor")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.profitFactor !== undefined
                    ? formatValue(statistic.profitFactor, 2)
                    : "-"
                }
                displayType="text"
              />
            </DetailsStatisticElement>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page:tooltip.max-drawdown"
                  )}
                  labelText={t("asset-details:statistics.max-drawdown")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.maxDrawdown !== undefined
                    ? formatValue(statistic.maxDrawdown, 2)
                    : "-"
                }
                displayType="text"
                suffix="%"
              />
            </DetailsStatisticElement>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "asset-details:statistics.tooltip.trading-volume"
                  )}
                  labelText={t("asset-details:statistics.trading-volume")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.tradingVolume !== undefined
                    ? formatCurrencyValue(
                        statistic.tradingVolume,
                        statisticCurrency
                      )
                    : "-"
                }
                displayType="text"
                suffix={` ${statisticCurrency}`}
              />
            </DetailsStatisticElement>
          </DetailsStatisticColumn>
          <DetailsStatisticColumn>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page:tooltip.success-trades"
                  )}
                  labelText={t("asset-details:statistics.success-trades")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.successTradesPercent !== undefined
                    ? formatValue(statistic.successTradesPercent, 2)
                    : "-"
                }
                displayType="text"
                suffix="%"
              />
            </DetailsStatisticElement>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page:tooltip.sharpe-ratio"
                  )}
                  labelText={t("asset-details:statistics.sharpe-ratio")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.sharpeRatio !== undefined
                    ? formatValue(statistic.sharpeRatio, 2)
                    : "-"
                }
                displayType="text"
              />
            </DetailsStatisticElement>
            <DetailsStatisticElement
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page:tooltip.sortino-ratio"
                  )}
                  labelText={t("asset-details:statistics.sortino-ratio")}
                />
              }
            >
              <NumberFormat
                value={
                  statistic.sortinoRatio !== undefined
                    ? formatValue(statistic.sortinoRatio, 2)
                    : "-"
                }
                displayType="text"
              />
            </DetailsStatisticElement>
          </DetailsStatisticColumn>
        </>
      )}
      periodType={period.type}
    />
  );
};

export interface IAccountStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: ProgramChartStatistic;
}

export interface IAccountDetailsStatisticsElementsProps {
  status: string;
  period: ChartDefaultPeriod;
  data: IAccountStatisticData;
}

const AccountDetailsStatisticsElements = React.memo(
  withBlurLoader(_AccountDetailsStatisticsElements)
);
export default AccountDetailsStatisticsElements;
