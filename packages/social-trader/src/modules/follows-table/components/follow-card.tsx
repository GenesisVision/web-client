import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { useToLink } from "components/link/link.helper";
import TableCard, {
  IWithOffset,
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
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET } from "constants/constants";
import { FollowDetailsListItem } from "gv-api-web";
import InvestDefaultPopup from "modules/invest-popup/invest-default-popup";
import FollowButton from "pages/invest/follows/follow-details/follow-button";
import FollowFeesBlock from "pages/invest/follows/follow-details/follow-popup/follow-fees-block";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { managerToPathCreator } from "routes/manager.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { formatValue } from "utils/formatter";

const _FollowCard: React.FC<Props> = ({
  withOffset,
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

  const renderFollowTagsBlock = useCallback(() => <DetailsTags tags={tags} />, [
    tags
  ]);

  const renderFollowFeesBlock = useCallback(
    () => (
      <FollowFeesBlock
        currency={follow.currency}
        successFee={follow.successFee}
        volumeFee={follow.volumeFee}
      />
    ),
    [follow]
  );

  const renderFollowPopup = useCallback(
    (popupTop: JSX.Element, form: JSX.Element) => (
      <InvestDefaultPopup
        popupTop={popupTop}
        ownerUrl={follow.owner.url}
        assetColor={follow.color}
        assetLogo={follow.logoUrl}
        AssetDetailsExtraBlock={renderFollowTagsBlock}
        AssetFeesBlock={renderFollowFeesBlock}
        brokerName={follow.brokerDetails.name}
        brokerLogo={follow.brokerDetails.logoUrl}
        title={follow.title}
        assetOwner={follow.owner.username}
        form={form}
      />
    ),
    [follow]
  );

  const renderActions = ({ clearAnchor, anchor }: IRenderActionsArgs) => (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      <TableCardActionsItem to={linkProps} onClick={clearAnchor}>
        {t("asset-actions.details")}
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
      withOffset={withOffset}
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
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t(
                  "dashboard-page:tooltips.trading.subscribers"
                )}
                labelText={t("header-fields.subscribers")}
              />
            }
          >
            <NumberFormat
              value={subscribersCount}
              displayType="text"
              decimalScale={0}
            />
          </LabeledValue>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t("dashboard-page:tooltips.trading.trades")}
                labelText={t("header-fields.trades")}
              />
            }
          >
            <NumberFormat
              value={tradesCount}
              displayType="text"
              decimalScale={0}
            />
          </LabeledValue>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t("dashboard-page:tooltips.investing.ddown")}
                labelText={t("header-fields.drawdown")}
              />
            }
          >
            <NumberFormat
              value={formatValue(drawdown, 2)}
              displayType="text"
              suffix="%"
            />
          </LabeledValue>
        </TableCardTableColumn>
      </TableCardTable>
      {withFollowButton && (
        <TableCardTableButtons>
          <FollowButton
            renderAssetPopup={renderFollowPopup}
            title={follow.title}
            canFollow={true}
            onApply={onApply}
            id={follow.id}
            currency={follow.currency}
            isExternal={follow.isExternal}
            broker={follow.brokerDetails.type}
            brokerId={follow.brokerDetails.id}
            leverage={follow.leverageMax}
          />
        </TableCardTableButtons>
      )}
    </TableCard>
  );
};

interface Props extends IWithOffset {
  onApply?: VoidFunction;
  withFollowButton?: boolean;
  follow: FollowDetailsListItem;
}

const FollowCard = React.memo(_FollowCard);
export default FollowCard;
