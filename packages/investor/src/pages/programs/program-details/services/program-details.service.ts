import { HistoryCountsType } from "shared/components/programs/program-details/program-details.types";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

export const fetchHistoryCounts = (id: string): Promise<HistoryCountsType> => {
  const isAuthenticated = authService.isAuthenticated();
  const filtering = { take: 0 };
  const tradesCountPromise = programsApi.v10ProgramsByIdTradesGet(
    id,
    filtering
  );
  const eventsCountPromise = isAuthenticated
    ? fetchPortfolioEvents({ ...filtering, assetId: id })
    : Promise.resolve({ total: 0 });
  const openPositionsCountPromise = programsApi.v10ProgramsByIdTradesOpenGet(
    id
  );
  return Promise.all([
    tradesCountPromise,
    eventsCountPromise,
    openPositionsCountPromise
  ]).then(([tradesData, eventsData, openPositionsData]) => ({
    tradesCount: tradesData.total,
    eventsCount: eventsData.total,
    openPositionsCount: openPositionsData.total
  }));
};
