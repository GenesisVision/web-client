import { ProgramDetailsOld } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
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
import {
  composeFollowDetailsUrl,
  composeManagerDetailsUrl
} from "shared/utils/compose-url";
import { distanceDate } from "shared/utils/dates";
import {
  formatValue,
  formatValueDifferentDecimalScale
} from "shared/utils/formatter";

interface Props {
  follow: ProgramDetailsOld;
  toggleFavorite: TableToggleFavoriteHandlerType;
  title: string;
}

const DECIMAL_SCALE_SMALL_VALUE = 4;
const DECIMAL_SCALE_BIG_VALUE = 2;

const _FollowCard: React.FC<Props> = ({ follow, toggleFavorite, title }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleToggleFavorite = useCallback(
    () =>
      toggleFavorite(
        follow.id,
        follow.personalDetails && follow.personalDetails.isFavorite
      ),
    [follow.id, follow.personalDetails, toggleFavorite]
  );
  const { t } = useTranslation();
  const linkProps = {
    pathname: composeFollowDetailsUrl(follow.url),
    state: `/ ${title}`
  };
  const requestCurrency = follow.statistic.balance.currency;
  return (
    <div className="table-cards__card">
      <div className="table-cards__row">
        <div className="table-cards__avatar">
          <Link to={linkProps}>
            <AssetAvatar
              url={follow.logo}
              levelProgress={follow.levelProgress}
              level={follow.level}
              alt={follow.title}
              color={follow.color}
              size="medium"
              tooltip={<LevelTooltip level={follow.level} canLevelUp={false} />}
            />
          </Link>
        </div>
        <div className="table-cards__main-info">
          <div className="table-cards__title-wrapper">
            <Link className="table-cards__title" to={linkProps}>
              {follow.title}
            </Link>
            <Link
              className="table-cards__name"
              to={{
                pathname: "/managers/[id]",
                as: composeManagerDetailsUrl(follow.manager.url),
                state: `/ ${title}`
              }}
            >
              {follow.manager.username}
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
                {follow.personalDetails && !follow.personalDetails.isFavorite && (
                  <GVButton
                    variant="text"
                    color="secondary"
                    onClick={handleToggleFavorite}
                  >
                    {t("program-actions.add-to-favorites")}
                  </GVButton>
                )}
                {follow.personalDetails && follow.personalDetails.isFavorite && (
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
          <TagProgramContainer tags={follow.tags} />
        </div>
      </div>
      <div className="table-cards__row">
        <div className="table-cards__chart">
          {follow.chart && (
            <ProgramSimpleChart data={follow.chart} programId={follow.id} />
          )}
        </div>
        <div className="table-cards__chart-info">
          <div className="table-cards__profit">
            <Profitability
              value={formatValue(follow.statistic.profitPercent, 2)}
              variant={PROFITABILITY_VARIANT.CHIPS}
              prefix={PROFITABILITY_PREFIX.ARROW}
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
      <div className="table-cards__table">
        <div className="table-cards__table-column">
          <StatisticItem label={t("follows-page.header.subscribers")}>
            {t("follows-page.header.subscribers")}
          </StatisticItem>
        </div>
        <div className="table-cards__table-column">
          <StatisticItem label={t("follows-page.header.trades")}>
            <NumberFormat
              value={follow.statistic.tradesCount}
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
                follow.availableInvestmentInCurrency,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
              suffix={` ${requestCurrency}`}
            />
          </StatisticItem>
        </div>
      </div>
    </div>
  );
};

const FollowCard = React.memo(_FollowCard);
export default FollowCard;
