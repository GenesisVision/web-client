import "./program-details-statistics.scss";

import { ChartPeriodType } from "shared/components/chart/chart-period/chart-period.helpers";
import ProgramPeriodLine from "shared/components/program-period/program-period-line/program-period-line";
import Surface from "shared/components/surface/surface";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "shared/utils/formatter";

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
    <Surface className="program-details-statistics">
      <div className="program-details-statistics__heading">
        {t("program-details-page.statistics.heading")}
      </div>
      <div className="program-details-statistics__subheading">
        {t("program-details-page.statistics.current")}
      </div>
      <div className="program-details-statistics__particular-information">
        <div className="program-details-statistics__vertical-info-block">
          <div className="program-details-statistics__item">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.balance")}
            </span>
            <span className="program-details-statistics__value">
              <NumberFormat
                value={formatValue(profitChart.balance)}
                thousandSeparator={" "}
                displayType="text"
                suffix={` ${profitChart.programCurrency}`}
              />
            </span>
          </div>
          <div className="program-details-statistics__item program-details-statistics__item--secondary">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.start-day")}
            </span>
            <span className="program-details-statistics__value">
              {moment(statistic.periodStarts).format("D MMM YYYY")}
            </span>
          </div>
        </div>
        <div className="program-details-statistics__vertical-info-block">
          <div className="program-details-statistics__item">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.investors")}
            </span>
            <span className="program-details-statistics__value">
              <NumberFormat
                value={statistic.investors}
                thousandSeparator={" "}
                displayType="text"
              />
            </span>
          </div>
          <div className="program-details-statistics__item program-details-statistics__item--secondary">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.period-end")}
            </span>
            <span className="program-details-statistics__value">
              {moment(statistic.periodEnds).format("D MMM YYYY")}
            </span>
          </div>
        </div>

        <div className="program-details-statistics__period">
          <span className="program-details-statistics__label">
            {t("program-details-page.statistics.period")}
          </span>
          <ProgramPeriodLine
            start={statistic.periodStarts}
            end={statistic.periodEnds}
          />
        </div>
      </div>

      <div className="program-details-statistics__subheading">
        {t("program-details-page.statistics.for")}{" "}
        {t(`chart-period.${ChartPeriodType[period.type]}`)}
      </div>

      <div className="program-details-statistics__particular-information">
        <div className="program-details-statistics__column">
          <div className="program-details-statistics__item program-details-statistics__item--half">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.trades")}
            </span>
            <span className="program-details-statistics__value">
              <NumberFormat
                value={statistic.trades}
                thousandSeparator={" "}
                displayType="text"
              />
            </span>
          </div>

          <div className="program-details-statistics__item program-details-statistics__item--half program-details-statistics__item--secondary">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.profit-factor")}
            </span>
            <span className="program-details-statistics__value">
              <NumberFormat
                value={
                  statistic.profitFactor !== undefined
                    ? statistic.profitFactor
                    : "-"
                }
                displayType="text"
                decimalScale={2}
              />
            </span>
          </div>

          <div className="program-details-statistics__item program-details-statistics__item--half program-details-statistics__item--secondary">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.max-drawdown")}
            </span>
            <span className="program-details-statistics__value">
              <NumberFormat
                value={
                  statistic.maxDrawdown !== null ? statistic.maxDrawdown : "-"
                }
                displayType="text"
                suffix="%"
                decimalScale={2}
              />
            </span>
          </div>
        </div>

        <div className="program-details-statistics__column">
          <div className="program-details-statistics__item program-details-statistics__item--half program-details-statistics__item--secondary">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.success-trades")}
            </span>
            <span className="program-details-statistics__value">
              <NumberFormat
                value={
                  statistic.successTradesPercent !== null
                    ? statistic.successTradesPercent
                    : "-"
                }
                decimalScale={2}
                displayType="text"
                suffix="%"
              />
            </span>
          </div>

          <div className="program-details-statistics__item program-details-statistics__item--half program-details-statistics__item--secondary">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.sharpe-ratio")}
            </span>
            <span className="program-details-statistics__value">
              <NumberFormat
                value={
                  statistic.sharpeRatio !== null ? statistic.sharpeRatio : "-"
                }
                displayType="text"
                decimalScale={2}
              />
            </span>
          </div>

          <div className="program-details-statistics__item program-details-statistics__item--half program-details-statistics__item--secondary">
            <span className="program-details-statistics__label">
              {t("program-details-page.statistics.sortino-ratio")}
            </span>
            <span className="program-details-statistics__value">
              <NumberFormat
                value={
                  statistic.sortinoRatio !== null ? statistic.sortinoRatio : "-"
                }
                displayType="text"
                decimalScale={2}
              />
            </span>
          </div>
        </div>
      </div>
    </Surface>
  );
};

export default translate()(ProgramDetailsStatistics);
