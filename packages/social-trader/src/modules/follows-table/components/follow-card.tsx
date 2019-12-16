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
import { FollowDetailsListItem } from "gv-api-web";
import FollowButton from "pages/follows/follow-details/follow-button";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { managerToPathCreator } from "routes/manager.routes";
import { ASSET } from "shared/constants/constants";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { formatValue } from "utils/formatter";

const _FollowCard: React.FC<Props> = ({
  follow,
  title,
  withFollowButton,
  onApply
}) => {
  const {
    tags,
    tradesCount,
    subscribersCount,
    url,
    statistic: { drawdown }
  } = follow;
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
      {follow.personalDetails && (
        <TableCardFavoriteActionItem
          withDispatch
          assetType={ASSET.FOLLOW}
          id={follow.id}
          isFavorite={follow.personalDetails.isFavorite}
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
      {withFollowButton && (
        <TableCardTableButtons>
          <FollowButton
            onApply={onApply}
            id={follow.id}
            currency={follow.currency}
            title={""}
            isExternal={follow.isExternal}
            broker={"MetaTrader4"}
            brokerId={follow.brokerId}
            hasSignalAccount={true}
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
  title: string;
}

const FollowCard = React.memo(_FollowCard);
export default FollowCard;
