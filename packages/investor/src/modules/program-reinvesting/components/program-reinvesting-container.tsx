import classnames from "classnames";
import { GVSwitch } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";

import { toggleReinvesting } from "../services/program-reinvesting.service";

interface IProgramReinvestingContainerProps
  extends IProgramReinvestingContainerOwnProps,
    InjectedTranslateProps {}

interface IProgramReinvestingContainerState {
  isReinvesting: boolean;
  isPending: boolean;
}

class ProgramReinvestingContainer extends React.PureComponent<
  IProgramReinvestingContainerProps,
  IProgramReinvestingContainerState
> {
  constructor(props: IProgramReinvestingContainerProps) {
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
              label={t("program-details-page.description.reinvest")}
              disabled={isPending}
            />
          </span>
        )}
      </ProgramDetailContext.Consumer>
    );
  }
}

export default translate()(ProgramReinvestingContainer);
