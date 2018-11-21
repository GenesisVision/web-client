import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover from "shared/components/popover/popover";
import Profitability from "shared/components/profitability/profitability";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

import DetailsStatisticItem from "../details-statistic-item/details-statistic-item";

class ProgramCard extends Component {
  state = {
    anchor: null,
    isOpenInvestmentPopup: false,
    isOpenWithdrawalPopup: false
  };
  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
  render() {
    const { t, program, onExpandClick, toggleFavorite, title } = this.props;
    const handleToggleFavorite = () => {
      toggleFavorite(program.id, program.personalDetails.isFavorite);
    };
    return (
      <div onClick={onExpandClick} className="programs-cards__card">
        <div className="programs-cards__row">
          <div className="programs-cards__avatar">
            <Link
              to={{
                pathname: composeProgramDetailsUrl(program.url),
                state: `/ ${title}`
              }}
            >
              <AssetAvatar
                url={program.logo}
                level={program.level}
                alt={program.title}
                color={program.color}
                size="medium"
              />
            </Link>
          </div>
          <div className="programs-cards__names">
            <div className="programs-cards__title">
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                {program.title}
              </Link>
            </div>
            <div className="programs-cards__name">
              <Link
                to={{
                  pathname: composeManagerDetailsUrl(program.manager.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="primary">
                  {program.manager.username}
                </GVButton>
              </Link>
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
                <Link
                  to={{
                    pathname: composeProgramDetailsUrl(program.url),
                    state: `/ ${title}`
                  }}
                >
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={this.handleCloseDropdown}
                  >
                    {t("program-actions.details")}
                  </GVButton>
                </Link>
                {program.personalDetails &&
                  !program.personalDetails.isFavorite && (
                    <GVButton
                      variant="text"
                      color="secondary"
                      onClick={handleToggleFavorite}
                    >
                      {t("program-actions.add-to-favorites")}
                    </GVButton>
                  )}
                {program.personalDetails && program.personalDetails.isFavorite && (
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={handleToggleFavorite}
                  >
                    {t("program-actions.remove-from-favorites")}
                  </GVButton>
                )}
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
                  value={formatValue(program.statistic.profitPercent, 2)}
                  suffix="%"
                  allowNegative={false}
                  displayType="text"
                />
              </Profitability>
            </div>
          </div>
        </div>
        <div className="programs-cards__table">
          <div className="programs-cards__table-column">
            <DetailsStatisticItem
              label={t("programs-page.programs-header.balance")}
            >
              <NumberFormat
                value={program.statistic.balanceGVT.amount}
                displayType="text"
                decimalScale={0}
                suffix=" GVT"
              />
            </DetailsStatisticItem>
            <DetailsStatisticItem
              label={t("programs-page.programs-header.period")}
            >
              <ProgramPeriodPie
                start={program.periodStarts}
                end={program.periodEnds}
              />
            </DetailsStatisticItem>
          </div>
          <div className="programs-cards__table-column">
            <DetailsStatisticItem
              label={t("programs-page.programs-header.investors")}
            >
              <NumberFormat
                value={program.statistic.investorsCount}
                displayType="text"
                decimalScale={0}
              />
            </DetailsStatisticItem>
            <DetailsStatisticItem
              label={t("programs-page.programs-header.trades")}
            >
              <NumberFormat
                value={program.statistic.tradesCount}
                displayType="text"
                decimalScale={0}
              />
            </DetailsStatisticItem>
          </div>
          <div className="programs-cards__table-column">
            <DetailsStatisticItem
              label={t("programs-page.programs-header.available-to-invest")}
            >
              <NumberFormat
                value={formatValue(program.availableInvestment)}
                displayType="text"
                suffix=" GVT"
              />
            </DetailsStatisticItem>
            <DetailsStatisticItem
              label={t("programs-page.programs-header.drawdown")}
            >
              <NumberFormat
                value={formatValue(program.statistic.drawdownPercent, 2)}
                displayType="text"
                suffix="%"
              />
            </DetailsStatisticItem>
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(ProgramCard);
