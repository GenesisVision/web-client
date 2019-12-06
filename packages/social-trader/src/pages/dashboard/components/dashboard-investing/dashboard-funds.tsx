import { FundInvestingDetailsList } from "gv-api-web";
import { toggleFavoriteFundDispatchable } from "modules/favorite-asset/services/favorite-fund.service";
import DashboardFundCard from "pages/dashboard/components/dashboard-investing/dashboard-fund-card";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import { getInvestingFunds } from "pages/dashboard/services/dashboard.service";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardInvestingFunds: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const title = useContext(TitleContext);
  const currency = useSelector(currencySelector);
  return (
    <DashboardInvestingTable
      getItems={getInvestingFunds(currency)}
      title={t("dashboard-page.investing.funds")}
      renderBodyCard={(
        fund: FundInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardFundCard
          updateItems={updateItems}
          title={title}
          fund={fund}
          toggleFavorite={(id: string, isFavorite: boolean) =>
            dispatch(toggleFavoriteFundDispatchable(id, isFavorite))
          }
        />
      )}
    />
  );
};

const DashboardInvestingFunds = React.memo(_DashboardInvestingFunds);
export default DashboardInvestingFunds;
