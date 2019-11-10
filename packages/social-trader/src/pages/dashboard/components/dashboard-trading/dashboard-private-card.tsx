import { DashboardTradingAsset } from "gv-api-web";
import CloseAssetButton from "modules/asset-settings/close-asset/close-asset-button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import * as React from "react";
import { useContext } from "react";
import NumberFormat from "react-number-format";
import GVButton from "shared/components/gv-button";
import Link from "shared/components/link/link";
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
import { distanceDate } from "shared/utils/dates";
import { formatValueDifferentDecimalScale } from "shared/utils/formatter";

const _DashboardPrivateCard: React.FC<Props> = ({ asset }) => {
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
  const terminalLink = {
    pathname: META_TRADER_4_ROUTE,
    state: `/ ${title}`
  };
  const makeSignalAccountLink = {
    pathname: ""
  };
  const renderActions = ({
    anchor,
    clearAnchor
  }: {
    anchor: TAnchor;
    clearAnchor: (event: TEvent) => void;
  }) => (
    <Popover
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      anchorEl={anchor}
      noPadding
      onClose={clearAnchor}
    >
      <div className="popover-list">
        <Link to={terminalLink}>
          <GVButton variant="text" color="secondary" onClick={clearAnchor}>
            {t("dashboard-page.trading.actions.terminal")}
          </GVButton>
        </Link>
        <Link to={makeProgramLink}>
          <GVButton variant="text" color="secondary" onClick={clearAnchor}>
            {t("dashboard-page.trading.actions.make-program")}
          </GVButton>
        </Link>
        <Link to={makeSignalAccountLink}>
          <GVButton variant="text" color="secondary" onClick={clearAnchor}>
            {t("dashboard-page.trading.actions.make-signal-account")}
          </GVButton>
        </Link>
        <CloseAssetButton
          type={"account" as ASSET}
          id={asset.id}
          variant={"text"}
        />
      </div>
    </Popover>
  );

  return (
    <TableCard
      assetId={asset.id}
      profit={asset.statistic.profit}
      chart={asset.statistic.chart}
      title={asset.accountInfo.login}
      logo={asset.broker.logo}
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
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.leverage")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.accountInfo.leverage,
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
        </TableCardTableColumn>
      </TableCardTable>
    </TableCard>
  );
};

interface Props {
  asset: DashboardTradingAsset;
}

const DashboardPrivateCard = React.memo(_DashboardPrivateCard);
export default DashboardPrivateCard;
