import StatisticItem from "components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn
} from "components/table/components/table-card/table-card";
import {
  IRenderActionsArgs,
  TableCardActions,
  TableCardActionsItem
} from "components/table/components/table-card/table-card-actions";
import { TableToggleFavoriteHandlerType } from "components/table/components/table.types";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { FollowDetailsList } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { managerToPathCreator } from "routes/manager.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { formatValue } from "utils/formatter";

interface Props {
  follow: FollowDetailsList;
  toggleFavorite: TableToggleFavoriteHandlerType;
  title: string;
}

const _FollowCard: React.FC<Props> = ({ follow, toggleFavorite, title }) => {
  const {
    tags,
    tradesCount,
    subscribersCount,
    url,
    statistic: { drawdown }
  } = follow;
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
    pathname: composeFollowDetailsUrl(url),
    state: `/ ${title}`
  };
  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={linkProps} onClick={clearAnchor}>
        {t("program-actions.details")}
      </TableCardActionsItem>
      {follow.personalDetails && !follow.personalDetails.isFavorite && (
        <TableCardActionsItem onClick={handleToggleFavorite}>
          {t("follow-actions.add-to-favorites")}
        </TableCardActionsItem>
      )}
      {follow.personalDetails && follow.personalDetails.isFavorite && (
        <TableCardActionsItem onClick={handleToggleFavorite}>
          {t("follow-actions.remove-from-favorites")}
        </TableCardActionsItem>
      )}
    </TableCardActions>
  );
  return (
    <TableCard
      assetId={follow.id}
      profit={follow.statistic.profit}
      chart={follow.statistic.chart}
      color={follow.color}
      hasAvatar
      subTitle={follow.owner.username}
      logo={follow.logo}
      managerUrl={managerToPathCreator(follow.owner.url, title)}
      title={follow.title}
      detailsUrl={linkProps}
      renderActions={renderActions}
      extraBlock={tags && <TagProgramContainer tags={tags} />}
    >
      <TableCardTable>
        <TableCardTableColumn>
          <StatisticItem label={t("follows-page.header.subscribers")}>
            <NumberFormat
              value={subscribersCount}
              displayType="text"
              decimalScale={0}
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("follows-page.header.trades")}>
            <NumberFormat
              value={tradesCount}
              displayType="text"
              decimalScale={0}
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.drawdown")}>
            <NumberFormat
              value={formatValue(drawdown, 2)}
              displayType="text"
              suffix="%"
            />
          </StatisticItem>
        </TableCardTableColumn>
      </TableCardTable>
    </TableCard>
  );
};

const FollowCard = React.memo(_FollowCard);
export default FollowCard;
