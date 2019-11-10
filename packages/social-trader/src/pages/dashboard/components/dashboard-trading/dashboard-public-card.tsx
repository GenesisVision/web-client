import { DashboardTradingAsset } from "gv-api-web";
import ClosePeriodButton from "modules/asset-settings/close-period/close-period-button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import ChangeAccountPasswordButton from "pages/programs/programs-settings/change-password/change-password-trading-account.button";
import React, { useContext } from "react";
import NumberFormat from "react-number-format";
import GVButton from "shared/components/gv-button";
import Link, { ToType } from "shared/components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn
} from "shared/components/table/components/table-card/table-card";
import {
  ASSET,
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "shared/constants/constants";
import { TAnchor, TEvent } from "shared/hooks/anchor.hook";
import { useTranslation } from "shared/i18n";
import { META_TRADER_4_ROUTE } from "shared/routes/trade.routes";
import {
  composeProgramDetailsUrl,
  composeProgramSettingsUrl
} from "shared/utils/compose-url";
import { distanceDate } from "shared/utils/dates";
import { formatValueDifferentDecimalScale } from "shared/utils/formatter";

import { TitleContext } from "../../dashboard.constants";

const _DashboardPublicCard: React.FC<{
  asset: DashboardTradingAsset;
}> = ({ asset }) => {
  const title = useContext(TitleContext);
  const [t] = useTranslation();
  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.ACCOUNT,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = {
    pathname: makeProgramLinkMethod(asset.id),
    state: `/ ${title}`
  };
  const detailsLink = {
    pathname: composeProgramDetailsUrl(
      asset.publicInfo && asset.publicInfo.url
    ),
    state: `/ ${title}`
  };
  const settingsLink = {
    pathname: composeProgramSettingsUrl(
      asset.publicInfo && asset.publicInfo.url
    ),
    state: `/ ${title}`
  };

  const assetTitle = asset.publicInfo ? asset.publicInfo.title : asset.id;
  const assetColor = asset.publicInfo ? asset.publicInfo.color : "";
  const assetLogo = asset.publicInfo ? asset.publicInfo.logo : "";
  const renderActions = ({
    anchor,
    clearAnchor
  }: {
    anchor: TAnchor;
    clearAnchor: (event: TEvent) => void;
  }) => (
    <DashboardPublicCardActions
      anchor={anchor}
      clearAnchor={clearAnchor}
      id={asset.id}
      settingsLink={settingsLink}
      showChangePassword={asset.actions.canChangePassword}
      showClosePeriod={asset.assetType === ASSET.PROGRAM}
      showTerminal={asset.assetType === ASSET.PROGRAM}
    />
  );
  return (
    <TableCard
      hasAvatar
      subTitle={asset.assetType}
      title={assetTitle}
      color={assetColor}
      logo={assetLogo}
      detailsUrl={detailsLink}
      assetId={asset.id}
      profit={asset.statistic.profit}
      chart={asset.statistic.chart}
      renderActions={renderActions}
    >
      <TableCardTable>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.equity")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.accountInfo.balance,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              suffix={` ${asset.accountInfo.currency}`}
              displayType="text"
            />
          </StatisticItem>
          {asset.broker && (
            <StatisticItem label={t("dashboard-page.trading.broker")}>
              {asset.broker.name}
            </StatisticItem>
          )}
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.ddown")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.statistic.drawdown,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.age")}>
            {distanceDate(asset.accountInfo.creationDate)}
          </StatisticItem>
          {asset.accountInfo && asset.accountInfo.login && (
            <StatisticItem label={t("dashboard-page.trading.login")}>
              {asset.accountInfo.login}
            </StatisticItem>
          )}
        </TableCardTableColumn>
      </TableCardTable>
      <DepositWithdrawButtons
        ownAsset
        canWithdraw={asset.actions.canAddRequestWithdraw}
        canInvest={asset.actions.canAddRequestInvest}
        broker={asset.broker && asset.broker.type}
        type={asset.assetType as ASSET}
        id={asset.id}
        currency={asset.accountInfo.currency}
      />
    </TableCard>
  );
};

const _DashboardPublicCardActions: React.FC<
  IDashboardPublicCardActionsProps
> = ({
  anchor,
  clearAnchor,
  settingsLink,
  id,
  showChangePassword,
  showTerminal,
  showClosePeriod
}) => {
  const title = useContext(TitleContext);
  const [t] = useTranslation();
  const terminalLink = {
    pathname: META_TRADER_4_ROUTE,
    state: `/ ${title}`
  };
  return (
    <Popover
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      anchorEl={anchor}
      noPadding
      onClose={clearAnchor}
    >
      <div className="popover-list">
        <Link to={settingsLink}>
          <GVButton variant="text" color="secondary" onClick={clearAnchor}>
            {t("dashboard-page.trading.actions.settings")}
          </GVButton>
        </Link>
        {showTerminal && (
          <Link to={terminalLink}>
            <GVButton variant="text" color="secondary" onClick={clearAnchor}>
              {t("dashboard-page.trading.actions.terminal")}
            </GVButton>
          </Link>
        )}
        {showClosePeriod && <ClosePeriodButton id={id} />}
        {showChangePassword && (
          <ChangeAccountPasswordButton id={id} title={title} />
        )}
      </div>
    </Popover>
  );
};

interface IDashboardPublicCardActionsProps {
  clearAnchor: (event: TEvent) => void;
  anchor: TAnchor;
  settingsLink: ToType;
  id: string;
  showChangePassword: boolean;
  showTerminal: boolean;
  showClosePeriod: boolean;
}
const DashboardPublicCardActions = React.memo(_DashboardPublicCardActions);

const DashboardPublicCard = React.memo(_DashboardPublicCard);
export default DashboardPublicCard;
