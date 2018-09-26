import "./program-details-description.scss";

import { RingIcon } from "components/icon/icon";
import { GVButton, GVProgramAvatar } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { MANAGER_DETAILS_ROUTE } from "pages/manager/manager.page";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";

const composeManagerUrl = managerId => {
  return replaceParams(MANAGER_DETAILS_ROUTE, {
    ":managerId": managerId
  });
};

class ProgramDetailsDescription extends PureComponent {
  state = {
    isOpenInvestmentPopup: false
  };

  handleOpenInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: true });
  };

  handleCloseInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: false });
  };

  render() {
    const { isOpenInvestmentPopup } = this.state;
    const {
      t,
      isInvested,
      programDescription,
      onReinvestingClick,
      isReinvestPending
    } = this.props;

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
          <Link to={composeManagerUrl(programDescription.manager.id)}>
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
              open={isOpenInvestmentPopup}
              id={programDescription.id}
              onClose={this.handleCloseInvestmentPopup}
            />

            {isInvested && (
              <ProgramReinvestingWidget
                className="program-details-description__reinvest"
                toggleReinvesting={onReinvestingClick}
                isReinvesting={programDescription.isReinvesting}
                disabled={isReinvestPending}
              />
            )}
          </div>
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
