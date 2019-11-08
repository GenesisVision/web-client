import classNames from "classnames";
import { CopyTradingDetailsList } from "gv-api-web";
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
  title: back,
  follow,
  isAuthenticated,
  toggleFavorite,
  onCollapseClick
}) => {
  const { t } = useTranslation();
  const linkProps = {
    state: `/ ${back}`,
    as: composeFollowDetailsUrl(follow.id), //TODO url
    pathname: FOLLOW_DETAILS_FOLDER_ROUTE
  };
  const {
    currency,
    logo,
    title,
    subscribersCount,
    creationDate,
    description,
    statistic
  } = follow;
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
                    url={logo}
                    alt={title}
                    size="medium"
                    // color={follow.color} TODO
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
                        as: composeManagerDetailsUrl(follow.owner.url),
                        state: linkProps.state
                      }}
                    >
                      {follow.owner.username}
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
                  {description}
                </div>
              </div>
            </div>
            <div className="program-detailed__statistic">
              <div className="program-detailed__chart">
                {statistic.chart.length && (
                  <FollowBigChart
                    data={statistic.chart}
                    programId={id}
                  />
                )}
              </div>
              <div className="program-detailed__statistic-data">
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.equity")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {/*<NumberFormat*/}
                    {/*  value={formatCurrencyValue(*/}
                    {/*    follow.balance.amount,*/}
                    {/*    requestCurrency*/}
                    {/*  )}*/}
                    {/*  suffix={` ${requestCurrency}`}*/}
                    {/*  displayType="text"*/}
                    {/*/>*/}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.currency")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {currency}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.investors")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {subscribersCount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.available-to-invest")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {/*{`${formatCurrencyValue(*/}
                    {/*  follow.availableToInvest,*/}
                    {/*  requestCurrency*/}
                    {/*)} ${requestCurrency}`}*/}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.period")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {/*<ProgramPeriodPie*/}
                    {/*  start={follow.periodStarts}*/}
                    {/*  end={follow.periodEnds}*/}
                    {/*/>*/}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.age")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {localizedDate(creationDate)}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.drawdown")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {/*<NumberFormat*/}
                    {/*  value={formatValue(follow.statistic.drawdown, 2)}*/}
                    {/*  suffix="%"*/}
                    {/*  displayType="text"*/}
                    {/*/>*/}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.profit")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {/*<Profitability*/}
                    {/*  value={formatValue(follow.statistic.profit, 2)}*/}
                    {/*  prefix={PROFITABILITY_PREFIX.SIGN}*/}
                    {/*>*/}
                    {/*  <NumberFormat*/}
                    {/*    value={formatValue(follow.statistic.profit, 2)}*/}
                    {/*    suffix="%"*/}
                    {/*    allowNegative={false}*/}
                    {/*    displayType="text"*/}
                    {/*  />*/}
                    {/*</Profitability>*/}
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
  follow: CopyTradingDetailsList;
  isAuthenticated?: boolean;
  toggleFavorite: TableToggleFavoriteHandlerType;
  onCollapseClick(): void;
}

const FollowTableRowDetailed = React.memo(_ProgramTableRowDetailed);
export default FollowTableRowDetailed;
