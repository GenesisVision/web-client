import { TradesViewModelTradesDelayEnum } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";

import { DELAYS_LABELS } from "./program-open-positions/program-open-positions";

const _TradesDelayHint: React.FC<{ delay: TradesViewModelTradesDelayEnum }> = ({
  delay
}) => {
  const [t] = useTranslation();
  return delay !== "None" ? (
    <>
      <div className="details-trades__delay-hint">
        {DELAYS_LABELS[delay]}{" "}
        {t("program-details-page.history.open-positions.delay")}
      </div>
      <Tooltip
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        render={() => (
          <div className="details-trades__delay-tooltip">
            {t("program-details-page.history.open-positions.delay-tooltip", {
              delay
            })}
          </div>
        )}
      >
        <div className="details-trades__delay-question">?</div>
      </Tooltip>
    </>
  ) : null;
};
export const TradesDelayHint = React.memo(_TradesDelayHint);
