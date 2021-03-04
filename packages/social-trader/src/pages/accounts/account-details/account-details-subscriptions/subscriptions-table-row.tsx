import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import { Center } from "components/center/center";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import InvestDefaultPopup from "modules/invest-popup/invest-default-popup";
import { AccountSubscriptionsDataType } from "pages/accounts/account-details/services/account-details.types";
import EditFollowButton from "pages/invest/follows/follow-details/edit-follow-button";
import FollowFeesBlock from "pages/invest/follows/follow-details/follow-popup/follow-fees-block";
import UnFollowButton from "pages/invest/follows/follow-details/unfollow-button";
import React, { useCallback } from "react";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { formatDate } from "utils/dates";
import { CurrencyEnum } from "utils/types";

const _SubscriptionsTableRow: React.FC<Props> = ({
  id,
  provider,
  onApply,
  assetCurrency
}) => {
  const {
    assetOwner,
    assetBrokerDetails,
    assetTags,
    volumeFeePersonal,
    successFeePersonal,
    fixedVolume,
    fixedCurrency,
    percent,
    status,
    isExternal,
    subscriptionDate,
    totalProfit,
    openTolerancePercent,
    mode,
    asset: { url, title, logoUrl, color, programDetails }
  } = provider;
  const { linkCreator } = useToLink();
  const level = programDetails ? programDetails.level : undefined;
  const levelProgress = programDetails
    ? programDetails.levelProgress
    : undefined;

  const renderAssetDetailsExtraBlock = useCallback(
    () => <DetailsTags tags={assetTags} />,
    [provider]
  );

  const renderAssetFeesBlock = useCallback(
    () => (
      <FollowFeesBlock
        currency={"USDT"}
        successFee={provider.successFee}
        volumeFee={provider.volumeFee}
      />
    ),
    [provider]
  );

  const renderAssetPopup = useCallback(
    (popupTop: JSX.Element, form: JSX.Element) => (
      <InvestDefaultPopup
        popupTop={popupTop}
        ownerUrl={assetOwner.logoUrl}
        assetColor={color}
        assetLogo={logoUrl}
        AssetDetailsExtraBlock={renderAssetDetailsExtraBlock}
        AssetFeesBlock={renderAssetFeesBlock}
        brokerName={assetBrokerDetails.name}
        brokerLogo={assetBrokerDetails.logoUrl}
        title={title}
        assetOwner={assetOwner.username}
        form={form}
      />
    ),
    [provider]
  );

  return (
    <TableRow stripy>
      <TableCell>
        <Link
          noColor
          to={linkCreator(
            composeFollowDetailsUrl(url),
            FOLLOW_DETAILS_FOLDER_ROUTE
          )}
        >
          <AssetAvatarWithName
            url={logoUrl}
            alt={title}
            color={color}
            level={level}
            levelProgress={levelProgress}
            name={title}
          />
        </Link>
      </TableCell>
      <TableCell>
        <Profitability value={totalProfit} prefix={PROFITABILITY_PREFIX.SIGN}>
          {Math.abs(totalProfit)}
        </Profitability>
      </TableCell>
      <TableCell>{formatDate(subscriptionDate)}</TableCell>
      <TableCell>{mode}</TableCell>
      <TableCell>
        {percent && <>{percent} %</>}
        {fixedVolume && (
          <>
            {fixedVolume} {fixedCurrency}
          </>
        )}
        {percent === null && fixedVolume === null && <> - </>}
      </TableCell>
      <TableCell>{openTolerancePercent} %</TableCell>
      <TableCell>{volumeFeePersonal} %</TableCell>
      <TableCell>{successFeePersonal} %</TableCell>
      <TableCell>
        {status !== "Canceled" && (
          <Center>
            <RowItem size={"large"}>
              <EditFollowButton
                renderAssetPopup={renderAssetPopup}
                title={title}
                size={"middle"}
                signalSubscription={provider}
                onApply={onApply}
                currency={assetCurrency}
                id={provider.asset.id}
                tradingAccountId={id}
              />
            </RowItem>
            <RowItem size={"large"}>
              <UnFollowButton
                renderAssetPopup={renderAssetPopup}
                title={title}
                size={"middle"}
                onApply={onApply}
                id={provider.asset.id}
                tradingAccountId={id}
                isExternal={isExternal}
              />
            </RowItem>
          </Center>
        )}
      </TableCell>
    </TableRow>
  );
};

interface Props {
  id: string;
  assetCurrency: CurrencyEnum;
  onApply: VoidFunction;
  provider: AccountSubscriptionsDataType;
}

const SubscriptionsTableRow = React.memo(_SubscriptionsTableRow);
export default SubscriptionsTableRow;
