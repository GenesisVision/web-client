import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVProgramAvatar } from "gv-react-components";
import React from "react";
import NumberFormat from "react-number-format";
import fileService from "shared/services/file-service";
import { ActionsIcon } from "../../../../components/icon/actions-icon";

const ProgramCard = ({
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  return (
    <div onClick={onExpandClick} className="programs-cards__card">
      <div className="programs-cards__row">
        <div className="programs-cards__avatar">
          <GVProgramAvatar
            url={fileService.getFileUrl(program.avatar)}
            level={program.level}
            alt={program.title}
            size="medium"
          />
        </div>
        <div className="programs-cards__names">
          <div className="programs-cards__title">{program.title}</div>
          <div className="programs-cards__name">Eddie Carr</div>
        </div>
        <div className="programs-cards__actions">
          <ActionsIcon />
        </div>
      </div>
      <div className="programs-cards__row">
        <div className="programs-cards__chart">
          <ProgramSimpleChart
            data={program.chart}
            isPositive={program.statistic.profitPercent >= 0}
          />
        </div>
        <div className="programs-cards__chart-info">
          <div className="programs-cards__chart-info--profit">
            <NumberFormat
              value={program.statistic.profitPercent}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="programs-cards__chart-info--balance">
            {program.statistic.balanceGVT.amount} GVT
          </div>
        </div>
      </div>
      <div className="programs-cards__table">
        <table>
          <tbody>
            <tr>
              <th className="programs-cards__table--title">Balance </th>
              <th className="programs-cards__table--title">Investors</th>
              <th className="programs-cards__table--title">Av. to invest</th>
            </tr>
            <tr>
              <td>{program.statistic.balanceGVT.amount}</td>
              <td>{program.statistic.investorsCount}</td>
              <td>{program.availableForInvestment}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="programs-cards__table">
        <table>
          <tbody>
            <tr>
              <th className="programs-cards__table--title">Trades</th>
              <th className="programs-cards__table--title">Period</th>
              <th className="programs-cards__table--title">D.down</th>
            </tr>
            <tr>
              <td>{program.statistic.tradesCount}</td>
              <td>
                <ProgramPeriodPie
                  start={program.periodDateStart}
                  end={program.periodDateEnd}
                />
              </td>
              <td>
                <NumberFormat
                  value={program.statistic.drawdownPercent}
                  suffix="%"
                  decimalScale={2}
                  displayType="text"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramCard;
