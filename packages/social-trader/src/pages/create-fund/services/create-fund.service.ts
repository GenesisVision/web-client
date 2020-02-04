import { getRandomInteger } from "utils/helpers";

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
