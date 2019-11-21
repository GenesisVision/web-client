import "./level-tooltip.scss";

import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _LevelTooltip: React.FC<ILevelTooltip> = ({ t, level, canLevelUp }) => (
  <div className="level-tooltip">
    <div className="level-tooltip__level">
      {t("level-tooltip.genesis-level")} {level}
    </div>
    <StatisticItem
      condition={!!canLevelUp}
      accent
      label={t("level-tooltip.level-up")}
    >
      {t("level-tooltip.top10")}
    </StatisticItem>
  </div>
);

const LevelTooltip = translate()(React.memo(_LevelTooltip));
export default LevelTooltip;

export interface ILevelTooltip extends WithTranslation {
  level: number;
  canLevelUp: boolean;
}
