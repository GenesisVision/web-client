import "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import DetailsStatisticsElements from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics-elements";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProgramChartStatistic } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramDetailsStatisticsElements: React.FC<
  IFollowDetailsStatisticsElementsProps
> = ({ data: { statistic, statisticCurrency }, period, status }) => {
  const [t] = useTranslation();
  return (
    <DetailsStatisticsElements
      Current={() => (
        <>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.equity")}
                labelText={t("program-details-page.statistics.equity")}
              />
            }
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(statistic.balance, statisticCurrency)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${statisticCurrency}`}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("follow-details-page.tooltip.subscribers")}
                labelText={t("follow-details-page.statistics.subscribers")}
              />
            }
          >
            <NumberFormat
              value={statistic.subscribers}
              thousandSeparator={" "}
              displayType="text"
            />
          </StatisticItem>
          <div className="details-statistics__period">
            <Tooltip
              horizontal={HORIZONTAL_POPOVER_POS.LEFT}
              render={() => (
                <TooltipContent>
                  {t("program-details-page.tooltip.period")}
                </TooltipContent>
              )}
            >
              <span className="details-statistics__label tooltip__label">
                {t("program-details-page.statistics.period")}
              </span>
            </Tooltip>
          </div>
        </>
      )}
      Particular={() => (
        <>
          <div className="details-statistics__column">
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t("program-details-page.tooltip.trades")}
                  labelText={t("program-details-page.statistics.trades")}
                />
              }
              half
            >
              <NumberFormat
                value={statistic.trades !== undefined ? statistic.trades : "-"}
                thousandSeparator={" "}
                displayType="text"
              />
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.profit-factor"
                  )}
                  labelText={t("program-details-page.statistics.profit-factor")}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.profitFactor !== undefined
                    ? formatValue(statistic.profitFactor, 2)
                    : "-"
                }
                displayType="text"
              />
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.max-drawdown"
                  )}
                  labelText={t("program-details-page.statistics.max-drawdown")}
                />
              }
              half
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
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.statistics.tooltip.trading-volume"
                  )}
                  labelText={t(
                    "program-details-page.statistics.trading-volume"
                  )}
                />
              }
              half
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
            </StatisticItem>
          </div>
          <div className="details-statistics__column">
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.success-trades"
                  )}
                  labelText={t(
                    "program-details-page.statistics.success-trades"
                  )}
                />
              }
              half
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
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.sharpe-ratio"
                  )}
                  labelText={t("program-details-page.statistics.sharpe-ratio")}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.sharpeRatio !== undefined
                    ? formatValue(statistic.sharpeRatio, 2)
                    : "-"
                }
                displayType="text"
              />
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.sortino-ratio"
                  )}
                  labelText={t("program-details-page.statistics.sortino-ratio")}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.sortinoRatio !== undefined
                    ? formatValue(statistic.sortinoRatio, 2)
                    : "-"
                }
                displayType="text"
              />
            </StatisticItem>
          </div>
        </>
      )}
      periodType={period.type}
    />
  );
};

export interface IFollowStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: ProgramChartStatistic;
}

export interface IFollowDetailsStatisticsElementsProps {
  status: string;
  period: ChartDefaultPeriod;
  data: IFollowStatisticData;
}

const FollowDetailsStatisticsElements = React.memo(
  withBlurLoader(_ProgramDetailsStatisticsElements)
);
export default FollowDetailsStatisticsElements;
