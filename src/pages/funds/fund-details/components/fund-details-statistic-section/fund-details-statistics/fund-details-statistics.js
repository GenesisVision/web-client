import "./fund-details-statistics.scss";

import { ChartPeriodType } from "components/chart/chart-period/chart-period.helpers";
// import ProgramPeriodLine from "components/program-period/program-period-line/program-period-line";
import Surface from "components/surface/surface";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

const FundDetailsStatistics = ({ t, statisticData, period }) => {
  const { data: statistic, isPending } = statisticData;
  if (!statistic || isPending) return null;
  return (
    <Surface className="fund-details-statistics">
      <div className="fund-details-statistics__heading">
        {t("fund-details-page.statistics.heading")}
      </div>
      <div className="fund-details-statistics__subheading">
        {t("fund-details-page.statistics.current")}
      </div>
      <div className="fund-details-statistics__particular-information">
        <div className="fund-details-statistics__vertical-info-block">
          <div className="fund-details-statistics__item">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.balance")}
            </span>
            <span className="fund-details-statistics__value fund-details-statistics__value--accent">
              <NumberFormat
                value={statistic.balance}
                thousandSeparator={" "}
                displayType="text"
                decimalScale={2}
                suffix={" GVT"}
              />
            </span>
          </div>
          <div className="fund-details-statistics__item fund-details-statistics__item--secondary">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.start-day")}
            </span>
            <span className="fund-details-statistics__value">
              {moment(statistic.periodStarts).format("D MMM YYYY")}
            </span>
          </div>
        </div>
        <div className="fund-details-statistics__vertical-info-block">
          <div className="fund-details-statistics__item">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.investors")}
            </span>
            <span className="fund-details-statistics__value">
              <NumberFormat
                value={statistic.investors}
                thousandSeparator={" "}
                displayType="text"
              />
            </span>
          </div>
         {/* <div className="fund-details-statistics__item fund-details-statistics__item--secondary">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.period-end")}
            </span>
            <span className="fund-details-statistics__value">
              {moment(statistic.periodEnds).format("D MMM YYYY")}
            </span>
          </div>*/}
        </div>
      </div>

      {/*<div className="fund-details-statistics__period">
        <span className="fund-details-statistics__label">
          {t("fund-details-page.statistics.period")}
        </span>
        <ProgramPeriodLine
          start={statistic.periodStarts}
          end={statistic.periodEnds}
        />
      </div>*/}
      <div className="fund-details-statistics__subheading">
        {t("fund-details-page.statistics.for")}{" "}
        {t(`chart-period.${ChartPeriodType[period.type]}`)}
      </div>

      <div className="fund-details-statistics__particular-information">
        <div className="fund-details-statistics__column">
          <div className="fund-details-statistics__item fund-details-statistics__item--half fund-details-statistics__item--secondary">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.calmarRatio")}
            </span>
            <span className="fund-details-statistics__value">
              <NumberFormat
                value={statistic.calmarRatio}
                displayType="text"
                decimalScale={2}
              />
            </span>
          </div>

          <div className="fund-details-statistics__item fund-details-statistics__item--half fund-details-statistics__item--secondary">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.profit-change")}
            </span>
            <span className="fund-details-statistics__value">
              <NumberFormat
                value={statistic.profitChangePercent}
                displayType="text"
                suffix="%"
                decimalScale={2}
              />
            </span>
          </div>

          <div className="fund-details-statistics__item fund-details-statistics__item--half fund-details-statistics__item--secondary">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.max-drawdown")}
            </span>
            <span className="fund-details-statistics__value">
              <NumberFormat
                value={statistic.maxDrawdown}
                displayType="text"
                suffix="%"
                decimalScale={2}
              />
            </span>
          </div>
        </div>

        <div className="fund-details-statistics__column">
          {/*<div className="fund-details-statistics__item fund-details-statistics__item--half fund-details-statistics__item--secondary">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.rebalances")}
            </span>
            <span className="fund-details-statistics__value">
              <NumberFormat
                value={statistic.rebalances}
                decimalScale={2}
                displayType="text"
              />
            </span>
          </div>*/}

          <div className="fund-details-statistics__item fund-details-statistics__item--half fund-details-statistics__item--secondary">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.sharpe-ratio")}
            </span>
            <span className="fund-details-statistics__value">
              <NumberFormat
                value={statistic.sharpeRatio}
                displayType="text"
                decimalScale={2}
              />
            </span>
          </div>

          <div className="fund-details-statistics__item fund-details-statistics__item--half fund-details-statistics__item--secondary">
            <span className="fund-details-statistics__label">
              {t("fund-details-page.statistics.sortino-ratio")}
            </span>
            <span className="fund-details-statistics__value">
              <NumberFormat
                value={statistic.sortinoRatio}
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

export default translate()(FundDetailsStatistics);
