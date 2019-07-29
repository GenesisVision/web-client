import classNames from "classnames";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import useIsOpen from "shared/hooks/is-open.hook";

import { toggleReinvesting } from "../services/program-reinvesting.service";

const _ProgramReinvestingContainer: React.FC<Props> = ({
  t,
  isReinvesting: propIsReinvesting,
  programId
}) => {
  const [isPending, setIsPending, setNotIsPending] = useIsOpen();
  const [isReinvesting, setIs, setNotIs, setIsReinvestingValue] = useIsOpen(
    propIsReinvesting
  );
  const onReinvestingLabelClick = useCallback(
    (updateDescription: () => void) => () => {
      setIsPending();
      setIsReinvestingValue(!isReinvesting);
      toggleReinvesting(programId, !isReinvesting)
        .then(updateDescription)
        .catch(() => setIsReinvestingValue(isReinvesting))
        .finally(setNotIsPending);
    },
    [programId, isReinvesting]
  );
  return (
    <ProgramDetailContext.Consumer>
      {({ updateDescription }: IProgramDetailContext) => (
        <span
          className={classNames("reinvesting-widget", {
            "reinvesting-widget--active": isReinvesting
          })}
          onClick={onReinvestingLabelClick(updateDescription)}
        >
          <GVSwitch
            name="reinvesting"
            touched={false}
            value={isReinvesting}
            color="primary"
            onChange={onReinvestingLabelClick(updateDescription)}
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.reinvest")}
                labelText={t("program-details-page.description.reinvest")}
                className="tooltip__label--cursor-pointer"
              />
            }
            disabled={isPending}
          />
        </span>
      )}
    </ProgramDetailContext.Consumer>
  );
};

const ProgramReinvestingContainer = translate()(
  React.memo(_ProgramReinvestingContainer)
);
export default ProgramReinvestingContainer;

interface Props extends IProgramReinvestingContainerOwnProps, WithTranslation {}
