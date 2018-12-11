import "./programs-rating.scss";

import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import StatisticRatingItem from "shared/components/statistic-rating-item/statistic-rating-item";
import { formatValue } from "shared/utils/formatter";

const ProgramsRatingStats = ({ t, levelData }) => (
  <div className="programs-rating-stats">
    <StatisticRatingItem ellipse label={t("rating-page.programCounts")}>
      <NumberFormat value={levelData.total} displayType="text" />
    </StatisticRatingItem>
    <StatisticRatingItem ellipse label={t("rating-page.quota")}>
      <NumberFormat value={levelData.quota} displayType="text" />
    </StatisticRatingItem>
    <StatisticRatingItem label={t("rating-page.currentProfit")}>
      <Profitability
        value={levelData.targetProfit}
        variant="chips"
        prefix="arrow"
      >
        <NumberFormat
          value={formatValue(levelData.targetProfit, 2)}
          suffix="%"
          allowNegative={false}
          displayType="text"
        />
      </Profitability>
    </StatisticRatingItem>
  </div>
);

export default compose(translate())(ProgramsRatingStats);
