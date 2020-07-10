import { LabeledValue } from "components/labeled-value/labeled-value";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { Text } from "components/text/text";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import styles from "./level-tooltip.module.scss";

const _LevelTooltip: React.FC<ILevelTooltip> = ({ t, level, canLevelUp }) => (
  <PopoverContent>
    <PopoverContentCardBlock>
      <div className={styles["level-tooltip__level"]}>
        {t("level-tooltip.genesis-level")} {level}
      </div>
      {canLevelUp && (
        <LabeledValue label={t("level-tooltip.level-up")}>
          <Text weight={"bold"} size={"large"}>
            {t("level-tooltip.top10")}
          </Text>
        </LabeledValue>
      )}
    </PopoverContentCardBlock>
  </PopoverContent>
);

const LevelTooltip = translate()(React.memo(_LevelTooltip));
export default LevelTooltip;

export interface ILevelTooltip extends WithTranslation {
  level: number;
  canLevelUp: boolean;
}
