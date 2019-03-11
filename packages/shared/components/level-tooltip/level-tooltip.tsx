import "./level-tooltip.scss";

import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";

interface ILevelTooltip {
  level: string;
  canLevelUp: boolean;
}

const LevelTooltip: React.FC<ILevelTooltip & WithTranslation> = ({
  t,
  level,
  canLevelUp
}) => (
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
export default withTranslation()(LevelTooltip);
