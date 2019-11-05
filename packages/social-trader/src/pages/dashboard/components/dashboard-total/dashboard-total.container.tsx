import "./dashboard-total.scss";

import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardTotal from "pages/dashboard/components/dashboard-total/dashboard-total";
import { getTotalLoaderData } from "pages/dashboard/dashboard.loaders-data";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useApiRequest from "shared/hooks/api-request.hook";

import { TDashboardTotal } from "../../dashboard.types";
import { getTotal } from "../../services/dashboard.service";

const _DashboardTotalContainer: React.FC<Props> = () => {
  const [t] = useTranslation();
  const { data, sendRequest } = useApiRequest<TDashboardTotal>({
    request: getTotal
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <DashboardBlock label={t("dashboard-page.total.title")} all={""}>
      <DashboardTotal loaderData={getTotalLoaderData()} data={data!} />
    </DashboardBlock>
  );
};

interface Props {}

const DashboardTotalContainer = React.memo(_DashboardTotalContainer);
export default DashboardTotalContainer;
