import { ProgramDetailsFull } from "gv-api-web";
import { GVButton } from "gv-react-components";
import AssetEditContainer from "modules/asset-edit/asset-edit-container";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import { PROGRAM } from "shared/constants/constants";

import { ProgramDetailContext } from "../../program-details.page";
import ClosePeriodContainer from "../close-period/close-period-container";
import CloseProgramContainer from "../close-program/close-program-container";

enum INVESTMENT_POPUP {
  INVEST = "INVEST",
  CLOSE_PROGRAM = "CLOSE_PROGRAM",
  CLOSE_PERIOD = "CLOSE_PERIOD",
  EDIT = "EDIT"
}

interface IInvestmentProgramControlsOwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;

  canCloseProgram: boolean;
  isOwnProgram: boolean;
  programDescription: ProgramDetailsFull;
}

interface IInvestmentProgramControlsState {
  popups: { [k: string]: boolean };
}

type InvestmentProgramControlsProps = InjectedTranslateProps &
  IInvestmentProgramControlsOwnProps;

class InvestmentProgramControls extends Component<
  InvestmentProgramControlsProps,
  IInvestmentProgramControlsState
> {
  constructor(props: InvestmentProgramControlsProps) {
    super(props);
    this.state = {
      popups: Object.keys(INVESTMENT_POPUP).reduce((curr: any, next: any) => {
        curr[INVESTMENT_POPUP[next]] = false;
        return curr;
      }, {})
    };
  }
  openPopup = (popupName: INVESTMENT_POPUP) => () => {
    const { isAuthenticated, redirectToLogin } = this.props;
    if (isAuthenticated) {
      let popups = { ...this.state.popups, [popupName]: true };

      this.setState({ popups });
    } else {
      redirectToLogin();
    }
  };

  closePopup = (popupName: INVESTMENT_POPUP) => () => {
    let popups = { ...this.state.popups, [popupName]: false };
    this.setState({ popups });
  };

  applyChanges = (updateDetails: any) => () => {
    updateDetails();
  };

  render() {
    const { popups } = this.state;
    const { t, canCloseProgram, isOwnProgram, programDescription } = this.props;
    const composeEditInfo = {
      stopOutLevel: programDescription.stopOutLevel,
      id: programDescription.id,
      title: programDescription.title,
      description: programDescription.description,
      logo: {
        src: programDescription.logo
      }
    };
    return (
      <Fragment>
        <InvestmentProgramInfo
          isOwnProgram={isOwnProgram}
          programDescription={programDescription}
        />
        {isOwnProgram && (
          <div className="program-details-description__button-container">
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.openPopup(INVESTMENT_POPUP.INVEST)}
              disabled={
                !programDescription.personalProgramDetails ||
                !programDescription.personalProgramDetails.canInvest
              }
            >
              {t("program-details-page.description.invest")}
            </GVButton>
            <GVButton
              className="program-details-description__invest-btn"
              color="secondary"
              variant="outlined"
              onClick={this.openPopup(INVESTMENT_POPUP.CLOSE_PROGRAM)}
              disabled={
                !programDescription.personalProgramDetails.canCloseProgram
              }
            >
              {t("program-details-page.description.close-program")}
            </GVButton>
            <GVButton
              className="program-details-description__invest-btn"
              color="secondary"
              variant="outlined"
              onClick={this.openPopup(INVESTMENT_POPUP.CLOSE_PERIOD)}
              disabled={
                !programDescription.personalProgramDetails.canClosePeriod
              }
            >
              {t("program-details-page.close-period.title")}
            </GVButton>
            <GVButton
              className="program-details-description__invest-btn"
              color="secondary"
              variant="outlined"
              onClick={this.openPopup(INVESTMENT_POPUP.EDIT)}
              disabled={!canCloseProgram}
            >
              {t("program-details-page.description.edit-program")}
            </GVButton>
          </div>
        )}
        <ProgramDetailContext.Consumer>
          {({ updateDetails }: any) => (
            <Fragment>
              <ProgramDepositContainer
                currency={programDescription.currency}
                open={popups[INVESTMENT_POPUP.INVEST]}
                type={PROGRAM}
                id={programDescription.id}
                onClose={this.closePopup(INVESTMENT_POPUP.INVEST)}
                onInvest={updateDetails}
              />
              <ClosePeriodContainer
                open={popups[INVESTMENT_POPUP.CLOSE_PERIOD]}
                onCancel={this.closePopup(INVESTMENT_POPUP.CLOSE_PERIOD)}
                onApply={this.applyChanges(updateDetails)}
                id={programDescription.id}
              />
              <CloseProgramContainer
                open={popups[INVESTMENT_POPUP.CLOSE_PROGRAM]}
                onClose={this.closePopup(INVESTMENT_POPUP.CLOSE_PROGRAM)}
                onCancel={this.closePopup(INVESTMENT_POPUP.CLOSE_PROGRAM)}
                onApply={this.applyChanges(updateDetails)}
                id={programDescription.id}
              />
              <AssetEditContainer
                open={popups[INVESTMENT_POPUP.EDIT]}
                info={composeEditInfo}
                onClose={this.closePopup(INVESTMENT_POPUP.EDIT)}
                onApply={this.applyChanges(updateDetails)}
                type={PROGRAM}
              />
            </Fragment>
          )}
        </ProgramDetailContext.Consumer>
      </Fragment>
    );
  }
}

export default translate()(InvestmentProgramControls);
