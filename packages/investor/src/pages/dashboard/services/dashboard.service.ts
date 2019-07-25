import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export interface IDashboardAssetsCounts {
  programsCount?: number;
  fundsCount?: number;
  tradesCount?: number;
}

export const fetchAssetsCount = (): Promise<IDashboardAssetsCounts> => {
  const authorization = authService.getAuthArg();
  const filtering = { take: 0 };
  return Promise.all([
    investorApi.v10InvestorProgramsGet(authorization, filtering),
    investorApi.v10InvestorFundsGet(authorization, filtering),
    investorApi.v10InvestorSignalsGet(authorization, filtering)
  ]).then(([programsData, fundsData, copytradingData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total,
    tradesCount: copytradingData.total
  }));
};
