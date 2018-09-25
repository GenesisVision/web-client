import "./program-details-description.scss";

import { RingIcon } from "components/icon/icon";
import { GVButton, GVProgramAvatar } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import { MANAGER_DETAILS_ROUTE } from "pages/manager/manager.page";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";

import ProgramDetailsInvestment from "./program-details-investment/program-details-investment";

const getInvestmentData = programDetails => {
  let {
    investedAmount,
    investedCurrency,
    balanceBase,
    profitPercent
  } = programDetails.statistic;

  return {
    invested: investedAmount + " " + investedCurrency,
    value: balanceBase.amount + " " + balanceBase.currency,
    profit: profitPercent + " %",
    status:
      programDetails.personalProgramDetails &&
      programDetails.personalProgramDetails.investmentProgramStatus
  };
};

class ProgramDetailsDescription extends Component {
  state = {
    isOpenInvestToProgramPopup: false,
    isOpenWithdrawToProgramPopup: false
  };

  handleOnReinvestingClick = () => {
    const programId = this.props.programDetails.id;
    toggleReinvesting(programId);
  };

  handleOpenInvestPopup = () => {
    this.setState({ isOpenInvestToProgramPopup: true });
  };

  handleOpenWithdrawPopup = () => {
    this.setState({ isOpenWithdrawToProgramPopup: true });
  };

  composeManagerUrl = managerId => {
    return replaceParams(MANAGER_DETAILS_ROUTE, {
      ":managerId": managerId
    });
  };

  render() {
    const { t, programDetails } = this.props;
    return (
      <div className="program-details-description">
        <div className="program-details-description__left">
          <GVProgramAvatar
            url={programDetails.logo}
            level={programDetails.level}
            alt={programDetails.title}
            size="big"
          />
        </div>
        <div className="program-details-description__main">
          <h1 className="program-details-description__heading">
            {programDetails.title}
          </h1>
          <Link to={this.composeManagerUrl(programDetails.manager.id)}>
            <GVButton
              variant="text"
              className="program-details-description__author-btn"
            >
              {programDetails.manager.username}
            </GVButton>
          </Link>

          <div className="program-details-description__info">
            <h2 className="program-details-description__subheading">
              {t("program-details-page.description.strategy")}
            </h2>
            <p className="program-details-description__text">
              {programDetails.description}
            </p>
            <div className="program-details-description__short-statistic">
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.avToInvest")}
                </span>
                <span>
                  {programDetails.availableForInvestment}{" "}
                  {programDetails.currency}
                </span>
              </div>
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.entryFee")}
                </span>
                <span>{programDetails.entryFee} %</span>
              </div>
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.successFee")}
                </span>
                <span>{programDetails.successFee} %</span>
              </div>
            </div>
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.handleOpenInvestPopup}
            >
              {t("program-details-page.description.invest")}
            </GVButton>
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.handleOpenWithdrawPopup}
            >
              {t("withdraw")}
            </GVButton>
            <ProgramDepositContainer
              open={this.state.isOpenInvestToProgramPopup}
              id={programDetails.id}
              onClose={() =>
                this.setState({ isOpenInvestToProgramPopup: false })
              }
            />
            <ProgramWithdrawContainer
              open={this.state.isOpenWithdrawToProgramPopup}
              id={programDetails.id}
              onClose={() =>
                this.setState({ isOpenWithdrawToProgramPopup: false })
              }
            />
            {programDetails.personalProgramDetails &&
              programDetails.personalProgramDetails.isInvested && (
                <ProgramReinvestingWidget
                  className="program-details-description__reinvest"
                  toggleReinvesting={this.handleOnReinvestingClick}
                  isReinvesting={programDetails.isReinvesting}
                />
              )}
          </div>
          {programDetails.personalProgramDetails &&
            programDetails.personalProgramDetails.isInvested && (
              <ProgramDetailsInvestment
                className={"program-details-description__your-investment"}
                {...getInvestmentData(programDetails)}
              />
            )}
        </div>

        <div className="program-details-description__right">
          <GVButton variant="text" color="secondary">
            {t("program-details-page.description.addToFavorites")}
          </GVButton>
          <GVButton variant="text" color="secondary">
            {t("program-details-page.description.notifications")}{" "}
            <RingIcon className="program-details-description__notification-icon" />
          </GVButton>
        </div>
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescription);
