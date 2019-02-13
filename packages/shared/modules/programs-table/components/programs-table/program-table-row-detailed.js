import classnames from "classnames";
import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import { Icon } from "shared/components/icon/icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Profitability from "shared/components/profitability/profitability";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import GVScroll from "shared/components/scroll/gvscroll";
import TableRow from "shared/components/table/components/table-row";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

import TagProgramContainer from "../../../../components/tag-program/tag-program-container";
import ProgramBigChart from "./program-big-chart/program-big-chart";

class ProgramTableRowDetailed extends Component {
  state = {
    isOpenInvestToProgramPopup: false
  };

  render() {
    const {
      t,
      title,
      program,
      isAuthenticated,
      toggleFavorite,
      onCollapseClick
    } = this.props;

    return (
      <TableRow>
        <td
          className={classnames("program-detailed", {
            "program-detailed--pretender": program.rating.canLevelUp
          })}
          colSpan="11"
        >
          <div className="program-detailed__container program-detailed__container--outer">
            <div className="program-detailed__container program-detailed__container--inner">
              <div className="program-detailed__info">
                <div className="program-detailed__avatar">
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
                      size="medium"
                      color={program.color}
                      tooltip={
                        <LevelTooltip
                          level={program.level}
                          canLevelUp={program.rating.canLevelUp}
                        />
                      }
                    />
                  </Link>
                  <div className="program-detailed__avatar--name">
                    <div className="program-detailed__title">
                      <Link
                        className="program-detailed__title-link"
                        to={{
                          pathname: composeProgramDetailsUrl(program.url),
                          state: `/ ${title}`
                        }}
                      >
                        {program.title}
                      </Link>
                    </div>
                    <div className="program-detailed__manager">
                      <Link
                        className="program-detailed__manager-link"
                        to={{
                          pathname: composeManagerDetailsUrl(
                            program.manager.url
                          ),
                          state: `/ ${title}`
                        }}
                      >
                        {program.manager.username}
                      </Link>
                    </div>
                    <TagProgramContainer tags={program.tags} />
                  </div>
                </div>
                <div className="program-detailed__strategy">
                  {t("programs-page.programs-header.strategy")}
                </div>
                <div className="program-detailed__scroll">
                  <GVScroll
                    autoHide
                    autoHideTimeout={1000}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div className="program-detailed__description">
                      {program.description}
                    </div>
                  </GVScroll>
                </div>
              </div>
              <div className="program-detailed__statistic">
                <div className="program-detailed__chart">
                  <ProgramBigChart
                    data={program.chart}
                    programId={program.id}
                  />
                </div>
                <div className="program-detailed__statistic-data">
                  <div>
                    <div className="program-detailed__statistic-data--label">
                      {t("programs-page.programs-header.equity")}
                    </div>
                    <div className="program-detailed__statistic-data--value">
                      {(+program.statistic.balanceGVT.amount).toFixed(0)} GVT
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
                      {formatValue(program.availableInvestment, 2)} GVT
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
                      {t("programs-page.programs-header.trades")}
                    </div>
                    <div className="program-detailed__statistic-data--value">
                      {program.statistic.tradesCount}
                    </div>
                  </div>
                  <div>
                    <div className="program-detailed__statistic-data--label">
                      {t("programs-page.programs-header.drawdown")}
                    </div>
                    <div className="program-detailed__statistic-data--value">
                      <NumberFormat
                        value={formatValue(
                          program.statistic.drawdownPercent,
                          2
                        )}
                        suffix="%"
                        displayType="text"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="program-detailed__statistic-data--label">
                      {t("programs-page.programs-header.profit")}
                    </div>
                    <div className="program-detailed__statistic-data--value">
                      <Profitability
                        value={program.statistic.profitPercent}
                        prefix="sign"
                      >
                        <NumberFormat
                          value={formatValue(
                            program.statistic.profitPercent,
                            2
                          )}
                          suffix="%"
                          allowNegative={false}
                          displayType="text"
                        />
                      </Profitability>
                    </div>
                  </div>
                </div>
                {isAuthenticated && program.personalDetails && (
                  <div className="program-detailed__favorites-block">
                    <span className="program-detailed__favorites-text">
                      {t("program-details-page.description.addToFavorites")}
                    </span>
                    <FavoriteIcon
                      onClick={toggleFavorite}
                      id={program.id}
                      selected={program.personalDetails.isFavorite}
                    />
                  </div>
                )}
                <div className="program-detailed__bottom-block">
                  <div className="program-detailed__details">
                    <Link
                      className="program-detailed__details-link"
                      to={{
                        pathname: composeProgramDetailsUrl(program.url),
                        state: `/ ${title}`
                      }}
                    >
                      {t("program-actions.details")} &#8250;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="program-detailed__collapse"
              onClick={onCollapseClick}
            >
              <Icon
                type="collapse"
                className="program-detailed__collapse-icon"
              />
            </div>
          </div>
        </td>
      </TableRow>
    );
  }
}

export default translate()(ProgramTableRowDetailed);
