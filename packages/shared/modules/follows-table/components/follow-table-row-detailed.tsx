import classNames from "classnames";
import { ProgramDetailsOld } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import { Icon } from "shared/components/icon/icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Link from "shared/components/link/link";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import TableRow from "shared/components/table/components/table-row";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import TagProgramContainer from "shared/components/tags/tag-program-container/tag-program-container";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "shared/routes/invest.routes";
import { MANAGER_DETAILS_FOLDER_ROUTE } from "shared/routes/manager.routes";
import {
  composeFollowDetailsUrl,
  composeManagerDetailsUrl
} from "shared/utils/compose-url";
import { localizedDate } from "shared/utils/dates";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import FollowBigChart from "./follow-big-chart/follow-big-chart";

const _ProgramTableRowDetailed: React.FC<Props> = ({
  title,
  follow,
  isAuthenticated,
  toggleFavorite,
  onCollapseClick
}) => {
  const { t } = useTranslation();
  const linkProps = {
    state: `/ ${title}`,
    as: composeFollowDetailsUrl(follow.url),
    pathname: FOLLOW_DETAILS_FOLDER_ROUTE
  };
  const requestCurrency = follow.statistic.balance.currency;
  return (
    <TableRow>
      <td
        className={classNames("program-detailed", {
          "program-detailed--pretender": false
        })}
        colSpan={11}
      >
        <div className="program-detailed__container program-detailed__container--outer">
          <div className="program-detailed__container program-detailed__container--inner">
            <div className="program-detailed__info">
              <div className="program-detailed__avatar">
                <Link to={linkProps}>
                  <AssetAvatar
                    url={follow.logo}
                    level={follow.level}
                    levelProgress={follow.levelProgress}
                    alt={follow.title}
                    size="medium"
                    color={follow.color}
                    tooltip={
                      <LevelTooltip level={follow.level} canLevelUp={false} />
                    }
                  />
                </Link>
                <div className="program-detailed__avatar--name">
                  <div className="program-detailed__title">
                    <Link
                      className="program-detailed__title-link"
                      to={linkProps}
                    >
                      {follow.title}
                    </Link>
                  </div>
                  <div className="program-detailed__manager">
                    <Link
                      className="program-detailed__manager-link"
                      to={{
                        pathname: MANAGER_DETAILS_FOLDER_ROUTE,
                        as: composeManagerDetailsUrl(follow.manager.url),
                        state: linkProps.state
                      }}
                    >
                      {follow.manager.username}
                    </Link>
                  </div>
                  <TagProgramContainer tags={follow.tags} />
                </div>
              </div>
              <div className="program-detailed__strategy">
                {t("programs-page.programs-header.strategy")}
              </div>
              <div className="program-detailed__scroll">
                <div className="program-detailed__description">
                  {follow.description}
                </div>
              </div>
            </div>
            <div className="program-detailed__statistic">
              <div className="program-detailed__chart">
                {follow.chart.length && (
                  <FollowBigChart data={follow.chart} programId={follow.id} />
                )}
              </div>
              <div className="program-detailed__statistic-data">
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.equity")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <NumberFormat
                      value={formatCurrencyValue(
                        follow.statistic.balance.amount,
                        requestCurrency
                      )}
                      suffix={` ${requestCurrency}`}
                      displayType="text"
                    />
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.currency")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {follow.currency}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.investors")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {follow.statistic.investorsCount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.available-to-invest")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {`${formatCurrencyValue(
                      follow.availableInvestmentInCurrency,
                      requestCurrency
                    )} ${requestCurrency}`}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.period")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <ProgramPeriodPie
                      start={follow.periodStarts}
                      end={follow.periodEnds}
                    />
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.age")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {localizedDate(follow.creationDate)}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.drawdown")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <NumberFormat
                      value={formatValue(follow.statistic.drawdownPercent, 2)}
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
                      value={formatValue(follow.statistic.profitPercent, 2)}
                      prefix={PROFITABILITY_PREFIX.SIGN}
                    >
                      <NumberFormat
                        value={formatValue(follow.statistic.profitPercent, 2)}
                        suffix="%"
                        allowNegative={false}
                        displayType="text"
                      />
                    </Profitability>
                  </div>
                </div>
              </div>
              {isAuthenticated && follow.personalDetails && (
                <div className="program-detailed__favorites-block">
                  <span className="program-detailed__favorites-text">
                    {t("program-details-page.description.addToFavorites")}
                  </span>
                  <FavoriteIcon
                    onClick={toggleFavorite}
                    id={follow.id}
                    selected={follow.personalDetails.isFavorite}
                  />
                </div>
              )}
              <div className="program-detailed__bottom-block">
                <div className="program-detailed__details">
                  <Link
                    className="program-detailed__details-link"
                    to={linkProps}
                  >
                    {t("program-actions.details")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="program-detailed__collapse" onClick={onCollapseClick}>
            <Icon type="collapse" className="program-detailed__collapse-icon" />
          </div>
        </div>
      </td>
    </TableRow>
  );
};

interface Props {
  title: string;
  follow: ProgramDetailsOld;
  isAuthenticated?: boolean;
  toggleFavorite: TableToggleFavoriteHandlerType;
  onCollapseClick(): void;
}

const FollowTableRowDetailed = React.memo(_ProgramTableRowDetailed);
export default FollowTableRowDetailed;
