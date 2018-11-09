import "./dashboard-program.css";

import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";

import TraderAvatar from "../../../../../../../../components/program-avatar/program-avatar";
import replaceParams from "../../../../../../../../utils/replace-params";
import { PROGRAM_ROUTE } from "../../../../../../../program/program.constants";
import DPButtons from "./dp-buttons/dp-buttons";
import DPStatistic from "./dp-statistic/dp-statistic";

const DashboardProgram = ({
  t,
  program,
  openInvestPopup,
  openWithdrawPopup,
  openEditProgramPage
}) => {
  const handleOpenWithdrawPopup = () => {
    return openWithdrawPopup(program);
  };
  const traderRoute = replaceParams(PROGRAM_ROUTE, {
    ":programId": program.id
  });

  const renderProgramTitle = () => {
    if (program.isPending) {
      return (
        <span>
          <TraderAvatar
            className="dashboard-program-card__avatar"
            url={program.logoSrc}
            level={program.level}
            isTournament={program.isTournament}
          />
          <span className="dashboard-program-card__title">
            {program.title}
            &nbsp;
            <i
              id={`isPending_${program.id}`}
              className="fas fa-clock dashboard-program-card__pending"
            />
            <UncontrolledTooltip
              placement="bottom"
              target={`isPending_${program.id}`}
            >
              {t("dashboard.pending-tooltip")}
            </UncontrolledTooltip>
          </span>
        </span>
      );
    }

    return (
      <Link to={traderRoute}>
        <TraderAvatar
          className="dashboard-program-card__avatar"
          url={program.logoSrc}
          level={program.level}
          isTournament={program.isTournament}
        />
        <span className="dashboard-program-card__title">{program.title}</span>
      </Link>
    );
  };

  return (
    <div className="dashboard-program-card card">
      {renderProgramTitle()}
      <div className="dashboard-program-card__description">
        {program.description}
      </div>
      <DPButtons
        programId={program.id}
        isInvestEnable={program.isInvestEnable}
        isWithdrawEnable={program.isWithdrawEnable}
        canEditProgram={program.canCloseProgram}
        openInvestPopup={openInvestPopup}
        openWithdrawPopup={handleOpenWithdrawPopup}
        openEditProgramPage={openEditProgramPage}
      />
      <DPStatistic program={program} />
    </div>
  );
};

export default translate()(DashboardProgram);
