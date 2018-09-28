import { Icon } from "components/icon/icon";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import { GVButton, GVProgramAvatar } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import { TableRow } from "modules/table/components";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import fileService from "shared/services/file-service";
import replaceParams from "utils/replace-params";

import ProgramBigChart from "../program-big-chart/program-big-chart";

class ProgramTableRowDetailed extends Component {
  state = {
    isOpenInvestToProgramPopup: false
  };
  handleOpenInvest = () => {
    this.setState({ isOpenInvestToProgramPopup: true });
  };
  handleCloseInvest = () => {
    this.setState({ isOpenInvestToProgramPopup: false });
  };

  render() {
    const {
      program,
      isAuthenticated,
      toggleFavorite,
      onCollapseClick
    } = this.props;

    const programDetailsUrl = replaceParams(PROGRAM_DETAILS_ROUTE, {
      ":programId": program.id
    });

    return (
      <TableRow>
        <td className="program-detailed" colSpan="11" onClick={onCollapseClick}>
          <div className="program-detailed__container">
            <div className="program-detailed__info">
              <div className="program-detailed__avatar">
                <GVProgramAvatar
                  url={fileService.getFileUrl(program.avatar)}
                  level={program.level}
                  alt={program.title}
                  size="medium"
                  className="program-detailed__img"
                />
                <div className="program-detailed__avatar--name">
                  <div className="program-detailed__title">{program.title}</div>
                  <div className="program-detailed__manager">
                    {program.manager.username}
                  </div>
                </div>
              </div>
              <div className="program-detailed__strategy">Strategy</div>
              <div className="program-detailed__description">
                {program.description}
              </div>
            </div>
            <div className="program-detailed__statistic">
              <div className="program-detailed__chart">
                <ProgramBigChart data={program.chart} />
              </div>
              <div className="program-detailed__statistic-data">
                <div>
                  <div className="program-detailed__statistic-data--label">
                    Balance
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.statistic.balanceGVT.amount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    Curr.
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.currency}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    Investors
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.statistic.investorsCount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    Av. to Invest
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.availableForInvestment}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    Trades
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.statistic.tradesCount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    Period
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <ProgramPeriodPie
                      start={program.periodDateStart}
                      end={program.periodDateEnd}
                    />
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    D.down
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <NumberFormat
                      value={program.statistic.drawdownPercent}
                      suffix="%"
                      decimalScale={2}
                      displayType="text"
                    />
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    Profit
                  </div>
                  <div className="program-detailed__statistic-data--value--positive">
                    <NumberFormat
                      value={program.statistic.profitPercent}
                      suffix="%"
                      decimalScale={2}
                      displayType="text"
                    />
                  </div>
                </div>
              </div>
              {isAuthenticated &&
                program.personalProgramDetails && (
                  <div className="program-detailed__favorites-block">
                    <span style={{ float: "right" }}>
                      Add to favorites{" "}
                      <FavoriteIcon
                        toggleSelected={toggleFavorite}
                        programId={program.id}
                        selected={program.personalProgramDetails.isFavorite}
                      />
                    </span>
                  </div>
                )}
              <div className="program-detailed__bottom-block">
                <GVButton>Invest</GVButton>
                <div className="program-detailed__details">
                  <Link to={programDetailsUrl}>
                    <GVButton variant="text" color="secondary">
                      Details >
                    </GVButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </td>
      </TableRow>
    );
  }
}

export default ProgramTableRowDetailed;
