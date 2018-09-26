import "./program-details-description.scss";

import { RingIcon } from "components/icon/icon";
import { GVButton, GVProgramAvatar } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { toggleReinvesting } from "modules/program-reinvesting/services/program-reinvesting.service";
import { MANAGER_DETAILS_ROUTE } from "pages/manager/manager.page";
import React, { Component, PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";

import ProgramDetailsInvestment from "./program-details-investment/program-details-investment";

const composeInvestmentData = programDetails => {
  const { statistic, personalProgramDetails } = programDetails;

  const { balanceBase, profitPercent } = statistic;

  return {
    programId: programDetails.id,
    investedAmount: personalProgramDetails.value,
    balanceAmount: balanceBase.amount,
    balanceCurrency: balanceBase.currency,
    profitPercent,
    status: personalProgramDetails.investmentProgramStatus
  };
};

class ProgramDetailsDescriptionSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ui: {
        isOpenInvestmentPopup: false,
        isPending: false
      },
      programDescription: null,
      prevProps: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props.programDescriptionData) {
      newState.prevProps = props;
      newState.programDescription = props.programDescriptionData.data;
      newState.ui = { isPending: props.programDescriptionData.isPending };
    }

    return newState;
  }

  handleOnReinvestingClick = () => {
    const { programDescription } = this.state;
    const { id, isReinvesting } = programDescription;
    this.setState({
      programDescription: {
        ...programDescription,
        isReinvesting: !isReinvesting
      }
    });
    //toggleReinvesting(id, isReinvesting);
  };

  handleOpenInvestmentPopup = () => {
    this.setState({ isOpenInvestToProgramPopup: true });
  };

  composeManagerUrl = managerId => {
    return replaceParams(MANAGER_DETAILS_ROUTE, {
      ":managerId": managerId
    });
  };

  render() {
    const { t } = this.props;
    const { programDescription, ui } = this.state;
    if (!programDescription || ui.isPending) return null;
    const isInvested =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.isInvested;
    return (
      <div className="program-details-description">
        <div className="program-details-description__left">
          <GVProgramAvatar
            url={programDescription.logo}
            level={programDescription.level}
            alt={programDescription.title}
            size="big"
          />
        </div>
        <div className="program-details-description__main">
          <h1 className="program-details-description__heading">
            {programDescription.title}
          </h1>
          <Link to={this.composeManagerUrl(programDescription.manager.id)}>
            <GVButton
              variant="text"
              className="program-details-description__author-btn"
            >
              {programDescription.manager.username}
            </GVButton>
          </Link>

          <div className="program-details-description__info">
            <h2 className="program-details-description__subheading">
              {t("program-details-page.description.strategy")}
            </h2>
            <p className="program-details-description__text">
              {programDescription.description}
            </p>
            <div className="program-details-description__short-statistic">
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.avToInvest")}
                </span>
                <NumberFormat
                  value={programDescription.availableInvestment}
                  displayType="text"
                  suffix={` ${programDescription.currency}`}
                />
              </div>
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.entryFee")}
                </span>
                <NumberFormat
                  value={programDescription.entryFee}
                  displayType="text"
                  suffix=" %"
                />
              </div>
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.successFee")}
                </span>
                <NumberFormat
                  value={programDescription.successFee}
                  displayType="text"
                  suffix=" %"
                />
              </div>
            </div>
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.handleOpenInvestmentPopup}
            >
              {t("program-details-page.description.invest")}
            </GVButton>

            <ProgramDepositContainer
              open={this.state.isOpenInvestToProgramPopup}
              id={programDescription.id}
              onClose={() =>
                this.setState({ isOpenInvestToProgramPopup: false })
              }
            />

            {isInvested && (
              <ProgramReinvestingWidget
                className="program-details-description__reinvest"
                toggleReinvesting={this.handleOnReinvestingClick}
                isReinvesting={programDescription.isReinvesting}
              />
            )}
          </div>
          {isInvested && (
            <ProgramDetailsInvestment
              className={"program-details-description__your-investment"}
              {...composeInvestmentData(programDescription)}
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

export default translate()(ProgramDetailsDescriptionSection);
