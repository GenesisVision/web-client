import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import ProgramAvatar from "../../../../components/program-avatar/program-avatar";
import Popover from "../../../../components/popover/popover";
import { GVButton } from "gv-react-components";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import { PROGRAM_SLUG_URL_PARAM_NAME } from "pages/programs/programs.routes";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import { ActionsCircleIcon } from "../../../../components/icon/actions-circle-icon";

class ProgramCard extends Component {
  state = {
    anchor: null,
    isOpenInvestmentPopup: false,
    isOpenWithdrawalPopup: false
  };
  handleOpenWithdrawalPopup = () => {
    this.handleCloseDropdown();
    this.setState({ isOpenWithdrawalPopup: true });
  };
  handleCloseWithdrawalPopup = () => {
    this.setState({ isOpenWithdrawalPopup: false });
  };
  handleOpenInvestmentPopup = () => {
    this.handleCloseDropdown();
    this.setState({ isOpenInvestmentPopup: true });
  };
  handleCloseInvestmentPopup = () =>
    this.setState({ isOpenInvestmentPopup: false });
  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
  render() {
    const programDetailsUrl = replaceParams(PROGRAM_DETAILS_ROUTE, {
      [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: this.props.program.url
    });
    return (
      <div onClick={this.props.onExpandClick} className="programs-cards__card">
        <div className="programs-cards__row">
          <div className="programs-cards__avatar">
            <ProgramAvatar
              url={this.props.program.logo}
              level={this.props.program.level}
              alt={this.props.program.title}
              size="medium"
            />
          </div>
          <div className="programs-cards__names">
            <div className="programs-cards__title">
              {this.props.program.title}
            </div>
            <div className="programs-cards__name">
              {this.props.program.manager.username}
            </div>
          </div>
          <div className="programs-cards__actions">
            <ActionsCircleIcon
              primary={!!this.state.anchor}
              onClick={this.handleOpenDropdown}
            />
            <Popover
              horizontal="right"
              vertical="bottom"
              anchorEl={this.state.anchor}
              noPadding
              onClose={this.handleCloseDropdown}
            >
              <div className="popover-list">
                {this.props.program.personalProgramDetails &&
                  this.props.program.personalProgramDetails.isInvested && (
                    <GVButton
                      variant="text"
                      color="secondary"
                      onClick={this.handleOpenWithdrawalPopup}
                    >
                      Withdraw
                    </GVButton>
                  )}
                {this.props.program.personalProgramDetails && (
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={this.handleOpenInvestmentPopup}
                  >
                    Invest
                  </GVButton>
                )}
                <Link to={programDetailsUrl}>
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={this.handleCloseDropdown}
                  >
                    Details
                  </GVButton>
                </Link>
              </div>
            </Popover>
          </div>
        </div>
        <div className="programs-cards__row">
          <div className="programs-cards__chart">
            <ProgramSimpleChart
              data={this.props.program.chart}
              isPositive={this.props.program.statistic.profitPercent >= 0}
            />
          </div>
          <div className="programs-cards__chart-info">
            <div className="programs-cards__chart-info--profit">
              <NumberFormat
                value={this.props.program.statistic.profitPercent}
                suffix="%"
                decimalScale={2}
                displayType="text"
              />
            </div>
            <div className="programs-cards__chart-info--balance">
              {this.props.program.statistic.balanceGVT.amount}{" "}
              {this.props.program.currency}
            </div>
          </div>
        </div>
        <div className="programs-cards__table">
          <table>
            <tbody>
              <tr>
                <th className="programs-cards__table--title">Balance</th>
                <th className="programs-cards__table--title">Investors</th>
                <th className="programs-cards__table--title">Av. to invest</th>
              </tr>
              <tr>
                <td>{this.props.program.statistic.balanceGVT.amount}</td>
                <td>{this.props.program.statistic.investorsCount}</td>
                <td>{this.props.program.availableInvestment}</td>
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
                <td>{this.props.program.statistic.tradesCount}</td>
                <td>
                  <ProgramPeriodPie
                    start={this.props.program.periodStarts}
                    end={this.props.program.periodEnds}
                  />
                </td>
                <td>
                  <NumberFormat
                    value={this.props.program.statistic.drawdownPercent}
                    suffix="%"
                    decimalScale={2}
                    displayType="text"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ProgramDepositContainer
          open={this.state.isOpenInvestmentPopup}
          id={this.props.program.id}
          onClose={this.handleCloseInvestmentPopup}
        />
        <ProgramWithdrawContainer
          open={this.state.isOpenWithdrawalPopup}
          id={this.props.program.id}
          onClose={this.handleCloseWithdrawalPopup}
        />
      </div>
    );
  }
}

export default ProgramCard;
