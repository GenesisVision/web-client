import "./program-details-statistics.scss";

import Surface from "components/surface/surface";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

const ProgramDetailsStatistics = ({ t, statistic }) => (
  <Surface className="program-details-statistics">
    <h2 className="program-details-statistics__heading">
      {t("program-details-page.statistics.title")}
    </h2>
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
          {t("program-details-page.statistics.succesTrades")}
        </span>
        <span className="program-details-statistics__value">
          {statistic.successTrades} %
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.profitFactor")}
        </span>
        <span className="program-details-statistics__value">
          {statistic.profitFactor} %
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.sharpeRatio")}
        </span>
        <span className="program-details-statistics__value">
          {statistic.sharpeRatio} %
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.maxDrawdown")}
        </span>
        <span className="program-details-statistics__value">
          {statistic.maxDrawdown} %
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.startDay")}
        </span>
        <span className="program-details-statistics__value">
          {moment(statistic.periodStarts).format("D MMM YYYY")}
        </span>
      </div>

      <div className="program-details-statistics__item program-details-statistics__item--secondary">
        <span className="program-details-statistics__subheading">
          {t("program-details-page.statistics.periodEnd")}
        </span>
        <span className="program-details-statistics__value">
          {moment(statistic.periodEnds).format("D MMM YYYY")}
        </span>
      </div>
    </div>
  </Surface>
);

export default translate()(ProgramDetailsStatistics);
