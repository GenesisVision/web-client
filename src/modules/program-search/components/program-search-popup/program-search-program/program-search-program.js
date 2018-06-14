import { Link } from "react-router-dom";
import { translate } from "react-i18next";
import Metric from "components/metric/metric";
import NumberFormat from "react-number-format";
import ProgramAvatar from "components/program-avatar/program-avatar";
import React from "react";
import replaceParams from "utils/replace-params";

import "./program-search-program.css";
import { PROGRAM_ROUTE } from "../../../../program/program.constants";

const ProgramSearchProgram = ({ t, program, onProgramClick }) => {
  const programRoute = replaceParams(PROGRAM_ROUTE, {
    ":programId": program.id
  });
  return (
    <Link
      className="program-search-program"
      to={programRoute}
      onClick={onProgramClick}
    >
      <ProgramAvatar
        url={program.logo}
        className="program-search-program__avatar"
      />
      <div className="program-search-program__info">
        <div>{program.title}</div>
        <div className="program-search-program__statistic">
          <Metric
            value={
              <NumberFormat
                value={program.profitAvgPercent}
                suffix="%"
                decimalScale={2}
                displayType="text"
              />
            }
            description={t("program-statistic.avg-profit.text")}
          />
          <Metric
            value={program.tradesCount}
            description={t("program-statistic.trades.text")}
          />
          <Metric
            value={
              <NumberFormat
                value={program.balance}
                decimalScale={program.balance < 1000 ? 2 : 0}
                displayType="text"
              />
            }
            bubble={program.currency}
            description={t("program-statistic.program-item-balance.text")}
          />
          <Metric
            value={
              <NumberFormat
                value={program.availableInvestment}
                displayType="text"
                decimalScale={0}
              />
            }
            bubble="GVT"
            description={t("program-statistic.available-to-invest.text")}
          />
        </div>
      </div>
    </Link>
  );
};

export default translate()(ProgramSearchProgram);
