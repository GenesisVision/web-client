import { ToolbarButton } from "components/table/components/toolbar-button";
import {
  DashboardTradingAsset,
  FundInvestingDetailsList,
  ProgramInvestingDetailsList
} from "gv-api-web";
import { toggleFavoriteFundDispatchable } from "modules/favorite-asset/services/favorite-fund.service";
import { toggleFavoriteProgramDispatchable } from "modules/favorite-asset/services/favorite-program.service";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import ProgramCard from "modules/programs-table/components/programs-table/program-card";
import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import DashboardProgramCard from "pages/dashboard/components/dashboard-investing/dashboard-program-card";
import DashboardInvestingProgramsCard from "pages/dashboard/components/dashboard-trading/dashboard-private-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING,
  TitleContext
} from "pages/dashboard/dashboard.constants";
import {
  getInvestingFunds,
  getInvestingPrograms,
  getPrivateAssets
} from "pages/dashboard/services/dashboard.service";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const _DashboardInvestingPrograms: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const title = useContext(TitleContext);
  return (
    <DashboardInvestingTable
      getItems={getInvestingPrograms}
      title={t("dashboard-page.investing.programs")}
      renderBodyCard={(program: ProgramInvestingDetailsList) => (
        <DashboardProgramCard
          title={title}
          program={program}
          toggleFavorite={(id: string, isFavorite: boolean) =>
            dispatch(toggleFavoriteProgramDispatchable(id, isFavorite))
          }
        />
      )}
    />
  );
};

const DashboardInvestingPrograms = React.memo(_DashboardInvestingPrograms);
export default DashboardInvestingPrograms;
