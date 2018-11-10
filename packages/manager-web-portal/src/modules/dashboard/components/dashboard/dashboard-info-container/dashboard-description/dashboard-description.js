import "./dashboard-description.css";

import React from "react";
import { translate } from "react-i18next";

import Button from "shared/components/button/button";
import { PROGRAM_SETTINGS_CREATE_ROUTE } from "../../../../../program-settings/program-settings.constants";
import { PROGRAM_SETTINGS_CREATE_TOURNAMENT_ROUTE } from "../../../../../program-tournament/program-tournament.constants";
const DashboardDescription = ({ t, isTournamentActive }) => {
  return (
    <div className="dashboard-description">
      <div className="dashboard-description__name dashboard-subheader">
        {t("dashboard.title")}
      </div>
      <div className="dashboard-description__buttons">
        {isTournamentActive && (
          <Button
            label={t("program-actions.create-tournament-account")}
            primary
            href={PROGRAM_SETTINGS_CREATE_TOURNAMENT_ROUTE}
          />
        )}
        <Button
          primary
          href={PROGRAM_SETTINGS_CREATE_ROUTE}
          label={t("program-actions.create-program")}
        />
      </div>
    </div>
  );
};

export default translate()(DashboardDescription);
