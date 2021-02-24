import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import { Center } from "components/center/center";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { SignalSubscription } from "gv-api-web";
import EditFollowButton from "pages/invest/follows/follow-details/edit-follow-button";
import UnFollowButton from "pages/invest/follows/follow-details/unfollow-button";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { ACCOUNT_DETAILS_FOLDER_ROUTE } from "routes/accounts.routes";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import {
  composeAccountDetailsUrl,
  composeFollowDetailsUrl
} from "utils/compose-url";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _SubscriptionTableRow: React.FC<Props> = ({
  title,
  renderAssetPopup,
  id,
  onApply,
  data: subscriptionInfo,
  assetCurrency
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  const link = subscriptionInfo.subscriberInfo.asset
    ? linkCreator(
      composeFollowDetailsUrl(subscriptionInfo.subscriberInfo.asset.url),
      FOLLOW_DETAILS_FOLDER_ROUTE
    )
    : linkCreator(
      composeAccountDetailsUrl(
        subscriptionInfo.subscriberInfo.tradingAccountId
      ),
      ACCOUNT_DETAILS_FOLDER_ROUTE
    );
  const name = subscriptionInfo.subscriberInfo.asset ? (
    <AssetAvatarWithName
      url={subscriptionInfo.subscriberInfo.asset.logoUrl}
      alt={subscriptionInfo.subscriberInfo.asset.title}
      color={subscriptionInfo.subscriberInfo.asset.color}
      level={subscriptionInfo.subscriberInfo.asset.programDetails?.level}
      levelProgress={
        subscriptionInfo.subscriberInfo.asset.programDetails?.levelProgress
      }
      name={subscriptionInfo.subscriberInfo.asset.title}
    />
  ) : (
      subscriptionInfo.subscriberInfo.tradingAccountLogin
    );
  return (
    <TableRow>
      <TableCell>
        <Link white to={link}>
          {name}
        </Link>
      </TableCell>
      <TableCell>
        <NumberFormat
          value={formatCurrencyValue(
            subscriptionInfo.totalProfit,
            assetCurrency
          )}
          suffix={` ${assetCurrency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell>{subscriptionInfo.status}</TableCell>
      <TableCell>
        <TooltipLabel
          tooltipContent={t(
            `follow-program.modes.${subscriptionInfo.mode.toLowerCase()}.tooltip`
          )}
          labelText={subscriptionInfo.mode}
        />
      </TableCell>
      <TableCell>
        {subscriptionInfo.percent && <>{subscriptionInfo.percent} %</>}
        {subscriptionInfo.fixedVolume && (
          <>
            {subscriptionInfo.fixedVolume} {subscriptionInfo.fixedCurrency}
          </>
        )}
        {subscriptionInfo.percent === null &&
          subscriptionInfo.fixedVolume === null && <> - </>}
      </TableCell>
      <TableCell>{subscriptionInfo.openTolerancePercent} %</TableCell>
      <TableCell>
        {subscriptionInfo.volumeFeePersonal !== undefined &&
          subscriptionInfo.volumeFeePersonal !== null && (
            <NumberFormat
              value={subscriptionInfo.volumeFeePersonal}
              suffix={` %`}
              displayType="text"
            />
          )}
      </TableCell>
      <TableCell>
        {subscriptionInfo.successFeePersonal !== undefined &&
          subscriptionInfo.successFeePersonal !== null && (
            <NumberFormat
              value={subscriptionInfo.successFeePersonal}
              suffix={` %`}
              displayType="text"
            />
          )}
      </TableCell>
      <TableCell>
        <Center>
          <RowItem>
            <EditFollowButton
              title={title}
              renderAssetPopup={renderAssetPopup}
              size={"middle"}
              signalSubscription={subscriptionInfo}
              onApply={onApply}
              currency={assetCurrency}
              tradingAccountId={
                subscriptionInfo.subscriberInfo.tradingAccountId
              }
              id={id}
            />
          </RowItem>
          <RowItem>
            <UnFollowButton
              title={title}
              renderAssetPopup={renderAssetPopup}
              size={"middle"}
              onApply={onApply}
              id={id}
              tradingAccountId={
                subscriptionInfo.subscriberInfo.tradingAccountId
              }
              isExternal={subscriptionInfo.isExternal}
            />
          </RowItem>
        </Center>
      </TableCell>
    </TableRow>
  );
};

interface Props {
  title: string;
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  assetCurrency: CurrencyEnum;
  data: SignalSubscription;
  onApply: VoidFunction;
  id: string;
}

export const SubscriptionTableRow = React.memo(_SubscriptionTableRow);
