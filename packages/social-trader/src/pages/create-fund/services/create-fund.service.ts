import { CancelablePromise, NewFundRequest } from "gv-api-web";
import { PlatformInfo } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { NextPageContext } from "next";
import Router from "next/router";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
// import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { getRandomInteger } from "utils/helpers";

export const fetchMinimumDepositAmount = async (ctx?: NextPageContext) =>
  await CancelablePromise.resolve(100); //managerApi.getFundInvestment(authService.getAuthArg(ctx));

export const PlatformDataLoaderData: any = {
  programsInfo: {
    maxEntryFee: getRandomInteger(1, 10),
    maxExitFee: getRandomInteger(1, 10),
    managerProgramInvestment: getRandomInteger(1, 10),
    managerProgramInvestmentUSD: getRandomInteger(1, 10),
    managerProgramInvestmentUSDT: getRandomInteger(1, 10),
    managerProgramInvestmentBTC: getRandomInteger(1, 10),
    managerProgramInvestmentETH: getRandomInteger(1, 10),
    managerMaxEntryFee: getRandomInteger(1, 10),
    managerMaxSuccessFee: getRandomInteger(1, 10),
    managerFundInvestment: getRandomInteger(1, 10),
    managerMaxExitFee: getRandomInteger(1, 10),
    managerMaxSignalVolumeFee: getRandomInteger(1, 10),
    managerMinSignalVolumeFee: getRandomInteger(1, 10),
    managerMaxSignalSuccessFee: getRandomInteger(1, 10),
    managerMinSignalSuccessFee: getRandomInteger(1, 10),
    periods: [getRandomInteger(1, 10)]
  }
};
