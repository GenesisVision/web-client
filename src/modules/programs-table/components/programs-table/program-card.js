import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { ActionsCircleIcon } from "components/icon/actions-circle-icon";
import Popover from "components/popover/popover";
import Profitability from "components/profitability/profitability";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVButton } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import { PROGRAM_SLUG_URL_PARAM_NAME } from "pages/programs/programs.routes";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";

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
    const { t, program, onExpandClick } = this.props;
    const programDetailsUrl = replaceParams(PROGRAM_DETAILS_ROUTE, {
      [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: program.url
    });
    return (
      <div onClick={onExpandClick} className="programs-cards__card">
        <div className="programs-cards__row">
          <div className="programs-cards__avatar">
            <AssetAvatar
              url={program.logo}
              level={program.level}
              alt={program.title}
              size="medium"
            />
          </div>
          <div className="programs-cards__names">
            <div className="programs-cards__title">{program.title}</div>
            <div className="programs-cards__name">
              {program.manager.username}
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
                {program.personalProgramDetails &&
                  program.personalProgramDetails.isInvested && (
                    <GVButton
                      variant="text"
                      color="secondary"
                      onClick={this.handleOpenWithdrawalPopup}
                    >
                      {t("program-actions.withdraw")}
                    </GVButton>
                  )}
                {program.personalProgramDetails && (
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={this.handleOpenInvestmentPopup}
                  >
                    {t("program-actions.invest")}
                  </GVButton>
                )}
                <Link to={programDetailsUrl}>
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={this.handleCloseDropdown}
                  >
                    {t("program-actions.details")}
                  </GVButton>
                </Link>
              </div>
            </Popover>
          </div>
        </div>
        <div className="programs-cards__row">
          <div className="programs-cards__chart">
            <ProgramSimpleChart data={program.chart} programId={program.id} />
          </div>
          <div className="programs-cards__chart-info">
            <div className="programs-cards__profit">
              <Profitability
                value={program.statistic.profitPercent}
                variant="chips"
                prefix="arrow"
              >
                <NumberFormat
                  value={program.statistic.profitPercent}
                  suffix="%"
                  allowNegative={false}
                  decimalScale={2}
                  displayType="text"
                />
              </Profitability>
            </div>
            <div className="programs-cards__balance">
              {program.statistic.balanceGVT.amount} {program.currency}
            </div>
          </div>
        </div>
        <div className="programs-cards__table">
          <table>
            <tbody>
              <tr>
                <th className="programs-cards__table--title">
                  {t("programs-page.programs-header.balance")}
                </th>
                <th className="programs-cards__table--title">
                  {t("programs-page.programs-header.investors")}
                </th>
                <th className="programs-cards__table--title">
                  {t("programs-page.programs-header.available-to-invest")}
                </th>
              </tr>
              <tr>
                <td>{program.statistic.balanceGVT.amount}</td>
                <td>{program.statistic.investorsCount}</td>
                <td>{program.availableInvestment}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="programs-cards__table">
          <table>
            <tbody>
              <tr>
                <th className="programs-cards__table--title">
                  {t("programs-page.programs-header.trades")}
                </th>
                <th className="programs-cards__table--title">
                  {t("programs-page.programs-header.period")}
                </th>
                <th className="programs-cards__table--title">
                  {t("programs-page.programs-header.drawdown")}
                </th>
              </tr>
              <tr>
                <td>{program.statistic.tradesCount}</td>
                <td>
                  <ProgramPeriodPie
                    start={program.periodStarts}
                    end={program.periodEnds}
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
        <ProgramDepositContainer
          open={this.state.isOpenInvestmentPopup}
          id={program.id}
          onClose={this.handleCloseInvestmentPopup}
        />
        <ProgramWithdrawContainer
          open={this.state.isOpenWithdrawalPopup}
          id={program.id}
          onClose={this.handleCloseWithdrawalPopup}
        />
      </div>
    );
  }
}

export default translate()(ProgramCard);
