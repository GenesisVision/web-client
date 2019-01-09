import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import moment from "moment";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { ChartPeriodType } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";

const FundDetailsStatisticsElements = ({ t, statistic, period }) => (
  <Fragment>
    <div className="details-statistics__subheading">
      {t("fund-details-page.statistics.current")}
    </div>
    <div className="details-statistics__particular-information">
      <div className="details-statistics__vertical-info-block">
        <StatisticItem label={t("fund-details-page.statistics.balance")} accent>
          <NumberFormat
            value={statistic.balance}
            thousandSeparator={" "}
            displayType="text"
            decimalScale={2}
            suffix={" GVT"}
          />
        </StatisticItem>
        <StatisticItem label={t("fund-details-page.statistics.start-day")}>
          {moment(statistic.creationDate).format("D MMM YYYY")}
        </StatisticItem>
      </div>
      <div className="details-statistics__vertical-info-block">
        <StatisticItem label={t("fund-details-page.statistics.investors")}>
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
          label={t("fund-details-page.statistics.calmarRatio")}
          half
        >
          <NumberFormat
            value={statistic.calmarRatio !== null ? statistic.calmarRatio : "-"}
            displayType="text"
            decimalScale={2}
          />
        </StatisticItem>
        <StatisticItem
          label={t("fund-details-page.statistics.profit-change")}
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
          label={t("fund-details-page.statistics.max-drawdown")}
          half
        >
          <NumberFormat
            value={statistic.maxDrawdown !== null ? statistic.maxDrawdown : "-"}
            displayType="text"
            suffix="%"
            decimalScale={2}
          />
        </StatisticItem>
      </div>
      <div className="details-statistics__column">
        <StatisticItem
          label={t("fund-details-page.statistics.sharpe-ratio")}
          half
        >
          <NumberFormat
            value={statistic.sharpeRatio !== null ? statistic.sharpeRatio : "-"}
            displayType="text"
            decimalScale={2}
          />
        </StatisticItem>

        <StatisticItem
          label={t("fund-details-page.statistics.sortino-ratio")}
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
  </Fragment>
);

export default translate()(FundDetailsStatisticsElements);
