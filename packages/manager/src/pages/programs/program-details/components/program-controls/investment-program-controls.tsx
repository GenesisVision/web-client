import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import AssetEditContainer, {
  IAssetEditInfo
} from "modules/asset-edit/asset-edit-container";
import ConfirmContainer from "modules/confirm/confirm-container";
import LevelCalculator from "modules/level-calculator/components/level-calculator";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import GVButton from "shared/components/gv-button";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "shared/constants/constants";

import ClosePeriodContainer from "../close-period/close-period-container";
import CloseProgramContainer from "../close-program/close-program-container";

enum INVESTMENT_POPUP {
  INVEST = "INVEST",
  CLOSE_PROGRAM = "CLOSE_PROGRAM",
  CLOSE_PERIOD = "CLOSE_PERIOD",
  EDIT = "EDIT",
  TFA = "TFA",
  INVEST_UNAUTH = "INVEST_UNAUTH"
}

class _InvestmentProgramControls extends React.PureComponent<Props, State> {
  state = {
    popups: Object.keys(INVESTMENT_POPUP).reduce((curr: any, next: any) => {
      curr[INVESTMENT_POPUP[next]] = false;
      return curr;
    }, {})
  };

  openPopup = (popupName: INVESTMENT_POPUP) => () => {
    let popups = { ...this.state.popups, [popupName]: true };
    this.setState({ popups });
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
    const {
      t,
      canCloseProgram,
      isOwnProgram,
      programDescription,
      isAuthenticated,
      levelsParameters
    } = this.props;

    const composeEditInfo: IAssetEditInfo = {
      stopOutLevel: programDescription.stopOutLevel,
      investmentLimit: programDescription.availableInvestmentLimit,
      currency: programDescription.currency,
      id: programDescription.id,
      title: programDescription.title,
      description: programDescription.description,
      logo: { src: programDescription.logo }
    };

    const message =
      isAuthenticated && !isOwnProgram
        ? t("program-details-page.description.auth-manager-popup")
        : t("program-details-page.description.unauth-popup");
    const isDisabledInvestButton = isAuthenticated
      ? !programDescription.personalProgramDetails ||
        !programDescription.personalProgramDetails.canInvest
      : false;

    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails, isKycConfirmed }: IProgramDetailContext) => (
          <>
            <InvestmentProgramInfo
              isOwnProgram={isOwnProgram}
              programDescription={programDescription}
              levelsParameters={levelsParameters}
              isKycConfirmed={isKycConfirmed}
              LevelCalculator={LevelCalculator}
            />
            <div className="program-details-description__button-container">
              {isOwnProgram ? (
                <>
                  <GVButton
                    className="program-details-description__invest-btn"
                    onClick={this.openPopup(INVESTMENT_POPUP.INVEST)}
                    disabled={isDisabledInvestButton}
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
                  {programDescription.personalProgramDetails &&
                    programDescription.personalProgramDetails
                      .showTwoFactorButton && (
                      <GVButton
                        className="program-details-description__invest-btn"
                        color="secondary"
                        variant="outlined"
                        onClick={this.openPopup(INVESTMENT_POPUP.TFA)}
                        disabled={!canCloseProgram}
                      >
                        {t("Confirm 2FA")}
                      </GVButton>
                    )}
                </>
              ) : (
                <GVButton
                  className="program-details-description__invest-btn"
                  onClick={this.openPopup(INVESTMENT_POPUP.INVEST_UNAUTH)}
                >
                  {t("program-details-page.description.invest")}
                </GVButton>
              )}
            </div>
            <InvestmentUnauthPopup
              message={message}
              title={programDescription.title}
              currency={programDescription.currency}
              availableToInvestBase={programDescription.availableInvestment}
              asset={ASSET.PROGRAM}
              open={popups[INVESTMENT_POPUP.INVEST_UNAUTH]}
              onClose={this.closePopup(INVESTMENT_POPUP.INVEST_UNAUTH)}
            />

            <>
              <ProgramDeposit
                currency={programDescription.currency}
                open={popups[INVESTMENT_POPUP.INVEST]}
                id={programDescription.id}
                onClose={this.closePopup(INVESTMENT_POPUP.INVEST)}
                onApply={this.applyChanges(updateDetails)}
              />
              <ClosePeriodContainer
                open={popups[INVESTMENT_POPUP.CLOSE_PERIOD]}
                onClose={this.closePopup(INVESTMENT_POPUP.CLOSE_PERIOD)}
                onApply={this.applyChanges(updateDetails)}
                id={programDescription.id}
              />
              <CloseProgramContainer
                open={popups[INVESTMENT_POPUP.CLOSE_PROGRAM]}
                onClose={this.closePopup(INVESTMENT_POPUP.CLOSE_PROGRAM)}
                onApply={this.applyChanges(updateDetails)}
                id={programDescription.id}
              />
              <AssetEditContainer
                open={popups[INVESTMENT_POPUP.EDIT]}
                info={composeEditInfo}
                onClose={this.closePopup(INVESTMENT_POPUP.EDIT)}
                onApply={this.applyChanges(updateDetails)}
                type={ASSET.PROGRAM}
              />
              {programDescription.personalProgramDetails &&
                programDescription.personalProgramDetails
                  .showTwoFactorButton && (
                  <ConfirmContainer
                    open={popups[INVESTMENT_POPUP.TFA]}
                    onClose={this.closePopup(INVESTMENT_POPUP.TFA)}
                    onApply={this.applyChanges(updateDetails)}
                    programId={composeEditInfo.id}
                  />
                )}
            </>
          </>
        )}
      </ProgramDetailContext.Consumer>
    );
  }
}

const InvestmentProgramControls = translate()(_InvestmentProgramControls);
export default InvestmentProgramControls;

interface OwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  canCloseProgram: boolean;
  isOwnProgram: boolean;
  programDescription: ProgramDetailsFull;
  levelsParameters: LevelsParamsInfo;
}

interface State {
  popups: { [k: string]: boolean };
}

interface Props extends InjectedTranslateProps, OwnProps {}
