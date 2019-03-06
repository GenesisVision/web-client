import classnames from "classnames";
import { GVSwitch } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { toggleReinvesting } from "../services/program-reinvesting.service";

interface IProgramReinvestingContainerOwnProps {
  programId: string;
  isReinvesting: boolean;
}

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
  toggleReinvesting = (value: boolean) => {
    const { programId } = this.props;
    this.setState({ isPending: true, isReinvesting: value });
    toggleReinvesting(programId, value)
      .then(() => this.setState({ isPending: false }))
      .catch(() => this.setState({ isPending: false, isReinvesting: !value }));
  };

  onReinvestingLabelClick = () =>
    this.toggleReinvesting(!this.state.isReinvesting);

  render() {
    const { t } = this.props;
    const { isReinvesting, isPending } = this.state;
    return (
      <span
        className={classnames("reinvesting-widget", {
          "reinvesting-widget--active": isReinvesting
        })}
        onClick={this.onReinvestingLabelClick}
      >
        <GVSwitch
          name="reinvesting"
          touched={false}
          value={isReinvesting}
          color="primary"
          onChange={this.onReinvestingLabelClick}
          label={t("program-details-page.description.reinvest")}
          disabled={isPending}
        />
      </span>
    );
  }
}

export default translate()(ProgramReinvestingContainer);
