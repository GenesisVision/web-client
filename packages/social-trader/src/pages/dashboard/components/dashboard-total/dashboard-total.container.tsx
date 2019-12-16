import "./dashboard-total.scss";

import { fetchDashboardInvestmentsTotalAction } from "pages/dashboard/actions/dashboard.actions";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardTotal from "pages/dashboard/components/dashboard-total/dashboard-total";
import { getTotalLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { dashboardInvestmentsTotalSelector } from "pages/dashboard/reducers/dashboard-investments-total.reducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardTotalContainer: React.FC<Props> = ({ label }) => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const data = useSelector(dashboardInvestmentsTotalSelector);
  useEffect(() => {
    dispatch(fetchDashboardInvestmentsTotalAction(currency));
  }, []);
  return (
    <DashboardBlock label={label}>
      <DashboardTotal
        currency={currency}
        loaderData={getTotalLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

interface Props {
  label: string;
}

const DashboardTotalContainer = React.memo(_DashboardTotalContainer);
export default DashboardTotalContainer;
