import "./program-details-description.scss";

import { RingIcon } from "components/icon/icon";
import { GVButton, GVProgramAvatar } from "gv-react-components";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import ProgramDetailsInvestment from "./program-details-investment/program-details-investment";

const model = {
  id: "string",
  logo: "string",
  description: "string",
  title: "string",
  currency: "Undefined",
  level: 0,
  periodDuration: 0,
  periodDateStart: "2018-08-30T12:33:04.659Z",
  periodDateEnd: "2018-08-30T12:33:04.659Z",
  successFee: 0,
  availableForInvestment: 0,
  manager: {
    id: "string",
    username: "string",
    avatar: "string"
  },
  statistic: {
    balanceBase: {
      amount: 0,
      currency: "Undefined"
    },
    balanceGVT: {
      amount: 0,
      currency: "Undefined"
    },
    balanceSecondary: {
      amount: 0,
      currency: "Undefined"
    },
    investorsCount: 0,
    startDate: "2018-08-30T12:33:04.659Z",
    startBalance: 0,
    startCurrency: "Undefined",
    investedAmount: 0,
    investedCurrency: "Undefined",
    tradesCount: 0,
    tradesSuccessCount: 0,
    profitFactorPercent: 0,
    sharpeRatioPercent: 0,
    drawdownPercent: 0,
    profitPercent: 0
  },
  personalProgramDetails: {
    isFavorite: true,
    isInvested: true,
    isOwnProgram: true,
    canCloseProgram: true,
    canClosePeriod: true,
    canInvest: true
  }
};

const getInvestmentData = model => {
  let {
    investedAmount,
    investedCurrency,
    balanceBase,
    profitPercent,
    status
  } = model.statistic;

  return {
    invested: investedAmount + " " + investedCurrency,
    value: balanceBase.amount + " " + balanceBase.currency,
    profit: profitPercent + " %",
    status
  };
};

const ProgramDetailsDescription = ({
  t,
  programAuthorUrl,
  toggleReinvesting,
  programInvestUrl,
  programWithdrawUrl
}) => (
  <div className="program-details-description">
    <div className="program-details-description__left">
      <GVProgramAvatar
        url={model.logo}
        level={model.level}
        alt={model.title}
        size="big"
      />
    </div>
    <div className="program-details-description__main">
      <h1 className="program-details-description__heading">{model.title}</h1>
      <Link to={programAuthorUrl}>
        <GVButton
          variant="text"
          className="program-details-description__author-btn"
        >
          {model.manager.username}
        </GVButton>
      </Link>

      <div className="program-details-description__info">
        <h2 className="program-details-description__subheading">
          {t("program-details-page.description.strategy")}
        </h2>
        <p className="program-details-description__text">{model.description}</p>
        <div className="program-details-description__short-statistic">
          <div className="program-details-description__short-statistic-item">
            <span className="program-details-description__short-statistic-subheading">
              {t("program-details-page.description.avToInvest")}
            </span>
            <span>
              {model.availableForInvestment} {model.currency}
            </span>
          </div>
          <div className="program-details-description__short-statistic-item">
            <span className="program-details-description__short-statistic-subheading">
              {t("program-details-page.description.entryFee")}
            </span>
            <span>{model.entryFee} %</span>
          </div>
          <div className="program-details-description__short-statistic-item">
            <span className="program-details-description__short-statistic-subheading">
              {t("program-details-page.description.successFee")}
            </span>
            <span>{model.successFee} %</span>
          </div>
        </div>
        <Link to={programInvestUrl}>
          <GVButton>{t("program-details-page.description.invest")}</GVButton>
        </Link>

        {model.personalProgramDetails.isInvested && (
          <ProgramReinvestingWidget
            className="program-details-description__reinvest"
            toggleReinvesting={toggleReinvesting}
            isReinvesting={model.isReinvesting}
          />
        )}
      </div>
      {model.personalProgramDetails.isInvested && (
        <ProgramDetailsInvestment
          className={"program-details-description__your-investment"}
          {...getInvestmentData(model)}
          programWithdrawUrl={programWithdrawUrl}
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

export default translate()(ProgramDetailsDescription);
