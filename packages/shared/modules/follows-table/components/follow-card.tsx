import { ProgramDetailsList } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn
} from "shared/components/table/components/table-card/table-card";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import TagProgramContainer from "shared/components/tags/tag-program-container/tag-program-container";
import { TAnchor, TEvent } from "shared/hooks/anchor.hook";
import { composeFollowDetailsUrl } from "shared/utils/compose-url";
import { distanceDate } from "shared/utils/dates";
import {
  formatValue,
  formatValueDifferentDecimalScale
} from "shared/utils/formatter";

interface Props {
  follow: ProgramDetailsList;
  toggleFavorite: TableToggleFavoriteHandlerType;
  title: string;
}

const DECIMAL_SCALE_SMALL_VALUE = 4;
const DECIMAL_SCALE_BIG_VALUE = 2;

const _FollowCard: React.FC<Props> = ({ follow, toggleFavorite, title }) => {
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
  const requestCurrency = follow.balance.currency;
  const renderActions = ({
    clearAnchor,
    anchor
  }: {
    clearAnchor: (event: TEvent) => void;
    anchor: TAnchor;
  }) => (
    <Popover
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      anchorEl={anchor}
      noPadding
      onClose={clearAnchor}
    >
      <div className="popover-list">
        <Link to={linkProps}>
          <GVButton variant="text" color="secondary" onClick={clearAnchor}>
            {t("program-actions.details")}
          </GVButton>
        </Link>
        {follow.personalDetails && !follow.personalDetails.isFavorite && (
          <GVButton
            variant="text"
            color="secondary"
            onClick={handleToggleFavorite}
          >
            {t("follow-actions.add-to-favorites")}
          </GVButton>
        )}
        {follow.personalDetails && follow.personalDetails.isFavorite && (
          <GVButton
            variant="text"
            color="secondary"
            onClick={handleToggleFavorite}
          >
            {t("follow-actions.remove-from-favorites")}
          </GVButton>
        )}
      </div>
    </Popover>
  );
  return (
    <TableCard
      asset={follow}
      detailsUrl={linkProps}
      pathTitle={title}
      // profit={follow.chart.profit}
      // profitPercent={follow.chart.profit}
      renderActions={renderActions}
      extraBlock={follow.tags && <TagProgramContainer tags={follow.tags} />}
    >
      <TableCardTable>
        <TableCardTableColumn>
          <StatisticItem label={t("follows-page.header.subscribers")}>
            {t("follows-page.header.subscribers")}
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("follows-page.header.trades")}>
            {/*<NumberFormat*/}
            {/*  value={follow.statistic.tradesCount}*/}
            {/*  displayType="text"*/}
            {/*  decimalScale={0}*/}
            {/*/>*/}
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem
            label={t("programs-page.programs-header.available-to-invest")}
          >
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                follow.availableToInvest,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
              suffix={` ${requestCurrency}`}
            />
          </StatisticItem>
        </TableCardTableColumn>
      </TableCardTable>
    </TableCard>
  );
};

const FollowCard = React.memo(_FollowCard);
export default FollowCard;
