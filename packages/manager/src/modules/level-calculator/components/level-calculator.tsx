import "./level-calculator.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";
import { CalculatorIcon } from "shared/components/icon/calculator-icon";
import { ILevelCalculatorProps } from "shared/components/programs/program-details/program-details.types";

import LevelCalculatorPopupContainer from "./level-calculator-popup.container";

class _LevelCalculator extends React.PureComponent<
  ILevelCalculatorProps & InjectedTranslateProps,
  State
> {
  state = {
    open: false
  };
  handleOpenDetails = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ open: true });

  handleCloseDetails = () => this.setState({ open: false });

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
          <CalculatorIcon primary={this.state.open} />
        </div>

        <Dialog
          className="level-calculator-popup"
          open={this.state.open}
          onClose={this.handleCloseDetails}
        >
          <LevelCalculatorPopupContainer
            id={id}
            title={title}
            currency={currency}
            onClose={this.handleCloseDetails}
            levelsParameters={levelsParameters}
            isKycConfirmed={isKycConfirmed}
          />
        </Dialog>
      </>
    );
  }
}

interface State {
  open: boolean;
}

const LevelCalculator = translate()(_LevelCalculator);
export default LevelCalculator;
