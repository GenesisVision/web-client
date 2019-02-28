import { GVButton } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import { PROGRAM } from "shared/constants/constants";

import { ProgramDetailContext } from "../program-details.page";

interface IInvestmentProgramControlsOwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;

  programDescription: any;
}

interface IInvestmentProgramControlsState {
  isOpenInvestmentPopup: boolean;
}

type InvestmentProgramControlsProps = InjectedTranslateProps &
  IInvestmentProgramControlsOwnProps;

class InvestmentProgramControls extends Component<
  InvestmentProgramControlsProps,
  IInvestmentProgramControlsState
> {
  state = {
    isOpenInvestmentPopup: false
  };
  openInvestmentPopup = () => {
    const { isAuthenticated, redirectToLogin } = this.props;
    if (isAuthenticated) {
      this.setState({ isOpenInvestmentPopup: true });
    } else {
      redirectToLogin();
    }
  };

  closeInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: false });
  };

  applyInvestmentChanges = (updateDetails: any) => () => {
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
            disabled={
              !programDescription.personalProgramDetails ||
              !programDescription.personalProgramDetails.canInvest
            }
          >
            {t("program-details-page.description.invest")}
          </GVButton>
        </div>
        <ProgramDetailContext.Consumer>
          {({ updateDetails }: any) => (
            <Fragment>
              <ProgramDepositContainer
                currency={programDescription.currency}
                open={isOpenInvestmentPopup}
                type={PROGRAM}
                id={programDescription.id}
                onClose={this.closeInvestmentPopup}
                onInvest={updateDetails}
              />
            </Fragment>
          )}
        </ProgramDetailContext.Consumer>
      </Fragment>
    );
  }
}

export default translate()(InvestmentProgramControls);
