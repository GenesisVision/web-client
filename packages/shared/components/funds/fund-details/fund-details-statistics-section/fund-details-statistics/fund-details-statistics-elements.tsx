import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  ChartDefaultPeriod,
  ChartPeriodType
} from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

import { FundDetailsStatistic } from "../../services/fund-details.types";

const FundDetailsStatisticsElements: React.FC<
  IFundDetailsStatisticsElementsProps & InjectedTranslateProps
> = ({ t, statistic, period }) => (
  <>
    <div className="details-statistics__subheading">
      {t("fund-details-page.statistics.current")}
    </div>
    <div className="details-statistics__particular-information">
      <div className="details-statistics__vertical-info-block">
        <StatisticItem
          label={t("fund-details-page.statistics.balance")}
          labelTooltip={t("fund-details-page.tooltip.balance")}
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(statistic.balance, "GVT")}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </StatisticItem>
        <StatisticItem
          label={t("fund-details-page.statistics.start-day")}
          labelTooltip={t("fund-details-page.tooltip.start-day")}
        >
          {moment(statistic.creationDate).format("ll")}
        </StatisticItem>
      </div>
      <div className="details-statistics__vertical-info-block">
        <StatisticItem
          label={t("fund-details-page.statistics.investors")}
          labelTooltip={t("fund-details-page.tooltip.investors")}
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
          label={t("fund-details-page.statistics.calmarRatio")}
          labelTooltip={t("fund-details-page.tooltip.calmar-ratio")}
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
          labelTooltip={t("fund-details-page.tooltip.profit-change")}
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
          labelTooltip={t("fund-details-page.tooltip.max-drawdown")}
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
          labelTooltip={t("fund-details-page.tooltip.sharpe-ratio")}
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
          labelTooltip={t("fund-details-page.tooltip.sortino-ratio")}
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

export interface IFundDetailsStatisticsElementsProps {
  statistic: FundDetailsStatistic;
  period: ChartDefaultPeriod;
}

export default React.memo(translate()(FundDetailsStatisticsElements));
