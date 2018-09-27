import "./program-details-statistics.scss";

import ProgramPeriodLine from "components/program-period/program-period-line/program-period-line";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

const ProgramDetailsStatistics = ({ t, statistic, sharpeRatio }) => (
  <div className="program-details-statistics">
    <div className="program-details-statistics__heading">
      {t("program-details-page.statistics.heading")}
    </div>
    <div className="program-details-statistics__balance">
      <span className="program-details-statistics__subheading">
        {t("program-details-page.statistics.balance")}
      </span>
      <span className="program-details-statistics__value">
        <NumberFormat
          value={statistic.pnL}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
      </span>
    </div>

    <div className="program-details-statistics__particular-information">
      <div className="program-details-statistics__item">
        <span className="program-details-statistics__subheading">
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

      <div className="program-details-statistics__item">
        <span className="program-details-statistics__subheading">
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

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.success-trades")}
        </span>
        <span className="program-details-statistics__value">
          <NumberFormat
            value={statistic.successTradesPercent}
            displayType="text"
            suffix="%"
          />
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.profit-factor")}
        </span>
        <span className="program-details-statistics__value">
          <NumberFormat
            value={statistic.profitFactor}
            displayType="text"
            suffix="%"
            decimalScale={2}
          />
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.sharpe-ratio")}
        </span>
        <span className="program-details-statistics__value">
          <NumberFormat
            value={sharpeRatio}
            displayType="text"
            suffix="%"
            decimalScale={2}
          />
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.max-drawdown")}
        </span>
        <span className="program-details-statistics__value">
          <NumberFormat
            value={statistic.maxDrawdown}
            displayType="text"
            suffix="%"
            decimalScale={2}
          />
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.start-day")}
        </span>
        <span className="program-details-statistics__value">
          {moment(statistic.periodStarts).format("D MMM YYYY")}
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.period-end")}
        </span>
        <span className="program-details-statistics__value">
          {moment(statistic.periodEnds).format("D MMM YYYY")}
        </span>
      </div>

      <div className="program-details-statistics__period">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.period")}
        </span>
        <ProgramPeriodLine
          start={statistic.periodStarts}
          end={statistic.periodEnds}
        />
      </div>
    </div>
  </div>
);

export default translate()(ProgramDetailsStatistics);
