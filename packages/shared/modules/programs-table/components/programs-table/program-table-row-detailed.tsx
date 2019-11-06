import classNames from "classnames";
import { ProgramDetailsList } from "gv-api-web";
import * as React from "react";
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
import { useTranslation } from "shared/i18n";
import { MANAGER_DETAILS_FOLDER_ROUTE } from "shared/routes/manager.routes";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "shared/routes/programs.routes";
import {
  composeManagerDetailsUrl,
  composeProgramDetailsUrl
} from "shared/utils/compose-url";
import { localizedDate } from "shared/utils/dates";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import ProgramBigChart from "./program-big-chart/program-big-chart";

const _ProgramTableRowDetailed: React.FC<Props> = ({
  title,
  program,
  isAuthenticated,
  toggleFavorite,
  onCollapseClick
}) => {
  const { t } = useTranslation();
  const programLinkProps = {
    state: `/ ${title}`,
    as: composeProgramDetailsUrl(program.url),
    pathname: PROGRAM_DETAILS_FOLDER_ROUTE
  };
  const requestCurrency = program.balance.currency;
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
                <Link to={programLinkProps}>
                  <AssetAvatar
                    url={program.logo}
                    level={program.level}
                    levelProgress={program.levelProgress}
                    alt={program.title}
                    size="medium"
                    color={program.color}
                    tooltip={
                      <LevelTooltip level={program.level} canLevelUp={false} />
                    }
                  />
                </Link>
                <div className="program-detailed__avatar--name">
                  <div className="program-detailed__title">
                    <Link
                      className="program-detailed__title-link"
                      to={programLinkProps}
                    >
                      {program.title}
                    </Link>
                  </div>
                  <div className="program-detailed__manager">
                    <Link
                      className="program-detailed__manager-link"
                      to={{
                        pathname: MANAGER_DETAILS_FOLDER_ROUTE,
                        as: composeManagerDetailsUrl(program.owner.url),
                        state: programLinkProps.state
                      }}
                    >
                      {program.owner.username}
                    </Link>
                  </div>
                  <TagProgramContainer tags={program.tags} />
                </div>
              </div>
              <div className="program-detailed__strategy">
                {t("programs-page.programs-header.strategy")}
              </div>
              <div className="program-detailed__scroll">
                <div className="program-detailed__description">
                  {/*{program.description}*/}
                </div>
              </div>
            </div>
            <div className="program-detailed__statistic">
              <div className="program-detailed__chart">
                {program.chart.chart.length && (
                  <ProgramBigChart
                    data={program.chart.chart}
                    programId={program.id}
                  />
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
                        program.balance.amount,
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
                    {program.currency}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.investors")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.investorsCount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.available-to-invest")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {`${formatCurrencyValue(
                      program.availableToInvest,
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
                      start={program.periodStarts}
                      end={program.periodEnds}
                    />
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.age")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {localizedDate(program.creationDate)}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.drawdown")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <NumberFormat
                      value={formatValue(program.chart.drawdown, 2)}
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
                      value={formatValue(program.chart.profit, 2)}
                      prefix={PROFITABILITY_PREFIX.SIGN}
                    >
                      <NumberFormat
                        value={formatValue(program.chart.profit, 2)}
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
                    to={programLinkProps}
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
  program: ProgramDetailsList;
  isAuthenticated?: boolean;
  toggleFavorite: TableToggleFavoriteHandlerType;
  onCollapseClick(): void;
}

const ProgramTableRowDetailed = React.memo(_ProgramTableRowDetailed);
export default ProgramTableRowDetailed;
