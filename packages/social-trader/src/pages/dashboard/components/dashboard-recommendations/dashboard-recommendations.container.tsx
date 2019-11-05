import "./dashboard-recommendations.scss";

import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardRecommendations from "pages/dashboard/components/dashboard-recommendations/dashboard-recommendations";
import { getRecommendationLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { TRecommendation } from "pages/dashboard/dashboard.types";
import { getRecommendations } from "pages/dashboard/services/dashboard.service";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useApiRequest from "shared/hooks/api-request.hook";
import { tableLoaderCreator } from "shared/utils/helpers";

const _DashboardRecommendationsContainer: React.FC<Props> = ({}) => {
  const [t] = useTranslation();
  const { data, sendRequest } = useApiRequest<TRecommendation[]>({
    request: getRecommendations
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <DashboardBlock label={t("dashboard-page.recommendations.title")} all={""}>
      <DashboardRecommendations
        loaderData={tableLoaderCreator(getRecommendationLoaderData, 15)}
        data={data!}
      />
    </DashboardBlock>
  );
};

interface Props {}

const DashboardRecommendationsContainer = React.memo(
  _DashboardRecommendationsContainer
);
export default DashboardRecommendationsContainer;
