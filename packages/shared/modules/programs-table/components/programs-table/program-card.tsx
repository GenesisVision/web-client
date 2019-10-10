import { ProgramDetailsOld } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { useCallback } from "react";
import NumberFormat from "react-number-format";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import GVButton from "shared/components/gv-button";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Link from "shared/components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import TagProgramContainer from "shared/components/tags/tag-program-container/tag-program-container";
import useAnchor from "shared/hooks/anchor.hook";
import { useTranslation } from "shared/i18n";
import {
  composeManagerDetailsUrl,
  composeProgramDetailsUrl
} from "shared/utils/compose-url";
import {
  formatValue,
  formatValueDifferentDecimalScale
} from "shared/utils/formatter";

interface Props {
  program: ProgramDetailsOld;
  toggleFavorite: TableToggleFavoriteHandlerType;
  title: string;
}

const DECIMAL_SCALE_SMALL_VALUE = 4;
const DECIMAL_SCALE_BIG_VALUE = 2;

const _ProgramCard: React.FC<Props> = ({ program, toggleFavorite, title }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleToggleFavorite = useCallback(
    () =>
      toggleFavorite(
        program.id,
        program.personalDetails && program.personalDetails.isFavorite
      ),
    [program.id, program.personalDetails, toggleFavorite]
  );
  const { t } = useTranslation();
  const linkProps = {
    pathname: composeProgramDetailsUrl(program.url),
    state: `/ ${title}`
  };
  const requestCurrency = program.statistic.balance.currency;
  return (
    <div className="table-cards__card">
      <div className="table-cards__row">
        <div className="table-cards__avatar">
          <Link to={linkProps}>
            <AssetAvatar
              url={program.logo}
              levelProgress={program.levelProgress}
              level={program.level}
              alt={program.title}
              color={program.color}
              size="medium"
              tooltip={
                <LevelTooltip level={program.level} canLevelUp={false} />
              }
            />
          </Link>
        </div>
        <div className="table-cards__main-info">
          <div className="table-cards__title-wrapper">
            <Link className="table-cards__title" to={linkProps}>
              {program.title}
            </Link>
            <Link
              className="table-cards__name"
              to={{
                pathname: "/managers/[id]",
                as: composeManagerDetailsUrl(program.manager.url),
                state: `/ ${title}`
              }}
            >
              {program.manager.username}
            </Link>
          </div>
          <div className="table-cards__actions">
            <ActionsCircleIcon primary={!!anchor} onClick={setAnchor} />
            <Popover
              horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
              vertical={VERTICAL_POPOVER_POS.BOTTOM}
              anchorEl={anchor}
              noPadding
              onClose={clearAnchor}
            >
              <div className="popover-list">
                <Link to={linkProps}>
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={clearAnchor}
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
          <TagProgramContainer tags={program.tags} />
        </div>
      </div>
      <div className="table-cards__row">
        <div className="table-cards__chart">
          {program.chart && (
            <ProgramSimpleChart data={program.chart} programId={program.id} />
          )}
        </div>
        <div className="table-cards__chart-info">
          <div className="table-cards__profit">
            <Profitability
              value={formatValue(program.statistic.profitPercent, 2)}
              variant={PROFITABILITY_VARIANT.CHIPS}
              prefix={PROFITABILITY_PREFIX.ARROW}
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
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                program.statistic.balance.amount,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              suffix={` ${requestCurrency}`}
              displayType="text"
            />
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
          <StatisticItem label={t("programs-page.programs-header.age")}>
            {moment(program.creationDate).fromNow(true)}
          </StatisticItem>
        </div>
        <div className="table-cards__table-column">
          <StatisticItem
            label={t("programs-page.programs-header.available-to-invest")}
          >
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                program.availableInvestmentInCurrency,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
              suffix={` ${requestCurrency}`}
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
};

const ProgramCard = React.memo(_ProgramCard);
export default ProgramCard;
