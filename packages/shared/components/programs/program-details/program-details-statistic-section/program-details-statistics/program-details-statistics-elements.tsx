import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { ProgramDetailsFullStatusEnum, ProgramProfitChart } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  ChartDefaultPeriod,
  ChartPeriodType
} from "shared/components/chart/chart-period/chart-period.helpers";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import ProgramPeriodLine from "shared/components/program-period/program-period-line/program-period-line";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import Tooltip from "shared/components/tooltip/tooltip";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const _ProgramDetailsStatisticsElements: React.FC<
  IProgramDetailsStatisticsElementsProps
> = ({ profitChart, period, status }) => {
  const [t] = useTranslation();
  return (
    <>
      <div className="details-statistics__subheading">
        {t("program-details-page.statistics.current")}
      </div>
      <div className="details-statistics__particular-information details-statistics__particular-information--current">
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
            value={formatCurrencyValue(
              profitChart.balance,
              profitChart.programCurrency
            )}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${profitChart.programCurrency}`}
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
            value={profitChart.investors}
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
            start={profitChart.lastPeriodStarts}
            end={profitChart.lastPeriodEnds}
            status={status}
          />
        </div>
      </div>

      <div className="details-statistics__subheading">
        {t("program-details-page.statistics.for")}{" "}
        {t(`chart-period.${ChartPeriodType[period.type]}`)}
      </div>

      <div className="details-statistics__particular-information">
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
              value={
                profitChart.trades !== undefined ? profitChart.trades : "-"
              }
              thousandSeparator={" "}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.profit-factor")}
                labelText={t("program-details-page.statistics.profit-factor")}
              />
            }
            half
          >
            <NumberFormat
              value={
                profitChart.profitFactor !== undefined
                  ? formatValue(profitChart.profitFactor, 2)
                  : "-"
              }
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.max-drawdown")}
                labelText={t("program-details-page.statistics.max-drawdown")}
              />
            }
            half
          >
            <NumberFormat
              value={
                profitChart.maxDrawdown !== undefined
                  ? formatValue(profitChart.maxDrawdown, 2)
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
                labelText={t("program-details-page.statistics.trading-volume")}
              />
            }
            half
          >
            <NumberFormat
              value={
                profitChart.tradingVolume !== undefined
                  ? formatCurrencyValue(
                      profitChart.tradingVolume,
                      profitChart.programCurrency
                    )
                  : "-"
              }
              displayType="text"
              suffix={` ${profitChart.programCurrency}`}
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
                labelText={t("program-details-page.statistics.success-trades")}
              />
            }
            half
          >
            <NumberFormat
              value={
                profitChart.successTradesPercent !== undefined
                  ? formatValue(profitChart.successTradesPercent, 2)
                  : "-"
              }
              displayType="text"
              suffix="%"
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.sharpe-ratio")}
                labelText={t("program-details-page.statistics.sharpe-ratio")}
              />
            }
            half
          >
            <NumberFormat
              value={
                profitChart.sharpeRatio !== undefined
                  ? formatValue(profitChart.sharpeRatio, 2)
                  : "-"
              }
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.sortino-ratio")}
                labelText={t("program-details-page.statistics.sortino-ratio")}
              />
            }
            half
          >
            <NumberFormat
              value={
                profitChart.sortinoRatio !== undefined
                  ? formatValue(profitChart.sortinoRatio, 2)
                  : "-"
              }
              displayType="text"
            />
          </StatisticItem>
        </div>
      </div>
    </>
  );
};

export interface IProgramDetailsStatisticsElementsProps {
  status: ProgramDetailsFullStatusEnum;
  profitChart: ProgramProfitChart;
  period: ChartDefaultPeriod;
}

const ProgramDetailsStatisticsElements = React.memo(
  withLoader(_ProgramDetailsStatisticsElements)
);
export default ProgramDetailsStatisticsElements;
