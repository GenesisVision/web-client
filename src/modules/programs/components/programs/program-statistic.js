import React, { Fragment } from "react";

const ProgramStatistic = ({ program }) => {
  return (
    <Fragment>
      <td className="program__statistic program__balance">
        {program.statistic.balanceInGVT.amount}
      </td>
      <td className="program__statistic program__currency">
        {program.currency}
      </td>
      <td className="program__statistic program__investors">
        {program.statistic.investorsCount}
      </td>
      <td className="program__statistic program__available-to-invest">
        {program.availableForInvestment}
      </td>
      <td className="program__statistic program__trades">
        {program.statistic.tradesCount}
      </td>
      <td className="program__statistic program__period">{program.period}</td>
      <td className="program__statistic program__drawdown">
        {program.statistic.drawdownPercent}%
      </td>
      <td className="program__statistic program__profit">
        {program.statistic.profitPercent}%
      </td>
    </Fragment>
  );
};

export default ProgramStatistic;
