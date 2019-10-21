import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { FundProfitChart } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  ChartDefaultPeriod,
  ChartPeriodType
} from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { localizedDate } from "shared/utils/dates";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _FundDetailsStatisticsElements: React.FC<
  IFundDetailsStatisticsElementsProps
> = ({ period, data: { statisticCurrency, statistic } }) => {
  const [t] = useTranslation();
  return (
    <>
      <div className="details-statistics__subheading">
        {t("fund-details-page.statistics.current")}
      </div>
      <div className=" details-statistics__particular-information details-statistics__particular-information--current">
        <div className="details-statistics__vertical-info-block">
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.balance")}
                labelText={t("fund-details-page.statistics.balance")}
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
                tooltipContent={t("fund-details-page.tooltip.start-day")}
                labelText={t("fund-details-page.statistics.start-day")}
              />
            }
          >
            {localizedDate(statistic.creationDate)}
          </StatisticItem>
        </div>
        <div className="details-statistics__vertical-info-block">
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.investors")}
                labelText={t("fund-details-page.statistics.investors")}
              />
            }
          >
            <NumberFormat
              value={statistic.investors}
              thousandSeparator={" "}
              displayType="text"
            />
          </StatisticItem>
        </div>
      </div>
      <div className="details-statistics__subheading">
        {t("fund-details-page.statistics.for")}{" "}
        {t(`chart-period.${ChartPeriodType[period.type]}`)}
      </div>
      <div className="details-statistics__particular-information">
        <div className="details-statistics__column">
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.calmar-ratio")}
                labelText={t("fund-details-page.statistics.calmarRatio")}
              />
            }
            half
          >
            <NumberFormat
              value={
                statistic.calmarRatio !== null ? statistic.calmarRatio : "-"
              }
              displayType="text"
              decimalScale={2}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.profit-change")}
                labelText={t("fund-details-page.statistics.profit-change")}
              />
            }
            half
          >
            <NumberFormat
              value={
                statistic.profitChangePercent !== null
                  ? statistic.profitChangePercent
                  : "-"
              }
              displayType="text"
              suffix="%"
              decimalScale={2}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.max-drawdown")}
                labelText={t("fund-details-page.statistics.max-drawdown")}
              />
            }
            half
          >
            <NumberFormat
              value={
                statistic.maxDrawdown !== null ? statistic.maxDrawdown : "-"
              }
              displayType="text"
              suffix="%"
              decimalScale={2}
            />
          </StatisticItem>
        </div>
        <div className="details-statistics__column">
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.sharpe-ratio")}
                labelText={t("fund-details-page.statistics.sharpe-ratio")}
              />
            }
            half
          >
            <NumberFormat
              value={
                statistic.sharpeRatio !== null ? statistic.sharpeRatio : "-"
              }
              displayType="text"
              decimalScale={2}
            />
          </StatisticItem>

          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("fund-details-page.tooltip.sortino-ratio")}
                labelText={t("fund-details-page.statistics.sortino-ratio")}
              />
            }
            half
          >
            <NumberFormat
              value={
                statistic.sortinoRatio !== null ? statistic.sortinoRatio : "-"
              }
              displayType="text"
              decimalScale={2}
            />
          </StatisticItem>
        </div>
      </div>
    </>
  );
};

export interface IFundStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: FundProfitChart;
}

export interface IFundDetailsStatisticsElementsProps {
  period: ChartDefaultPeriod;
  data: IFundStatisticData;
}

const FundDetailsStatisticsElements = React.memo(
  withBlurLoader(_FundDetailsStatisticsElements)
);
export default FundDetailsStatisticsElements;
