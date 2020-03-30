import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import { GV_BTN_SIZE } from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { AccountSubscriptionsDataType } from "pages/accounts/account-details/services/account-details.types";
import EditFollowButton from "pages/invest/follows/follow-details/edit-follow-button";
import UnFollowButton from "pages/invest/follows/follow-details/unfollow-button";
import React from "react";
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
  return (
    <TableRow stripy>
      <TableCell>
        <Link
          to={linkCreator(
            composeFollowDetailsUrl(url),
            FOLLOW_DETAILS_FOLDER_ROUTE
          )}
        >
          <div className="subscriptions-table__center-cell">
            <AssetAvatarWithName
              url={logoUrl}
              alt={title}
              color={color}
              level={level}
              levelProgress={levelProgress}
              name={title}
            />
          </div>
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
        <div className="subscriptions-table__center-cell subscriptions-table__center-cell--buttons">
          <div className="subscriptions-table__buttons-cell-item--first">
            {openTolerancePercent} %
          </div>
        </div>
      </TableCell>
      <TableCell>
        {percent && <>{percent} %</>}
        {fixedVolume && (
          <>
            {fixedVolume} {fixedCurrency}
          </>
        )}
        {percent === null && fixedVolume === null && <> - </>}
      </TableCell>
      <TableCell>{volumeFeePersonal} %</TableCell>
      <TableCell>{successFeePersonal} %</TableCell>
      <TableCell>
        {status !== "Canceled" && (
          <div className="subscriptions-table__center-cell">
            <div className="subscriptions-table__buttons-cell-item">
              <EditFollowButton
                size={GV_BTN_SIZE.MIDDLE}
                signalSubscription={provider}
                onApply={onApply}
                currency={assetCurrency}
                id={provider.asset.id}
                tradingAccountId={id}
              />
            </div>
            <div className="subscriptions-table__buttons-cell-item ">
              <UnFollowButton
                size={GV_BTN_SIZE.MIDDLE}
                onApply={onApply}
                id={provider.asset.id}
                tradingAccountId={id}
                isExternal={isExternal}
              />
            </div>
          </div>
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
