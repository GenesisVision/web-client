import "./programs-rating.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import StatisticRatingItem from "shared/components/statistic-rating-item/statistic-rating-item";
import { formatValue } from "shared/utils/formatter";

const _ProgramsRatingStats: React.FC<Props> = ({ t, levelData }) => (
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
        variant={PROFITABILITY_VARIANT.CHIPS}
        prefix={PROFITABILITY_PREFIX.ARROW}
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

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  levelData: any;
}

const ProgramsRatingStats = compose<React.ComponentType<OwnProps>>(
  React.memo,
  translate()
)(_ProgramsRatingStats);
export default ProgramsRatingStats;
