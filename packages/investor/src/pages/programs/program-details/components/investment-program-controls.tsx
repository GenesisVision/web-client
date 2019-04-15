import { ProgramDetailsFull } from "gv-api-web";
import { GVButton } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";

interface IInvestmentProgramControlsOwnProps {
  isAuthenticated: boolean;

  redirectToLogin(): void;

  programDescription: ProgramDetailsFull;
}

interface IInvestmentProgramControlsState {
  isOpenInvestmentPopup: boolean;
  isOpenPopup: boolean;
}

type InvestmentProgramControlsProps = InjectedTranslateProps &
  IInvestmentProgramControlsOwnProps;

class InvestmentProgramControls extends Component<
  InvestmentProgramControlsProps,
  IInvestmentProgramControlsState
> {
  state = {
    isOpenInvestmentPopup: false,
    isOpenPopup: false
  };

  handleClosePopup = () => {
    this.setState({ isOpenPopup: false });
  };

  openInvestmentPopup = () => {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.setState({ isOpenInvestmentPopup: true });
    } else {
      this.setState({ isOpenPopup: true });
    }
  };

  closeInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: false });
  };

  applyInvestmentChanges = (updateDetails: () => void) => () => {
    updateDetails();
  };

  render() {
    const { t, programDescription } = this.props;

    const { isOpenInvestmentPopup } = this.state;
    return (
      <Fragment>
        <InvestmentProgramInfo programDescription={programDescription} />
        <div className="program-details-description__button-container">
          <GVButton
            className="program-details-description__invest-btn"
            onClick={this.openInvestmentPopup}
          >
            {t("program-details-page.description.invest")}
          </GVButton>
        </div>
        <ProgramDetailContext.Consumer>
          {({ updateDetails }: IProgramDetailContext) => (
            <ProgramDepositContainer
              currency={programDescription.currency}
              open={isOpenInvestmentPopup}
              id={programDescription.id}
              onClose={this.closeInvestmentPopup}
              onApply={this.applyInvestmentChanges(updateDetails)}
            />
          )}
        </ProgramDetailContext.Consumer>
        <InvestmentUnauthPopup
          isAuthenticated={false}
          description={programDescription}
          open={this.state.isOpenPopup}
          onClose={this.handleClosePopup}
        />
      </Fragment>
    );
  }
}

export default translate()(InvestmentProgramControls);
