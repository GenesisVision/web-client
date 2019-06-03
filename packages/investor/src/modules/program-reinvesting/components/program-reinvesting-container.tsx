import classnames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import Tooltip from "shared/components/tooltip/tooltip";

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
                <Tooltip
                  horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                  render={() => (
                    <div className="tooltip__content">
                      {t("program-details-page.tooltip.reinvest")}
                    </div>
                  )}
                >
                  <span>{t("program-details-page.description.reinvest")}</span>
                </Tooltip>
              }
              disabled={isPending}
            />
          </span>
        )}
      </ProgramDetailContext.Consumer>
    );
  }
}

const ProgramReinvestingContainer = React.memo(
  translate()(_ProgramReinvestingContainer)
);
export default ProgramReinvestingContainer;

interface Props
  extends IProgramReinvestingContainerOwnProps,
    InjectedTranslateProps {}

interface State {
  isReinvesting: boolean;
  isPending: boolean;
}
