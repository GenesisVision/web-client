import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

import { fetchPortfolioEvents } from "../../../dashboard/services/dashboard-events.services";

export const fetchHistoryCounts = id => {
  const isAuthenticated = authService.isAuthenticated();
  const filtering = { take: 0 };
  const tradesCountPromise = programsApi.v10ProgramsByIdTradesGet(
    id,
    filtering
  );
  const eventsCountPromise = isAuthenticated
    ? fetchPortfolioEvents({ ...filtering, assetId: id })
    : Promise.resolve({ total: 0 });
  return Promise.all([tradesCountPromise, eventsCountPromise]).then(
    ([tradesData, eventsData]) => ({
      tradesCount: tradesData.total,
      eventsCount: eventsData.total
    })
  );
};
