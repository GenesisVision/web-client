import { mockDate } from "components/details/details.loader-data";
import { LevelsParamsInfo } from "gv-api-web";
import { TChartCurrency } from "modules/chart-currency-selector/chart-currency-selector";
import { getRandomInteger } from "utils/helpers";

export const selectedCurrenciesLoaderData: TChartCurrency[] = [
  { name: "GVT", color: "#f0f0f0" }
];

export const statisticDataLoaderData: any = {
  statisticCurrency: "",
  statistic: {
    equityChart: [],
    totalProgramCurrencyProfit: getRandomInteger(),
    timeframeProgramCurrencyProfit: getRandomInteger(),
    programCurrency: "GVT",
    trades: getRandomInteger(),
    successTradesPercent: getRandomInteger(),
    profitFactor: getRandomInteger(),
    periods: [],
    lastPeriodStarts: mockDate,
    lastPeriodEnds: mockDate,
    tradingVolume: getRandomInteger(),
    totalGvtProfit: getRandomInteger(),
    timeframeGvtProfit: getRandomInteger(),
    balance: getRandomInteger(),
    investors: getRandomInteger(),
    profitChangePercent: getRandomInteger(),
    sharpeRatio: getRandomInteger(),
    sortinoRatio: getRandomInteger(),
    calmarRatio: getRandomInteger(),
    maxDrawdown: getRandomInteger(),
    rate: getRandomInteger()
  }
};

export const statisticListLoaderData: any = {
  //: ProgramDetailsListStatistic
  balance: {
    amount: getRandomInteger(0, 100),
    currency: "GVT"
  },
  currentValue: getRandomInteger(0, 100),
  profitPercent: getRandomInteger(0, 100),
  profitValue: getRandomInteger(0, 100),
  drawdownPercent: getRandomInteger(0, 100),
  investorsCount: getRandomInteger(0, 100),
  tradesCount: getRandomInteger(0, 100)
};

export const personalProgramDetailsLoaderData: any = {
  //: PersonalProgramDetailsFull
  isReinvest: false,
  gvtValue: getRandomInteger(0, 100),
  showTwoFactorButton: false,
  signalSubscription: {
    hasSignalAccount: false,
    hasActiveSubscription: false,
    mode: "ByBalance",
    percent: getRandomInteger(0, 100),
    openTolerancePercent: getRandomInteger(0, 100),
    fixedVolume: getRandomInteger(0, 100),
    fixedCurrency: "GVT",
    totalProfit: getRandomInteger(0, 100),
    totalVolume: getRandomInteger(0, 100)
  },
  login: "",
  notificationAvailableToInvestId: "",
  canMakeSignalProvider: false,
  canChangePassword: false,
  migration: {
    dateCreate: mockDate,
    newLeverage: getRandomInteger(0, 100),
    newBroker: {
      name: "",
      description: "",
      logo: "",
      terms: "",
      assets: "",
      fee: getRandomInteger(0, 100),
      leverageMin: getRandomInteger(0, 100),
      leverageMax: getRandomInteger(0, 100),
      accountTypes: [],
      isForex: false,
      isSignalsAvailable: false,
      tags: []
    }
  },
  successFeePersonal: getRandomInteger(0, 100),
  isFavorite: false,
  isInvested: false,
  isOwnProgram: false,
  canCloseAsset: false,
  isFinishing: false,
  canInvest: false,
  canWithdraw: false,
  canClosePeriod: false,
  hasNotifications: false,
  value: getRandomInteger(0, 100),
  profit: getRandomInteger(0, 100),
  invested: getRandomInteger(0, 100),
  pendingInput: getRandomInteger(0, 100),
  pendingOutput: getRandomInteger(0, 100),
  pendingOutputIsWithdrawAll: false,
  status: "Pending"
};

export const levelsParamsLoaderData: LevelsParamsInfo = {
  minAvailableToInvest: getRandomInteger(0, 100),
  maxAvailableToInvest: getRandomInteger(0, 100),
  unverifiedAvailableToInvest: getRandomInteger(0, 100),
  genesisRatioMin: getRandomInteger(0, 100),
  genesisRatioMax: getRandomInteger(0, 100),
  genesisRatioHighRisk: getRandomInteger(0, 100),
  volumeScaleMin: getRandomInteger(0, 100),
  volumeScaleMax: getRandomInteger(0, 100),
  programAgeMax: getRandomInteger(0, 100),
  ageByVolumeMax: getRandomInteger(0, 100),
  investmentScaleMin: getRandomInteger(0, 100),
  investmentScaleMax: getRandomInteger(0, 100),
  investmentScaleHighRisk: getRandomInteger(0, 100)
};
