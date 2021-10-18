import { DataStorageContext } from "components/data-storage/data-storage";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import useTab from "hooks/tab.hook";
import {
  ASSETS_HISTORY_TABLE_COLUMNS,
  ASSETS_PORTFOLIO_TABLE_COLUMNS
} from "modules/assets-table/assets.constants";
import AssetHistoryTableFilters from "modules/assets-table/components/assets-history-table/asset-history-table-filters";
import AssetHistoryTableRow from "modules/assets-table/components/assets-history-table/asset-history-table-row";
import AssetsHistoryTableHeaderCell from "modules/assets-table/components/assets-history-table/assets-history-table-header-cell";
import AssetPortfolioTableRow from "modules/assets-table/components/assets-portfolio-table/asset-portfolio-table-row";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardInvestingCoinsTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-coins-table";
import {
  assetsHistoryTableSelectorShort,
  assetsPortfolioTableSelectorShort
} from "pages/invest/assets/reducers/assets-tables.reducer";
import {
  getAssetsHistory,
  getAssetsPortfolio
} from "pages/invest/assets/service/assets.service";
import React, { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

enum TABS {
  PORTFOLIO = "PORTFOLIO",
  HISTORY = "HISTORY"
}

const TableTab: React.FC<{ selected?: boolean }> = ({ selected, children }) => {
  return <div style={{ display: selected ? "block" : "none" }}>{children}</div>;
};

const _DashboardInvestingCoins: React.FC = () => {
  const { tab, setTab } = useTab<TABS>(TABS.PORTFOLIO);
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const handleUpdateItems = useCallback(
    updateRow => () => {
      updateData();
      updateRow();
    },
    []
  );

  const tablesData = useMemo(
    () => ({
      portfolio: {
        dataSelector: assetsPortfolioTableSelectorShort,
        getItems: getAssetsPortfolio
      },
      history: {
        dataSelector: assetsHistoryTableSelectorShort,
        getItems: getAssetsHistory
      }
    }),
    []
  );

  const tabs = (
    <GVTabs value={tab} onChange={setTab}>
      <GVTab value={TABS.PORTFOLIO} label={t("assets-page:tabs.portfolio")} />
      <GVTab value={TABS.HISTORY} label={t("assets-page:tabs.history")} />
    </GVTabs>
  );

  return (
    <DashboardBlock label={t("dashboard-page:investing.assets")}>
      <TableTab selected={tab === TABS.PORTFOLIO}>
        <DashboardInvestingCoinsTable
          getItems={tablesData.portfolio.getItems()}
          dataSelector={tablesData.portfolio.dataSelector}
          title={tabs}
          columns={ASSETS_PORTFOLIO_TABLE_COLUMNS}
          renderHeader={column => (
            <AssetsHistoryTableHeaderCell column={column} />
          )}
          renderBodyRow={(asset, updateRow) => (
            <AssetPortfolioTableRow
              asset={asset}
              onApply={handleUpdateItems(updateRow)}
            />
          )}
        />
      </TableTab>
      {tab === TABS.HISTORY && (
        <TableTab selected={tab === TABS.HISTORY}>
          <DashboardInvestingCoinsTable
            getItems={tablesData.history.getItems()}
            dataSelector={tablesData.history.dataSelector}
            columns={ASSETS_HISTORY_TABLE_COLUMNS}
            title={tabs}
            renderHeader={column => (
              <AssetsHistoryTableHeaderCell column={column} />
            )}
            renderBodyRow={event => <AssetHistoryTableRow event={event} />}
            renderFilters={(updateFilter, filtering) => (
              <AssetHistoryTableFilters
                updateFilter={updateFilter}
                filtering={filtering}
              />
            )}
          />
        </TableTab>
      )}
    </DashboardBlock>
  );
};

const DashboardInvestingCoins = React.memo(_DashboardInvestingCoins);
export default DashboardInvestingCoins;
