import "./dashboard-recommendations.scss";

import useApiRequest from "hooks/api-request.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardRecommendations from "pages/dashboard/components/dashboard-recommendations/dashboard-recommendations";
import { getRecommendationLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { TDashboardRecommendations } from "pages/dashboard/dashboard.types";
import { getRecommendations } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { tableLoaderCreator } from "utils/helpers";

const _DashboardRecommendationsContainer: React.FC = () => {
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const { data } = useApiRequest<TDashboardRecommendations>({
    fetchOnMount: true,
    fetchOnMountData: { currency },
    request: getRecommendations
  });
  if (!data) return null;
  return (
    <DashboardBlock label={t("dashboard-page.recommendations.title")}>
      <DashboardRecommendations
        loaderData={{
          assets: tableLoaderCreator(getRecommendationLoaderData, 15)
        }}
        data={data!}
      />
    </DashboardBlock>
  );
};

const DashboardRecommendationsContainer = React.memo(
  _DashboardRecommendationsContainer
);
export default DashboardRecommendationsContainer;
