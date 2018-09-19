import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVProgramAvatar } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import { TableRow, div } from "modules/table/components";
import React from "react";
import NumberFormat from "react-number-format";
import fileService from "shared/services/file-service";

const ProgramCard = ({
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  return (
    <div onClick={onExpandClick} className="programs-cards__card">
      <div className="programs-cards__card__row">
        <div className="programs-cards__card__row__avatar">
          <GVProgramAvatar
            url={fileService.getFileUrl(program.avatar)}
            level={program.level}
            alt={program.title}
            size="medium"
          />
        </div>
        <div className="programs-cards__card__row__names">
          <div className="programs-cards__card__row__title">
            {program.title}
          </div>
          <div className="programs-cards__card__row__name">Eddie Carr</div>
        </div>
        <div className="programs-cards__card__row__actions">
          <svg width="3px" height="15px" viewBox="0 0 3 15">
            <title>white_dots</title>
            <desc>Created with Sketch.</desc>
            <defs />
            <g
              id="ui"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="1600_0_6"
                transform="translate(-764.000000, -1059.000000)"
                fill="#FFFFFF"
              >
                <g id="Group-28" transform="translate(120.000000, 866.000000)">
                  <g
                    id="Group-30"
                    transform="translate(644.000000, 193.000000)"
                  >
                    <g id="white_dots">
                      <circle
                        id="Oval-13"
                        transform="translate(1.500000, 1.500000) rotate(90.000000) translate(-1.500000, -1.500000) "
                        cx="1.5"
                        cy="1.5"
                        r="1.5"
                      />
                      <circle
                        id="Oval-13-Copy"
                        transform="translate(1.500000, 7.500000) rotate(90.000000) translate(-1.500000, -7.500000) "
                        cx="1.5"
                        cy="7.5"
                        r="1.5"
                      />
                      <circle
                        id="Oval-13-Copy-2"
                        transform="translate(1.500000, 13.500000) rotate(90.000000) translate(-1.500000, -13.500000) "
                        cx="1.5"
                        cy="13.5"
                        r="1.5"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className="programs-cards__card__row">
        <div className="programs-cards__card__row__chart">
          <ProgramSimpleChart
            data={program.chart}
            isPositive={program.statistic.profitPercent >= 0}
          />
        </div>
        <div className="programs-cards__card__row__chart-info">
          <div className="programs-cards__card__row__chart-info--profit">
            <NumberFormat
              value={program.statistic.profitPercent}
              suffix="%"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="programs-cards__card__row__chart-info--balance">
            {program.statistic.balanceInGVT.amount} GVT
          </div>
        </div>
      </div>
      <div className="programs-cards__card__table">
        <table>
          <tr>
            <th className="programs-cards__card__table--title">Balance </th>
            <th className="programs-cards__card__table--title">Investors</th>
            <th className="programs-cards__card__table--title">
              Av. to invest
            </th>
          </tr>
          <tr>
            <td>{program.statistic.balanceInGVT.amount}</td>
            <td>{program.statistic.investorsCount}</td>
            <td>{program.availableForInvestment}</td>
          </tr>
        </table>
      </div>
      <div className="programs-cards__card__table">
        <table>
          <tr>
            <th className="programs-cards__card__table--title">Trades</th>
            <th className="programs-cards__card__table--title">Period</th>
            <th className="programs-cards__card__table--title">D.down</th>
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
        </table>
      </div>
    </div>
  );
};

export default ProgramCard;
