import GVButton from "components/gv-button";
import Link from "components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import StatisticItem from "components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn
} from "components/table/components/table-card/table-card";
import { AssetType, DashboardTradingAsset } from "gv-api-web";
import { TAnchor, TEvent } from "hooks/anchor.hook";
import ClosePeriodButton from "modules/asset-settings/close-period/close-period-button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import ChangeAccountPasswordButton from "pages/programs/programs-settings/change-password/change-password-trading-account.button";
import React, { useContext } from "react";
import NumberFormat from "react-number-format";
import { META_TRADER_4_ROUTE } from "routes/trade.routes";
import {
  ASSET,
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "shared/constants/constants";
import { useTranslation } from "shared/i18n";
import { distanceDate } from "shared/utils/dates";
import {
  composeProgramDetailsUrl,
  createFundSettingsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";
import { formatValueDifferentDecimalScale } from "utils/formatter";
import { VoidFuncType } from "utils/types";

import { TitleContext } from "../../dashboard.constants";

const _DashboardPublicCard: React.FC<{
  updateItems: VoidFuncType;
  asset: DashboardTradingAsset;
}> = ({ asset, updateItems }) => {
  const title = useContext(TitleContext);
  const [t] = useTranslation();
  const detailsLink = {
    pathname: composeProgramDetailsUrl(
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
      assetType={asset.assetType}
      canMakeProgram={asset.actions.canMakeProgramFromSignalProvider}
      anchor={anchor}
      clearAnchor={clearAnchor}
      id={asset.id}
      url={asset.publicInfo && asset.publicInfo.url}
      showChangePassword={asset.actions.canChangePassword}
      showClosePeriod={asset.assetType === ASSET.PROGRAM}
      showTerminal={asset.assetType === ASSET.PROGRAM}
    />
  );
  return (
    <TableCard
      hasAvatar
      subTitle={asset.assetTypeExt}
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
          {!!asset.signalInfo && (
            <StatisticItem
              label={t("dashboard-page.trading.subscribers-count")}
            >
              {asset.signalInfo.subscribersCount}
            </StatisticItem>
          )}
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
        onApply={updateItems}
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
  assetType,
  canMakeProgram,
  anchor,
  clearAnchor,
  url,
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
  const createSettingsToUrlMethod =
    assetType === "Fund" ? createFundSettingsToUrl : createProgramSettingsToUrl;
  const settingsLink = createSettingsToUrlMethod(url, title);
  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.SIGNAL,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = {
    pathname: makeProgramLinkMethod(id),
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
        {canMakeProgram && (
          <Link to={makeProgramLink}>
            <GVButton variant="text" color="secondary" onClick={clearAnchor}>
              {t("dashboard-page.trading.actions.make-program")}
            </GVButton>
          </Link>
        )}
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
  assetType: AssetType;
  canMakeProgram: boolean;
  clearAnchor: (event: TEvent) => void;
  anchor: TAnchor;
  url: string;
  id: string;
  showChangePassword: boolean;
  showTerminal: boolean;
  showClosePeriod: boolean;
}
const DashboardPublicCardActions = React.memo(_DashboardPublicCardActions);

const DashboardPublicCard = React.memo(_DashboardPublicCard);
export default DashboardPublicCard;
