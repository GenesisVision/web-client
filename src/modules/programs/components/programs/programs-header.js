import React from "react";
import { translate } from "react-i18next";

const ProgramsHeader = ({ t, sorting }) => {
  return (
    <div className="programs-header">
      <div className="programs-header__title">
        {t("programs-page.programs-header.title")}
      </div>
      <div className="programs-header__balance">
        {t("programs-page.programs-header.balance")}
      </div>
      <div className="programs-header__currency">
        {t("programs-page.programs-header.currency")}
      </div>
      <div className="programs-header__currency">
        {t("programs-page.programs-header.investors")}
      </div>
      <div className="programs-header__currency">
        {t("programs-page.programs-header.available-to-invest")}
      </div>
      <div className="programs-header__currency">
        {t("programs-page.programs-header.trades")}
      </div>
      <div className="programs-header__currency">
        {t("programs-page.programs-header.period")}
      </div>
      <div className="programs-header__currency">
        {t("programs-page.programs-header.drawdown")}
      </div>
      <div className="programs-header__currency">
        {t("programs-page.programs-header.profit")}
      </div>
      <div className="programs-header__currency">
        {t("programs-page.programs-header.chart")}
      </div>
    </div>
  );
};

export default translate()(ProgramsHeader);
