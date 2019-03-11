import { ProgramDetails } from "gv-api-web";
import { GVButton } from "gv-react-components";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import Profitability from "shared/components/profitability/profitability";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TagProgramContainer from "shared/components/tag-program/tag-program-container";
import Tooltip from "shared/components/tooltip/tooltip";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import {
  formatCurrencyValue,
  formatValue,
  formatValueDifferentDecimalScale
} from "shared/utils/formatter";
import { Nullable } from "shared/utils/types";

interface IProgramCardProps {
  program: ProgramDetails;
  toggleFavorite(programId: string, isFavorite: boolean): void;
  title: string;
}

const DECIMAL_SCALE_SMALL_VALUE = 4;
const DECIMAL_SCALE_BIG_VALUE = 2;

interface IProgramCardState {
  anchor: Nullable<EventTarget>;
}

class ProgramCard extends React.Component<
  IProgramCardProps & WithTranslation,
  IProgramCardState
> {
  state = {
    anchor: null
  };
  handleOpenDropdown = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
  render() {
    const { t, program, toggleFavorite, title } = this.props;
    const handleToggleFavorite = () => {
      toggleFavorite(program.id, program.personalDetails.isFavorite);
    };
    return (
      <div className="table-cards__card">
        <div className="table-cards__row">
          <div className="table-cards__avatar">
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
          <div className="table-cards__main-info">
            <div className="table-cards__title-wrapper">
              <Link
                className="table-cards__title"
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                {program.title}
              </Link>
              <Link
                className="table-cards__name"
                to={{
                  pathname: composeManagerDetailsUrl(program.manager.url),
                  state: `/ ${title}`
                }}
              >
                {program.manager.username}
              </Link>
            </div>
            <div className="table-cards__actions">
              <ActionsCircleIcon
                primary={!!this.state.anchor}
                onClick={this.handleOpenDropdown}
              />
              <Popover
                horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
                vertical={VERTICAL_POPOVER_POS.BOTTOM}
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
        <div className="table-cards__row">
          <div className="table-cards__chart">
            <ProgramSimpleChart data={program.chart} programId={program.id} />
          </div>
          <div className="table-cards__chart-info">
            <div className="table-cards__profit">
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
        <div className="table-cards__table">
          <div className="table-cards__table-column">
            <StatisticItem label={t("programs-page.programs-header.equity")}>
              <Tooltip
                vertical={VERTICAL_POPOVER_POS.TOP}
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
                  value={formatValueDifferentDecimalScale(
                    program.statistic.balanceBase.amount,
                    DECIMAL_SCALE_SMALL_VALUE,
                    DECIMAL_SCALE_BIG_VALUE
                  )}
                  suffix={` ${program.currency}`}
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
          <div className="table-cards__table-column">
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
          <div className="table-cards__table-column">
            <StatisticItem
              label={t("programs-page.programs-header.available-to-invest")}
            >
              <NumberFormat
                value={formatValueDifferentDecimalScale(
                  program.availableInvestmentBase,
                  DECIMAL_SCALE_SMALL_VALUE,
                  DECIMAL_SCALE_BIG_VALUE
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

export default withTranslation()(ProgramCard);
