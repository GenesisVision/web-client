import "./level-tooltip.scss";

import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _LevelTooltip: React.FC<ILevelTooltip> = ({ t, level, canLevelUp }) => (
  <PopoverContent>
    <PopoverContentCardBlock>
      <div className="level-tooltip__level">
        {t("level-tooltip.genesis-level")} {level}
      </div>
      <StatisticItem
        condition={canLevelUp}
        accent
        label={t("level-tooltip.level-up")}
      >
        {t("level-tooltip.top10")}
      </StatisticItem>
    </PopoverContentCardBlock>
  </PopoverContent>
);

const LevelTooltip = translate()(React.memo(_LevelTooltip));
export default LevelTooltip;

export interface ILevelTooltip extends WithTranslation {
  level: number;
  canLevelUp: boolean;
}
