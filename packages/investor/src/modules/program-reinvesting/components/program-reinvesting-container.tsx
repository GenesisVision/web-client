import classNames from "classnames";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";

import { toggleReinvesting } from "../services/program-reinvesting.service";

const _ProgramReinvestingContainer: React.FC<Props> = ({
  service: { dispatchProgramDescription },
  isReinvesting: propIsReinvesting,
  programId
}) => {
  const [t] = useTranslation();
  const [isReinvesting, setIs, setNotIs, setIsReinvestingValue] = useIsOpen(
    propIsReinvesting
  );
  const { isPending, sendRequest } = useApiRequest({
    request: toggleReinvesting,
    catchCallback: () => setIsReinvestingValue(isReinvesting)
  });
  const onReinvestingLabelClick = useCallback(
    () =>
      sendRequest({ programId, isReinvesting: !isReinvesting }).then(() => {
        setIsReinvestingValue(!isReinvesting);
        dispatchProgramDescription();
      }),
    [programId, isReinvesting]
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
