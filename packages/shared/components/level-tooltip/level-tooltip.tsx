import "./level-tooltip.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";

const _LevelTooltip: React.FC<ILevelTooltip> = ({ t, level, canLevelUp }) => (
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

const LevelTooltip = translate()(_LevelTooltip);
export default LevelTooltip;

export interface ILevelTooltip extends InjectedTranslateProps {
  level: number;
  canLevelUp: boolean;
}
