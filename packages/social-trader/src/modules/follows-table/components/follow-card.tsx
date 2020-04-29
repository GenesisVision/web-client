import { useToLink } from "components/link/link.helper";
import StatisticItem from "components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableButtons,
  TableCardTableColumn
} from "components/table/components/table-card/table-card";
import {
  IRenderActionsArgs,
  TableCardActions,
  TableCardActionsItem,
  TableCardFavoriteActionItem
} from "components/table/components/table-card/table-card-actions";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ASSET } from "constants/constants";
import { FollowDetailsListItem } from "gv-api-web";
import FollowButton from "pages/invest/follows/follow-details/follow-button";
import * as React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { formatValue } from "utils/formatter";

const _FollowCard: React.FC<Props> = ({
  follow,
  withFollowButton,
  onApply
}) => {
  const [followState, setFollowState] = useState(follow);
  const {
    tags,
    tradesCount,
    subscribersCount,
    url,
    statistic: { drawdown }
  } = follow;
  const { linkCreator, contextTitle } = useToLink();
  const { t } = useTranslation();
  const linkProps = linkCreator(
    composeFollowDetailsUrl(url),
    FOLLOW_DETAILS_FOLDER_ROUTE
  );
  const handleUpdateRow = useCallback(follow => {
    setFollowState(follow);
  }, []);
  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={linkProps} onClick={clearAnchor}>
        {t("program-actions.details")}
      </TableCardActionsItem>
      {follow.personalDetails && (
        <TableCardFavoriteActionItem
          updateRow={handleUpdateRow}
          asset={followState}
          assetType={ASSET.FOLLOW}
          id={follow.id}
          isFavorite={followState.personalDetails.isFavorite}
        />
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
      logo={follow.logoUrl}
      managerUrl={managerToPathCreator(follow.owner.url, contextTitle)}
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
      {withFollowButton && (
        <TableCardTableButtons>
          <FollowButton
            canFollow={true}
            onApply={onApply}
            id={follow.id}
            currency={follow.currency}
            isExternal={follow.isExternal}
            broker={follow.brokerType}
            brokerId={follow.brokerId}
            leverage={follow.leverageMax}
          />
        </TableCardTableButtons>
      )}
    </TableCard>
  );
};

interface Props {
  onApply?: VoidFunction;
  withFollowButton?: boolean;
  follow: FollowDetailsListItem;
}

const FollowCard = React.memo(_FollowCard);
export default FollowCard;
