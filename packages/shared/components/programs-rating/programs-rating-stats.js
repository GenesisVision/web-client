import "./programs-rating-stats.scss";

import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";
import Profitability from "shared/components/profitability/profitability";

const ProgramsRatingStats = ({ t, rating }) => {
  return (
    <div className="programs-rating-stats">
      <StatisticItem big accent label={t("rating.programCounts")}>
        <NumberFormat value={rating.programCounts} displayType="text" />
      </StatisticItem>
      <StatisticItem big accent label={t("rating.quota")}>
        <NumberFormat value={rating.quota} displayType="text" />
      </StatisticItem>
      <StatisticItem big accent label={t("rating.currentProfit")}>
        <Profitability value={rating.currentProfit} prefix="sign">
          <NumberFormat
            value={formatValue(rating.currentProfit, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </StatisticItem>
    </div>
  );
};

export default compose(translate())(ProgramsRatingStats);
