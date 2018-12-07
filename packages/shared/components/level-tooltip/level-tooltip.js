import "./level-tooltip.scss";

import React from "react";
import { translate } from "react-i18next";

import StatisticItem from "../statistic-item/statistic-item";

const LevelTooltip = ({ t, level, canLevelUp }) => (
  <div className="level-tooltip">
    <div className="level-tooltip__level">Genesis level {level}</div>
    {canLevelUp && <StatisticItem label={"Level Up"}>Top 10%</StatisticItem>}
  </div>
);
export default translate()(LevelTooltip);
