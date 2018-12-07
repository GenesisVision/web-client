import "./level-tooltip.scss";

import React from "react";
import { translate } from "react-i18next";

import StatisticItem from "../statistic-item/statistic-item";

const LevelTooltip = ({ t, level, canLevelUp }) => (
  <div className="level-tooltip">
    <div className="level-tooltip__level">
      {t("level-tooltip.genesis-level")} {level}
    </div>
    {canLevelUp && (
      <StatisticItem accent label={t("level-tooltip.level-up")}>
        {t("level-tooltip.top10")}
      </StatisticItem>
    )}
  </div>
);
export default translate()(LevelTooltip);
