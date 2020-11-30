import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { DetailsStatisticColumn } from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistic-column";
import { DetailsStatisticElement } from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistic-element";
import DetailsStatisticsElements from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics-elements";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import ProgramPeriodLine from "components/program-period/program-period-line/program-period-line";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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
  showPeriod = true,
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
          <Row wide>
            <RowItem wide>
              <LabeledValue
                label={
                  <TooltipLabel
                    tooltipContent={t("program-details-page:tooltip.equity")}
                    labelText={t("asset-details:statistics.equity")}
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
              </LabeledValue>
            </RowItem>
            {statistic.investors !== null && (
              <RowItem>
                <LabeledValue
                  label={
                    <TooltipLabel
                      tooltipContent={t(
                        "program-details-page:tooltip.investors"
                      )}
                      labelText={t("asset-details:statistics.investors")}
                    />
                  }
                >
                  <NumberFormat
                    value={statistic.investors}
                    thousandSeparator={" "}
                    displayType="text"
                  />
                </LabeledValue>
              </RowItem>
            )}
            {statistic.subscribers !== null && (
              <RowItem>
                <LabeledValue
                  label={
                    <TooltipLabel
                      tooltipContent={t(
                        "follow-details-page:tooltip.subscribers"
                      )}
                      labelText={t(
                        "follow-details-page:statistics.subscribers"
                      )}
                    />
                  }
                >
                  <NumberFormat
                    value={statistic.subscribers}
                    thousandSeparator={" "}
                    displayType="text"
                  />
                </LabeledValue>
              </RowItem>
            )}
          </Row>
          {showPeriod && !!statistic.lastPeriodStarts && (
            <Row onlyOffset wide>
              <Tooltip
                horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                render={() => (
                  <TooltipContent>
                    {t("program-details-page:tooltip.period")}
                  </TooltipContent>
                )}
              >
                <Text muted>{t("asset-details:statistics.period")}</Text>
              </Tooltip>
              <Row size={"small"} onlyOffset>
                <ProgramPeriodLine
                  start={statistic.lastPeriodStarts}
                  end={statistic.lastPeriodEnds}
                  status={status}
                />
              </Row>
            </Row>
          )}
        </>
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
                        statisticCurrency //statistic.programCurrency
                      )
                    : "-"
                }
                displayType="text"
                suffix={` ${statisticCurrency}`} //statistic.programCurrency
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

export interface IProgramStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: ProgramChartStatistic;
}

export interface IProgramDetailsStatisticsElementsProps {
  showPeriod?: boolean;
  status: string;
  period: ChartDefaultPeriod;
  data: IProgramStatisticData;
}

const ProgramDetailsStatisticsElements = React.memo(
  withBlurLoader(_ProgramDetailsStatisticsElements)
);
export default ProgramDetailsStatisticsElements;
