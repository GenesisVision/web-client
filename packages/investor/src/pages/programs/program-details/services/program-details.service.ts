import {
  fetchInvestmentInfo,
  subscribeAvailable
} from "pages/programs/program-details/actions/program-details.actions";
import { HistoryCountsType } from "shared/components/programs/program-details/program-details.types";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import { CurrencyEnum, InvestorThunk } from "shared/utils/types";

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

export const subscribeAvailableToInvest = ({
  assetId,
  currency
}: {
  assetId: string;
  currency: CurrencyEnum;
}): InvestorThunk<Promise<string>> => async dispatch => {
  const authorisation = authService.getAuthArg();
  const info = await dispatch(
    fetchInvestmentInfo({
      authorisation,
      assetId,
      currency
    })
  );

  const notificationId = await dispatch(
    subscribeAvailable({
      assetId,
      authorisation,
      amount: info.value.minInvestmentAmount
    })
  );

  return notificationId.value;
};
