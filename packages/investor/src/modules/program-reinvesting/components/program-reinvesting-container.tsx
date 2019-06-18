import classnames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";

import { toggleReinvesting } from "../services/program-reinvesting.service";

class _ProgramReinvestingContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isReinvesting: props.isReinvesting,
      isPending: false
    };
  }
  toggleReinvesting = (updateDetails: () => void) => (value: boolean) => {
    const { programId } = this.props;
    this.setState({ isPending: true, isReinvesting: value });
    toggleReinvesting(programId, value)
      .then(() => {
        this.setState({ isPending: false });
        updateDetails();
      })
      .catch(() => {
        this.setState({ isPending: false, isReinvesting: !value });
      });
  };

  onReinvestingLabelClick = (updateDetails: () => void) => () =>
    this.toggleReinvesting(updateDetails)(!this.state.isReinvesting);

  render() {
    const { t } = this.props;
    const { isReinvesting, isPending } = this.state;
    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: IProgramDetailContext) => (
          <span
            className={classnames("reinvesting-widget", {
              "reinvesting-widget--active": isReinvesting
            })}
            onClick={this.onReinvestingLabelClick(updateDetails)}
          >
            <GVSwitch
              name="reinvesting"
              touched={false}
              value={isReinvesting}
              color="primary"
              onChange={this.onReinvestingLabelClick(updateDetails)}
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
  }
}

const ProgramReinvestingContainer = translate()(
  React.memo(_ProgramReinvestingContainer)
);
export default ProgramReinvestingContainer;

interface Props
  extends IProgramReinvestingContainerOwnProps,
    InjectedTranslateProps {}

interface State {
  isReinvesting: boolean;
  isPending: boolean;
}
