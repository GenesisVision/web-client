import React from "react";

import ProgramButtons from "./program-buttons/program-buttons";
import ProgramCharts from "./program-charts/program-charts";
import ProgramInfo from "./program-info/program-info";
import ProgramStatistic from "./program-statistic/program-statistic";

const ProgramDetail = ({
  program,
  isAuthenticated,
  openInvestPopup,
  openWithdrawPopup,
  openCloseProgramPopup,
  openEditProgramPage,
  openClosePeriodPopup
}) => {
  return (
    <div>
      <ProgramInfo program={program} />
      {isAuthenticated &&
        program.isOwnProgram && (
          <div className="program-info__buttons">
            <ProgramButtons
              programId={program.id}
              isInvestEnable={program.isInvestEnable}
              isWithdrawEnable={program.isWithdrawEnable}
              canClosePeriod={program.canClosePeriod}
              canCloseProgram={program.canCloseProgram}
              openInvestPopup={openInvestPopup}
              openWithdrawPopup={openWithdrawPopup}
              openCloseProgramPopup={openCloseProgramPopup}
              openEditProgramPage={openEditProgramPage}
              openClosePeriodPopup={openClosePeriodPopup}
            />
          </div>
        )}
      <ProgramStatistic program={program} />
      <ProgramCharts
        chart={program.chart}
        profitDiagram={program.profitDiagram}
      />
    </div>
  );
};

export default ProgramDetail;
