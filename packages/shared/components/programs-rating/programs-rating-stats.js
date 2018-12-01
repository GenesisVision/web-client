import "./programs-rating.scss";

import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";
import Profitability from "shared/components/profitability/profitability";

const ProgramsRatingStats = ({ t, levelData }) => {
  return (
    <div className="programs-rating-stats">
      <StatisticItem big accent label={t("rating.programCounts")}>
        <NumberFormat value={levelData.total} displayType="text" />
      </StatisticItem>
      <StatisticItem big accent label={t("rating.quota")}>
        <NumberFormat value={levelData.quota} displayType="text" />
      </StatisticItem>
      <StatisticItem big accent label={t("rating.currentProfit")}>
        <Profitability value={levelData.targetProfit} prefix="sign">
          <NumberFormat
            value={formatValue(levelData.targetProfit, 2)}
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
