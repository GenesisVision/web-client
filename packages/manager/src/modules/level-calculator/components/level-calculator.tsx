import "./level-calculator.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { CalculatorIcon } from "shared/components/icon/calculator-icon";
import Popover from "shared/components/popover/popover";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";

import LevelCalculatorPopupContainer from "./level-calculator-popup.container";

class _LevelCalculator extends React.PureComponent<
  ILevelCalculatorProps & InjectedTranslateProps,
  State
> {
  state = {
    anchor: undefined
  };
  handleOpenDetails = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });

  handleCloseDetails = () => this.setState({ anchor: undefined });

  render() {
    const {
      id,
      title,
      currency,
      levelsParameters,
      isKycConfirmed
    } = this.props;
    return (
      <>
        <div className="level-calculator" onClick={this.handleOpenDetails}>
          <CalculatorIcon primary={this.state.anchor !== undefined} />
        </div>

        <Popover anchorEl={this.state.anchor} onClose={this.handleCloseDetails}>
          <LevelCalculatorPopupContainer
            id={id}
            title={title}
            currency={currency}
            onClose={this.handleCloseDetails}
            levelsParameters={levelsParameters}
            isKycConfirmed={isKycConfirmed}
          />
        </Popover>
      </>
    );
  }
}

interface State {
  anchor?: EventTarget;
}

const LevelCalculator = translate()(_LevelCalculator);
export default LevelCalculator;
