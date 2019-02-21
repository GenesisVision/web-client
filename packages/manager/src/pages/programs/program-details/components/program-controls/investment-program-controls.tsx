import { GVButton } from "gv-react-components";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { PROGRAM } from "shared/constants/constants";
import { formatValue } from "shared/utils/formatter";

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
  ClosePeriodContainer: any;
  CloseProgramContainer: any;
  ProgramDepositContainer: any;
  ProgramDetailContext: any;
  AssetEditContainer: any;
  canInvest: boolean;
  canWithdraw: boolean;
  programDescription: any;
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
    const {
      t,
      canCloseProgram,
      isOwnProgram,
      ClosePeriodContainer,
      CloseProgramContainer,
      ProgramDepositContainer,
      ProgramDetailContext,
      AssetEditContainer,
      canInvest,
      canWithdraw,
      programDescription
    } = this.props;

    const composeEditInfo = {
      id: programDescription.id,
      title: programDescription.title,
      description: programDescription.description,
      logo: {
        src: programDescription.logo
      }
    };
    return (
      <Fragment>
        <div className="program-details-description__statistic-container">
          <StatisticItem
            label={t("program-details-page.description.avToInvest")}
            className="program-details-description__short-statistic-item"
            accent
          >
            <NumberFormat
              value={formatValue(programDescription.availableInvestment, 2)}
              displayType="text"
              suffix={` GVT`}
            />
          </StatisticItem>
          <StatisticItem
            label={t("program-details-page.description.entryFee")}
            className="program-details-description__short-statistic-item"
            accent
          >
            {programDescription.entryFeeSelected !==
            programDescription.entryFeeCurrent ? (
              <Hint
                content={
                  <NumberFormat
                    value={formatValue(programDescription.entryFeeSelected, 2)}
                    displayType="text"
                    prefix={`${programDescription.entryFeeCurrent} % (`}
                    suffix=" %)"
                  />
                }
                className="program-details-description__short-statistic-hint"
                vertical={"bottom"}
                tooltipContent={t(
                  "program-details-page.description.entry-fee-levels"
                )}
              />
            ) : (
              <NumberFormat
                value={formatValue(programDescription.entryFeeCurrent, 2)}
                displayType="text"
                suffix=" %"
              />
            )}
          </StatisticItem>
          <StatisticItem
            label={t("program-details-page.description.successFee")}
            className="program-details-description__short-statistic-item"
            accent
          >
            <NumberFormat
              value={formatValue(programDescription.successFee, 2)}
              displayType="text"
              suffix=" %"
            />
          </StatisticItem>
        </div>
        {(isOwnProgram || canInvest || canWithdraw) && (
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
