import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { TradesDelay } from "gv-api-web";
import { DELAYS_LABELS } from "pages/invest/programs/program-details/program-history-section/program-open-positions/program-open-positions.helpers";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { $labelColor } from "utils/style/colors";

const Question = styled.div`
  cursor: help;
  box-sizing: border-box;
  font-weight: 800;
  line-height: 15px;
  text-align: center;
  font-size: 8px;
  border: 1px solid ${$labelColor};
  border-radius: 50%;
  width: 15px;
  height: 15px;
`;

const _TradesDelayHint: React.FC<{ delay: TradesDelay }> = ({ delay }) => {
  const [t] = useTranslation();
  if (delay === "None") return null;
  const label = DELAYS_LABELS[delay];
  return (
    <RowItem>
      <Text muted>
        <Row>
          <RowItem size={"small"}>
            {label} {t("program-details-page:history.open-positions.delay")}
          </RowItem>
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
            render={() => (
              <TooltipContent small>
                {t(
                  "program-details-page:history.open-positions.delay-tooltip",
                  {
                    delay: label
                  }
                )}
              </TooltipContent>
            )}
          >
            <Question>?</Question>
          </Tooltip>
        </Row>
      </Text>
    </RowItem>
  );
};
export const TradesDelayHint = React.memo(_TradesDelayHint);
