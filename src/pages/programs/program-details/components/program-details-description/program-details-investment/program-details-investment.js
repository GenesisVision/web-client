import "./program-details-investment.scss";

import Surface from "components/surface/surface";
import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const ProgramDetailsInvestment = ({
  t,
  className,
  invested,
  value,
  profit,
  status
}) => (
  <Surface className={"program-details-investment " + className}>
    <h2 className="program-details-investment__heading">
      {t("program-details-page.description.yourInvestment")}
    </h2>
    <div className="program-details-investment__short-statistic">
      <div className="program-details-investment__short-statistic-item">
        <span className="program-details-investment__short-statistic-subheading">
          {t("program-details-page.description.invested")}
        </span>
        <span>{invested}</span>
      </div>
      <div className="program-details-investment__short-statistic-item">
        <span className="program-details-investment__short-statistic-subheading">
          {t("program-details-page.description.value")}
        </span>
        <span>{value}</span>
      </div>
      <div className="program-details-investment__short-statistic-item">
        <span className="program-details-investment__short-statistic-subheading">
          {t("program-details-page.description.profit")}
        </span>
        <span>{profit}</span>
      </div>
      <div className="program-details-investment__short-statistic-item">
        <span className="program-details-investment__short-statistic-subheading">
          {t("program-details-page.description.status")}
        </span>
        <span>{status}</span>
      </div>
    </div>
    <div className="program-details-investment__footer">
      <GVButton
        color="secondary"
        variant="outlined"
        className="program-details-investment__withdraw"
      >
        {t("program-details-page.description.withdraw")}
      </GVButton>
      <p className="program-details-investment__withdraw-notice">
        {t("program-details-page.description.withdraw-notice-text")}
      </p>
    </div>
  </Surface>
);

export default translate()(ProgramDetailsInvestment);
