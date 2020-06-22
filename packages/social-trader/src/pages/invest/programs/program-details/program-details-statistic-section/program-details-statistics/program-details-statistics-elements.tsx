import classNames from "classnames";
import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import DetailsStatisticsElements from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics-elements";
import styles from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.module.scss";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import ProgramPeriodLine from "components/program-period/program-period-line/program-period-line";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProgramChartStatistic } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramDetailsStatisticsElements: React.FC<IProgramDetailsStatisticsElementsProps> = ({
  data,
  period,
  status
}) => {
  const [t] = useTranslation();
  if (!data) return null;
  const { statistic, statisticCurrency } = data;
  return (
    <DetailsStatisticsElements
      Current={() => (
        <>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.equity")}
                labelText={t("asset-details.statistics.equity")}
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
          {statistic.investors !== null && (
            <StatisticItem
              half
              label={
                <TooltipLabel
                  tooltipContent={t("program-details-page.tooltip.investors")}
                  labelText={t("asset-details.statistics.investors")}
                />
              }
            >
              <NumberFormat
                value={statistic.investors}
                thousandSeparator={" "}
                displayType="text"
              />
            </StatisticItem>
          )}
          {statistic.subscribers !== null && (
            <StatisticItem
              half
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
          )}
          {!!statistic.lastPeriodStarts && (
            <div className={styles["details-statistics__period"]}>
              <Tooltip
                horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                render={() => (
                  <TooltipContent>
                    {t("program-details-page.tooltip.period")}
                  </TooltipContent>
                )}
              >
                <span
                  className={classNames(
                    styles["details-statistics__label"],
                    styles["tooltip__label"]
                  )}
                >
                  <Text muted>{t("asset-details.statistics.period")}</Text>
                </span>
              </Tooltip>
              <Row small onlyOffset>
                <ProgramPeriodLine
                  start={statistic.lastPeriodStarts}
                  end={statistic.lastPeriodEnds}
                  status={status}
                />
              </Row>
            </div>
          )}
        </>
      )}
      Particular={() => (
        <>
          <div className={styles["details-statistics__column"]}>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t("program-details-page.tooltip.trades")}
                  labelText={t("asset-details.statistics.trades")}
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
                  labelText={t("asset-details.statistics.profit-factor")}
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
                  labelText={t("asset-details.statistics.max-drawdown")}
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
                    "asset-details.statistics.tooltip.trading-volume"
                  )}
                  labelText={t("asset-details.statistics.trading-volume")}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.tradingVolume !== undefined
                    ? formatCurrencyValue(
                        statistic.tradingVolume,
                        statisticCurrency //statistic.programCurrency
                      )
                    : "-"
                }
                displayType="text"
                suffix={` ${statisticCurrency}`} //statistic.programCurrency
              />
            </StatisticItem>
          </div>
          <div className={styles["details-statistics__column"]}>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.success-trades"
                  )}
                  labelText={t("asset-details.statistics.success-trades")}
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
                  labelText={t("asset-details.statistics.sharpe-ratio")}
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
                  labelText={t("asset-details.statistics.sortino-ratio")}
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
  statistic: ProgramChartStatistic;
}

export interface IProgramDetailsStatisticsElementsProps {
  status: string;
  period: ChartDefaultPeriod;
  data: IProgramStatisticData;
}

const ProgramDetailsStatisticsElements = React.memo(
  withBlurLoader(_ProgramDetailsStatisticsElements)
);
export default ProgramDetailsStatisticsElements;
