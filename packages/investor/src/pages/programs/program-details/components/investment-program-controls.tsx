import { GVButton } from "gv-react-components";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { PROGRAM } from "shared/constants/constants";
import { formatValue } from "shared/utils/formatter";

import { ProgramDetailContext } from "../program-details.page";

interface IInvestmentProgramControlsOwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;

  ProgramDepositContainer: any;
  canInvest: boolean;
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
    const {
      t,
      canInvest,
      programDescription,
      ProgramDepositContainer
    } = this.props;

    const { isOpenInvestmentPopup } = this.state;
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
        {canInvest && (
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
        )}
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
