import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { ChartPeriodType } from "shared/components/chart/chart-period/chart-period.helpers";
import ProgramPeriodLine from "shared/components/program-period/program-period-line/program-period-line";
import Surface from "shared/components/surface/surface";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "shared/utils/formatter";
import DetailsStatisticItem from "../../../../details-statistic-item/details-statistic-item";

const ProgramDetailsStatistics = ({
  t,
  statisticData,
  profitChartData,
  period
}) => {
  const { data: statistic, isPendingStatistic } = statisticData;
  const { data: profitChart, isPendingProfitChart } = profitChartData;

  if (!statistic || isPendingStatistic || isPendingProfitChart) return null;
  return (
    <Surface className="details-statistics">
      <div className="details-statistics__heading">
        {t("program-details-page.statistics.heading")}
      </div>
      <div className="details-statistics__subheading">
        {t("program-details-page.statistics.current")}
      </div>
      <div className="details-statistics__particular-information">
        <DetailsStatisticItem
          label={t("program-details-page.statistics.balance")}
          accent
        >
          <NumberFormat
            value={formatValue(profitChart.balance)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${profitChart.programCurrency}`}
          />
        </DetailsStatisticItem>
        <DetailsStatisticItem
          label={t("program-details-page.statistics.investors")}
        >
          <NumberFormat
            value={statistic.investors}
            thousandSeparator={" "}
            displayType="text"
          />
        </DetailsStatisticItem>
        <div className="details-statistics__period">
          <span className="details-statistics__label">
            {t("program-details-page.statistics.period")}
          </span>
          <ProgramPeriodLine
            start={statistic.periodStarts}
            end={statistic.periodEnds}
          />
        </div>
      </div>

      <div className="details-statistics__subheading">
        {t("program-details-page.statistics.for")}{" "}
        {t(`chart-period.${ChartPeriodType[period.type]}`)}
      </div>

      <div className="details-statistics__particular-information">
        <div className="details-statistics__column">
          <DetailsStatisticItem
            label={t("program-details-page.statistics.trades")}
            half
          >
            <NumberFormat
              value={statistic.trades !== undefined ? statistic.trades : "-"}
              thousandSeparator={" "}
              displayType="text"
            />
          </DetailsStatisticItem>
          <DetailsStatisticItem
            label={t("program-details-page.statistics.profit-factor")}
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
          </DetailsStatisticItem>
          <DetailsStatisticItem
            label={t("program-details-page.statistics.max-drawdown")}
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
          </DetailsStatisticItem>
        </div>

        <div className="details-statistics__column">
          <DetailsStatisticItem
            label={t("program-details-page.statistics.success-trades")}
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
          </DetailsStatisticItem>
          <DetailsStatisticItem
            label={t("program-details-page.statistics.sharpe-ratio")}
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
          </DetailsStatisticItem>
          <DetailsStatisticItem
            label={t("program-details-page.statistics.sortino-ratio")}
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
          </DetailsStatisticItem>
        </div>
      </div>
    </Surface>
  );
};

export default translate()(ProgramDetailsStatistics);
