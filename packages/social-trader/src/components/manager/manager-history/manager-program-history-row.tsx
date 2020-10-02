import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { ManagerHistoryRow } from "components/manager/manager-history/manager-history-row";
import {
  ManagerHistoryChartContainer,
  ManagerHistoryItem
} from "components/manager/manager-history/manager-history-styles";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ASSET, STATUS } from "constants/constants";
import { ProgramDetailsListItem } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/programs.routes";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";

interface IManagerHistoryRowProps {
  asset: ProgramDetailsListItem;
}

const _ManagerProgramHistoryRow: React.FC<IManagerHistoryRowProps> = ({
  asset
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  const programLinkProps = linkCreator(
    composeProgramDetailsUrl(asset.url),
    PROGRAM_DETAILS_FOLDER_ROUTE
  );
  return (
    <ManagerHistoryRow
      asset={asset}
      assetType={ASSET.PROGRAM}
      avatarBlock={
        <Link noColor to={programLinkProps}>
          <AssetAvatarWithName
            url={asset.logoUrl}
            level={asset.level}
            levelProgress={asset.levelProgress}
            alt={asset.title}
            color={asset.color}
            tooltip={<LevelTooltip level={asset.level} canLevelUp={false} />}
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
          <ManagerHistoryItem label={t("header-fields.investors")}>
            {asset.investorsCount}
          </ManagerHistoryItem>
          <ManagerHistoryItem label={t("header-fields.available-to-invest")}>
            <NumberFormat
              value={formatCurrencyValue(
                asset.availableToInvest,
                asset.balance.currency
              )}
              suffix={` ${asset.balance.currency}`}
              displayType="text"
            />
          </ManagerHistoryItem>
          {asset.periodStarts && (
            <ManagerHistoryItem label={t("header-fields.period")}>
              <ProgramPeriodPie
                condition={asset.status !== STATUS.CLOSED}
                loader={t("program-period.program-closed")}
                start={asset.periodStarts}
                end={asset.periodEnds}
              />
            </ManagerHistoryItem>
          )}
          <ManagerHistoryItem label={t("header-fields.age")}>
            {distanceDate(asset.creationDate)}
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

export const ManagerProgramHistoryRow = React.memo(_ManagerProgramHistoryRow);
