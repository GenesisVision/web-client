import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardTotal from "pages/dashboard/components/dashboard-total/dashboard-total";
import { SelectProductButton } from "pages/dashboard/components/dashboard-total/select-product/select-product.button";
import { getTotalLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { TDashboardTotal } from "pages/dashboard/dashboard.types";
import { getTotal } from "pages/dashboard/services/dashboard.service";
import React from "react";

const _DashboardTotalContainer: React.FC<Props> = ({ label }) => {
  const currency = useAccountCurrency();
  const { data } = useApiRequest<TDashboardTotal>({
    name: "DashboardTotalContainer",
    cache: true,
    fetchOnMount: true,
    fetchOnMountData: { currency },
    request: getTotal
  });
  return (
    <DashboardBlock headerButton={<SelectProductButton />} label={label}>
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
