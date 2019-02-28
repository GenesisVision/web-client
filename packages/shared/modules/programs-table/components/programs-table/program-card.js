import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Popover from "shared/components/popover/popover";
import Profitability from "shared/components/profitability/profitability";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TagProgramContainer from "shared/components/tag-program/tag-program-container";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";
import Tooltip from "shared/components/tooltip/tooltip";

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
                tooltip={
                  <LevelTooltip
                    level={program.level}
                    canLevelUp={program.rating.canLevelUp}
                  />
                }
              />
            </Link>
          </div>
          <div className="programs-cards__main-info">
            <div className="programs-cards__title-wrapper">
              <Link
                className="programs-cards__title"
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                {program.title}
              </Link>
              <Link
                className="programs-cards__name"
                to={{
                  pathname: composeManagerDetailsUrl(program.manager.url),
                  state: `/ ${title}`
                }}
              >
                {program.manager.username}
              </Link>
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
                  {program.personalDetails &&
                    program.personalDetails.isFavorite && (
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
            <TagProgramContainer tags={program.tags} />
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
            <StatisticItem label={t("programs-page.programs-header.equity")}>
              <Tooltip
                render={() => (
                  <div>
                    {formatCurrencyValue(
                      program.statistic.balanceGVT.amount,
                      "GVT"
                    )}{" "}
                    {"GVT"}
                  </div>
                )}
              >
                <NumberFormat
                  value={formatCurrencyValue(
                    program.statistic.balanceBase.amount,
                    program.currency
                  )}
                  suffix={` ${program.currency}`}
                  decimalScale={0}
                  displayType="text"
                />
              </Tooltip>
            </StatisticItem>
            <StatisticItem label={t("programs-page.programs-header.period")}>
              <ProgramPeriodPie
                start={program.periodStarts}
                end={program.periodEnds}
              />
            </StatisticItem>
          </div>
          <div className="programs-cards__table-column">
            <StatisticItem label={t("programs-page.programs-header.investors")}>
              <NumberFormat
                value={program.statistic.investorsCount}
                displayType="text"
                decimalScale={0}
              />
            </StatisticItem>
            <StatisticItem label={t("programs-page.programs-header.trades")}>
              <NumberFormat
                value={program.statistic.tradesCount}
                displayType="text"
                decimalScale={0}
              />
            </StatisticItem>
          </div>
          <div className="programs-cards__table-column">
            <StatisticItem
              label={t("programs-page.programs-header.available-to-invest")}
            >
              <NumberFormat
                value={formatCurrencyValue(
                  program.availableInvestmentBase,
                  program.currency
                )}
                displayType="text"
                suffix={` ${program.currency}`}
              />
            </StatisticItem>
            <StatisticItem label={t("programs-page.programs-header.drawdown")}>
              <NumberFormat
                value={formatValue(program.statistic.drawdownPercent, 2)}
                displayType="text"
                suffix="%"
              />
            </StatisticItem>
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(ProgramCard);
