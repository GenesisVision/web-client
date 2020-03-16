import { Row } from "components/row/row";
import { ToolbarButton } from "components/table/components/toolbar-button";
import { DashboardTradingAsset } from "gv-api-web";
import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import {
  fetchDashboardPrivateAction,
  fetchDashboardTradingTotalAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardPrivateCard from "pages/dashboard/components/dashboard-trading/dashboard-private-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import { dashboardTradingPrivateSelector } from "pages/dashboard/reducers/dashboard-trading-private.reducer";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardPrivate: React.FC = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const getItems = useCallback(filters => {
    return fetchDashboardPrivateAction(filters);
  }, []);
  const handleUpdateItems = useCallback(
    updateItems => () => {
      dispatch(fetchDashboardTradingTotalAction(currency));
      updateItems();
    },
    [currency]
  );
  return (
    <DashboardTradingTable
      dataSelector={dashboardTradingPrivateSelector}
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
      getItems={getItems}
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
