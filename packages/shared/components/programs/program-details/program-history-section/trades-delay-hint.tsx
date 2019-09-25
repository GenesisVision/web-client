import Tooltip from "shared/components/tooltip/tooltip";
import React from "react";
import { DELAYS_LABELS } from "./program-open-positions/program-open-positions";
import { useTranslation } from "react-i18next";
import { TradesViewModelTradesDelayEnum } from "gv-api-web";

const _TradesDelayHint: React.FC<{ delay: TradesViewModelTradesDelayEnum }> = ({
  delay
}) => {
  const [t] = useTranslation();
  return (
    <>
      {delay !== "None" && (
        <Tooltip
          render={() => (
            <div>
              {t("program-details-page.history.open-positions.delay-tooltip", {
                delay
              })}
            </div>
          )}
        >
          <div className="details-trades__delay-hint">
            {DELAYS_LABELS[delay]}{" "}
            {t("program-details-page.history.open-positions.delay")}
          </div>
        </Tooltip>
      )}
    </>
  );
};
export const TradesDelayHint = React.memo(_TradesDelayHint);
