import { LabeledValue } from "components/labeled-value/labeled-value";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { Text } from "components/text/text";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { $primaryColor } from "utils/style/colors";
import { adaptivePadding, fontSize } from "utils/style/mixins";
import { $paddingXxsmall } from "utils/style/sizes";

export interface ILevelTooltip {
  level: number;
  canLevelUp: boolean;
}

const Level = styled.div`
  ${adaptivePadding("bottom", $paddingXxsmall)};
  ${fontSize(16)};
  font-weight: 800;
  color: ${$primaryColor};
  letter-spacing: 0.23px;

  &:last-child {
    padding-bottom: 0;
  }
`;

const _LevelTooltip: React.FC<ILevelTooltip> = ({ level, canLevelUp }) => {
  const [t] = useTranslation();
  return (
    <PopoverContent>
      <PopoverContentCardBlock>
        <Level>
          {t("level-tooltip.genesis-level")} {level}
        </Level>
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
};

const LevelTooltip = React.memo(_LevelTooltip);
export default LevelTooltip;
