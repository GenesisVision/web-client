import React from "react";
import { translate } from "react-i18next";
import { UncontrolledTooltip } from "reactstrap";

import DaysLeftWidget from "shared/components/days-left-widget/days-left-widget";

import CalendarImage from "./calendar-icon.svg";

const DSPeriodEnd = ({ t, periodEnd }) => {
  return (
    <div className="dashboard-card__body card-body">
      <div className="dashboard-card__header">
        <span id="dashboardStatisticEndOfNextPeriod">
          {t("dashboard-statistic.end-of-next-period.text")}
        </span>
        <UncontrolledTooltip
          placement="bottom"
          target="dashboardStatisticEndOfNextPeriod"
        >
          {t("dashboard-statistic.end-of-next-period.tooltip")}
        </UncontrolledTooltip>
      </div>
      <div className="dashboard-card__image">
        <img src={CalendarImage} alt="Calendar" />
      </div>
      <div className="dashboard-card__value">
        <div className="metric">
          <div className="metric__value">
            <DaysLeftWidget
              start={periodEnd.startOfPeriod}
              duration={periodEnd.duration}
            />
          </div>
          <div className="metric__description">{periodEnd.title}</div>
        </div>
      </div>
    </div>
  );
};

export default translate()(DSPeriodEnd);
