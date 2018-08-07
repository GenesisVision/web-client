import React, { Fragment } from "react";

const ProgramStatistic = ({ program }) => {
  return (
    <Fragment>
      <div className="program__statistic program__balance">
        {program.statistic.balanceInGVT.amount}
      </div>
      <div className="program__statistic program__currency">
        {program.currency}
      </div>
      <div className="program__statistic program__investors">
        {program.statistic.investorsCount}
      </div>
      <div className="program__statistic program__available-to-invest">
        {program.availableForInvestment}
      </div>
      <div className="program__statistic program__trades">
        {program.statistic.tradesCount}
      </div>
      <div className="program__statistic program__period">{program.period}</div>
      <div className="program__statistic program__drawdown">
        {program.statistic.drawdownPercent}%
      </div>
      <div className="program__statistic program__profit">
        {program.statistic.profitPercent}%
      </div>
    </Fragment>
  );
};

export default ProgramStatistic;
