import { DashboardTradingAsset } from "gv-api-web";
import CloseAssetButton from "modules/asset-settings/close-asset/close-asset-button";
import DepositWithdrawButtons from "pages/dashboard/components/dashboard-trading/deposit-withdraw-buttons";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import * as React from "react";
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
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatValueDifferentDecimalScale } from "shared/utils/formatter";

const _DashboardPrivateCard: React.FC<Props> = ({ asset, title }) => {
  const [t] = useTranslation();
  const detailsLink = {
    pathname: composeProgramDetailsUrl(
      asset.publicInfo && asset.publicInfo.url
    ),
    state: `/ ${title}`
  };
  const terminalLink = {
    pathname: ""
  };
  const makeProgramLink = {
    pathname: ""
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
          type={asset.assetType as ASSET}
          id={asset.id}
          variant={"text"}
        />
      </div>
    </Popover>
  );

  return (
    <TableCard
      asset={asset}
      detailsUrl={detailsLink}
      pathTitle={title}
      // profitPercent={asset.statistic.profit}
      renderActions={renderActions}
    >
      <TableCardTable>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.equity")}>
            {/*<NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.statistic.balance.amount,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              suffix={` ${asset.statistic.balance.currency}`}
              displayType="text"
            />*/}
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.leverage")}>
            {/*<NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.statistic.leverage,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
            />*/}
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("dashboard-page.trading.age")}>
            {/*<NumberFormat
              value={formatValueDifferentDecimalScale(
                asset.statistic.age,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
            />*/}
          </StatisticItem>
        </TableCardTableColumn>
      </TableCardTable>
      <DepositWithdrawButtons
        type={asset.assetType as ASSET}
        id={asset.id}
        currency={"GVT"}
      />
    </TableCard>
  );
};

interface Props {
  asset: DashboardTradingAsset;
  title: string;
}

const DashboardPrivateCard = React.memo(_DashboardPrivateCard);
export default DashboardPrivateCard;
