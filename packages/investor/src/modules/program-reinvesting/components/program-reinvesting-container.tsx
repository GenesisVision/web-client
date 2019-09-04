import classNames from "classnames";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import useIsOpen from "shared/hooks/is-open.hook";

import { toggleReinvesting } from "../services/program-reinvesting.service";

const _ProgramReinvestingContainer: React.FC<Props> = ({
  service: { dispatchProgramDescription },
  isReinvesting: propIsReinvesting,
  programId
}) => {
  const [t] = useTranslation();
  const [isPending, setIsPending, setNotIsPending] = useIsOpen();
  const [isReinvesting, setIs, setNotIs, setIsReinvestingValue] = useIsOpen(
    propIsReinvesting
  );
  const onReinvestingLabelClick = useCallback(
    () => {
      setIsPending();
      setIsReinvestingValue(!isReinvesting);
      toggleReinvesting(programId, !isReinvesting)
        .then(dispatchProgramDescription)
        .catch(() => setIsReinvestingValue(isReinvesting))
        .finally(setNotIsPending);
    },
    [
      setIsPending,
      setIsReinvestingValue,
      isReinvesting,
      programId,
      dispatchProgramDescription,
      setNotIsPending
    ]
  );
  return (
    <span
      className={classNames("reinvesting-widget", {
        "reinvesting-widget--active": isReinvesting
      })}
      onClick={onReinvestingLabelClick}
    >
      <GVSwitch
        name="reinvesting"
        touched={false}
        value={isReinvesting}
        color="primary"
        onChange={onReinvestingLabelClick}
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
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends IProgramReinvestingContainerOwnProps, DispatchProps {}

const ProgramReinvestingContainer = compose<
  React.ComponentType<IProgramReinvestingContainerOwnProps>
>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramReinvestingContainer);
export default ProgramReinvestingContainer;
