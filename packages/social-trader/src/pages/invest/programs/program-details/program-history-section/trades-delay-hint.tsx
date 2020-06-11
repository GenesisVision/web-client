import styles from "components/details/details-description-section/details-statistic-section/details-history/trades.module.scss";
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

const _TradesDelayHint: React.FC<{ delay: TradesDelay }> = ({ delay }) => {
  const [t] = useTranslation();
  if (delay === "None") return null;
  const label = DELAYS_LABELS[delay];
  return (
    <RowItem>
      <Text muted>
        <Row>
          <RowItem small>
            {label} {t("program-details-page.history.open-positions.delay")}
          </RowItem>
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
            render={() => (
              <TooltipContent small>
                {t(
                  "program-details-page.history.open-positions.delay-tooltip",
                  {
                    delay: label
                  }
                )}
              </TooltipContent>
            )}
          >
            <div className={styles["details-trades__delay-question"]}>?</div>
          </Tooltip>
        </Row>
      </Text>
    </RowItem>
  );
};
export const TradesDelayHint = React.memo(_TradesDelayHint);
