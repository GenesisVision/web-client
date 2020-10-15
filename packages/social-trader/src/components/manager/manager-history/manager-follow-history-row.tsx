import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { ManagerHistoryRow } from "components/manager/manager-history/manager-history-row";
import {
  ManagerHistoryChartContainer,
  ManagerHistoryItem
} from "components/manager/manager-history/manager-history-styles";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ASSET } from "constants/constants";
import { FollowDetailsListItem } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";

interface IManagerHistoryRowProps {
  asset: FollowDetailsListItem;
}

const _ManagerFollowHistoryRow: React.FC<IManagerHistoryRowProps> = ({
  asset
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  const linkProps = linkCreator(
    composeFollowDetailsUrl(asset.url),
    FOLLOW_DETAILS_FOLDER_ROUTE
  );
  return (
    <ManagerHistoryRow
      asset={asset}
      assetType={ASSET.PROGRAM}
      avatarBlock={
        <Link noColor to={linkProps}>
          <AssetAvatarWithName
            url={asset.logoUrl}
            alt={asset.title}
            color={asset.color}
            name={<>{asset.title}</>}
          />
        </Link>
      }
      tileBlock={<TagProgramContainer tags={asset.tags} />}
      dataBlock={
        <>
          <ManagerHistoryItem label={t("header-fields.equity")}>
            <NumberFormat
              value={formatCurrencyValue(
                asset.balance.amount,
                asset.balance.currency
              )}
              suffix={` ${asset.balance.currency}`}
              displayType="text"
            />
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.subscribers")}>
            {asset.subscribersCount}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.age")}>
            {distanceDate(asset.creationDate)}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.trades")}>
            {asset.tradesCount}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.drawdown")}>
            <NumberFormat
              value={formatValue(asset.statistic.drawdown, 2)}
              suffix="%"
              displayType="text"
            />
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.profit")}>
            <Profitability
              value={formatValue(asset.statistic.profit, 2)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatValue(asset.statistic.profit, 2)}
                suffix="%"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </ManagerHistoryItem>
          <ManagerHistoryChartContainer bottomOffset>
            <ProgramSimpleChart data={asset.statistic?.chart} />
          </ManagerHistoryChartContainer>
        </>
      }
    />
  );
};

export const ManagerFollowHistoryRow = React.memo(_ManagerFollowHistoryRow);
