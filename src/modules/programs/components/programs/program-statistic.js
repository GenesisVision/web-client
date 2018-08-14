import React, { Fragment } from "react";

const ProgramStatistic = ({ program }) => {
  return (
    <Fragment>
      <div className="programs-table__cell programs-table__cell--balance">
        {program.statistic.balanceInGVT.amount}
      </div>
      <div className="programs-table__cell programs-table__cell--currency">
        {program.currency}
      </div>
      <div className="programs-table__cell programs-table__cell--investors">
        {program.statistic.investorsCount}
      </div>
      <div className="programs-table__cell programs-table__cell--available-to-invest">
        {program.availableForInvestment}
      </div>
      <div className="programs-table__cell programs-table__cell--trades">
        {program.statistic.tradesCount}
      </div>
      <div className="programs-table__cell programs-table__cell--period">
        {program.period}
      </div>
      <div className="programs-table__cell programs-table__cell--drawdown">
        {program.statistic.drawdownPercent}%
      </div>
      <div className="programs-table__cell programs-table__cell--profit">
        {program.statistic.profitPercent}%
      </div>
    </Fragment>
  );
};

export default ProgramStatistic;
