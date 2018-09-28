import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import { GVButton, GVProgramAvatar } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import { TableRow } from "modules/table/components";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
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
      t,
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
                    {t("programs-page.programs-header.balance")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.statistic.balanceGVT.amount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.currency")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.currency}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.investors")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.statistic.investorsCount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.available-to-invest")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.availableForInvestment}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.trades")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.statistic.tradesCount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.period")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <ProgramPeriodPie
                      start={program.periodStarts}
                      end={program.periodEnds}
                    />
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.drawdown")}
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
                    {t("programs-page.programs-header.profit")}
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

export default translate()(ProgramTableRowDetailed);
