import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import {
  ManagerHistoryItem,
  ManagerHistoryRow
} from "components/manager/manager-history/manager-history-row";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { RowItem } from "components/row-item/row-item";
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

import styles from "./manager-history-row.module.scss";

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
        <Link to={linkProps}>
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
          <ManagerHistoryItem label={t("follows-page.header.equity")}>
            <NumberFormat
              value={formatCurrencyValue(
                asset.balance.amount,
                asset.balance.currency
              )}
              suffix={` ${asset.balance.currency}`}
              displayType="text"
            />
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("follows-page.header.subscribers")}>
            {asset.subscribersCount}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("follows-page.header.age")}>
            {distanceDate(asset.creationDate)}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("follows-page.header.trades")}>
            {asset.tradesCount}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("follows-page.header.drawdown")}>
            <NumberFormat
              value={formatValue(asset.statistic.drawdown, 2)}
              suffix="%"
              displayType="text"
            />
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("follows-page.header.profit")}>
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
          <RowItem
            bottomOffset
            className={styles["manager-history-row__chart"]}
          >
            <ProgramSimpleChart data={asset.statistic?.chart} />
          </RowItem>
        </>
      }
    />
  );
};

export const ManagerFollowHistoryRow = React.memo(_ManagerFollowHistoryRow);
