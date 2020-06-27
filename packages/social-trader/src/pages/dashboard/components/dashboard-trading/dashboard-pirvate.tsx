import { Row } from "components/row/row";
import { ToolbarButton } from "components/table/components/toolbar-button";
import { DashboardTradingAsset } from "gv-api-web";
import { DataStorageContext } from "hooks/data-storage";
import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import DashboardPrivateCard from "pages/dashboard/components/dashboard-trading/dashboard-private-card/dashboard-private-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import { getPrivateAssets } from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

const _DashboardPrivate: React.FC = () => {
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const handleUpdateItems = useCallback(
    updateItems => () => {
      updateData();
      updateItems();
    },
    []
  );
  return (
    <DashboardTradingTable
      createButtonToolbar={
        <Row>
          <ToolbarButton
            text={t("buttons.create-account")}
            route={CREATE_ACCOUNT_PAGE_ROUTE}
          />
          <ToolbarButton
            text={t("buttons.attach-external-account")}
            route={ATTACH_ACCOUNT_PAGE_ROUTE}
          />
        </Row>
      }
      getItems={getPrivateAssets}
      title={t("dashboard-page.trading.private")}
      renderBodyCard={(
        asset: DashboardTradingAsset,
        updateRow,
        updateItems
      ) => (
        <DashboardPrivateCard
          updateItems={handleUpdateItems(updateItems!)}
          asset={asset}
        />
      )}
    />
  );
};

const DashboardPrivate = React.memo(_DashboardPrivate);
export default DashboardPrivate;
