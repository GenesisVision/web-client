import { Icon } from "components/icon/icon";
import ProgramAvatar from "components/program-avatar/program-avatar";
import Surface from "components/surface/surface";
import { GVButton } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import { TableRow } from "modules/table/components";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import React, { Component } from "react";
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
        <Surface className="program-detailed">
          <div className="program-detailed__info">
            <div className="program-detailed__avatar">
              <ProgramAvatar
                url={program.logo}
                level={program.level}
                alt={program.title}
                size="medium"
              />
              <div>
                <div className="program-detailed__title">{program.title}</div>
                <div className="program-detailed__manager">
                  {program.manager.username}
                </div>
              </div>
            </div>
            <div className="program-detailed__strategy">Strategy</div>
            <div className="program-detailed__strategy">
              {program.description}
            </div>
          </div>
          <div className="program-detailed__statistic">
            <div className="program-detailed__chart">
              <ProgramBigChart
                data={program.chart}
                currency={program.currency}
              />
            </div>
            <div className="program-detailed__statistic-data">
              <div style={{ padding: "0 1rem" }}>
                <div>Balance</div>
                <div>{program.statistic.balanceGVT.amount}</div>
              </div>
              <div style={{ padding: "0 1rem" }}>
                <div>Curr.</div>
                <div>{program.currency}</div>
              </div>
              <div style={{ padding: "0 1rem" }}>
                <div>Investors</div>
                <div>{program.statistic.investorsCount}</div>
              </div>
              <div style={{ padding: "0 1rem" }}>
                <div>Av. to Invest</div>
                <div>{program.availableForInvestment}</div>
              </div>
              <div style={{ padding: "0 1rem" }}>
                <div>Trades</div>
                <div>{program.statistic.tradesCount}</div>
              </div>
            </div>
            <Icon
              type="collapse"
              className="program-detailed__collapse"
              onClick={onCollapseClick}
            />
            <GVButton onClick={this.handleOpenInvest}>Invest</GVButton>
            <Link to={programDetailsUrl}>
              <GVButton variant="text" color="secondary">
                Details >
              </GVButton>
            </Link>
            <ProgramDepositContainer
              id={program.id}
              onClose={this.handleCloseInvest}
              open={this.state.isOpenInvestToProgramPopup}
            />
            {isAuthenticated &&
              program.personalProgramDetails && (
                <span style={{ float: "right" }}>
                  Add to favorites{" "}
                  <FavoriteIcon
                    toggleSelected={toggleFavorite}
                    programId={program.id}
                    selected={program.personalProgramDetails.isFavorite}
                  />
                </span>
              )}
          </div>
        </Surface>
      </TableRow>
    );
  }
}

export default ProgramTableRowDetailed;
