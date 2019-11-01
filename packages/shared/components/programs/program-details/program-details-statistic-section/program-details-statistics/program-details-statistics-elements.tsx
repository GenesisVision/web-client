import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { ProgramDetailsFullStatusEnum, ProgramProfitChart } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsStatisticsElements from "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics-elements";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import ProgramPeriodLine from "shared/components/program-period/program-period-line/program-period-line";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import Tooltip from "shared/components/tooltip/tooltip";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _ProgramDetailsStatisticsElements: React.FC<
  IProgramDetailsStatisticsElementsProps
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
                tooltipContent={t("program-details-page.tooltip.investors")}
                labelText={t("program-details-page.statistics.investors")}
              />
            }
          >
            <NumberFormat
              value={statistic.investors}
              thousandSeparator={" "}
              displayType="text"
            />
          </StatisticItem>
          <div className="details-statistics__period">
            <Tooltip
              horizontal={HORIZONTAL_POPOVER_POS.LEFT}
              render={() => (
                <div className="tooltip__content">
                  {t("program-details-page.tooltip.period")}
                </div>
              )}
            >
              <span className="details-statistics__label tooltip__label">
                {t("program-details-page.statistics.period")}
              </span>
            </Tooltip>
            <ProgramPeriodLine
              start={statistic.lastPeriodStarts}
              end={statistic.lastPeriodEnds}
              status={status}
            />
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
                        statistic.programCurrency
                      )
                    : "-"
                }
                displayType="text"
                suffix={` ${statistic.programCurrency}`}
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

export interface IProgramStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: ProgramProfitChart;
}

export interface IProgramDetailsStatisticsElementsProps {
  status: ProgramDetailsFullStatusEnum;
  period: ChartDefaultPeriod;
  data: IProgramStatisticData;
}

const ProgramDetailsStatisticsElements = React.memo(
  withBlurLoader(_ProgramDetailsStatisticsElements)
);
export default ProgramDetailsStatisticsElements;
