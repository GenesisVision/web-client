import faker from "faker";
import {
  BrokerDetails,
  LevelsParamsInfo,
  PersonalProgramDetailsFull,
  ProgramDetailsFullOld,
  ProgramProfitChart,
  ProgramStatistic
} from "gv-api-web";
import { ProfitChartDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import {
  amountWithCurrencyLoaderData,
  managerLoaderData,
  mockDate
} from "shared/components/details/details.loader-data";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { getRandomInteger } from "shared/utils/helpers";
import { CurrencyEnum } from "shared/utils/types";

import { periodsLoaderData } from "./periods.loader-data";

export const selectedCurrenciesLoaderData: TChartCurrency[] = [
  { name: "GVT", color: "#f0f0f0" }
];

export const profitChartLoaderData: ProgramProfitChart = {
  equityChart: [],
  totalProfit: 0,
  timeframeProfit: 0,
  programCurrency: "ETH",
  trades: 0,
  successTradesPercent: 0,
  profitFactor: 0,
  periods: periodsLoaderData,
  lastPeriodStarts: ("2019-09-24T06:02:14.7974010+00:00" as unknown) as Date,
  lastPeriodEnds: ("2019-09-24T07:02:14.7974010+00:00" as unknown) as Date,
  tradingVolume: 0,
  balance: 25.80216005,
  investors: 3,
  profitChangePercent: -22.4,
  sharpeRatio: 1.3872456301077910581826258857,
  sortinoRatio: 1.9150963753755977061955791825,
  calmarRatio: 1.0426212040490143846563665424,
  maxDrawdown: -18.71759074591144794575189469,
  rate: 158.63
};

export const profitChartDataLoaderData: ProfitChartDataType = [
  profitChartLoaderData
];

export const statisticDataLoaderData = {
  statisticCurrency: "",
  statistic: {
    equityChart: [],
    totalProgramCurrencyProfit: faker.random.number(),
    timeframeProgramCurrencyProfit: faker.random.number(),
    programCurrency: "GVT",
    trades: faker.random.number(),
    successTradesPercent: faker.random.number(),
    profitFactor: faker.random.number(),
    periods: [],
    lastPeriodStarts: mockDate,
    lastPeriodEnds: mockDate,
    tradingVolume: faker.random.number(),
    totalGvtProfit: faker.random.number(),
    timeframeGvtProfit: faker.random.number(),
    balance: faker.random.number(),
    investors: faker.random.number(),
    profitChangePercent: faker.random.number(),
    sharpeRatio: faker.random.number(),
    sortinoRatio: faker.random.number(),
    calmarRatio: faker.random.number(),
    maxDrawdown: faker.random.number(),
    rate: faker.random.number()
  }
};

export const brokerDetailsLoaderData: BrokerDetails = {
  logo: "",
  name: faker.name.firstName(),
  isForex: false,
  showSwaps: false,
  showTickets: false,
  showCommissionRebate: false,
  isForexSometime: false,
  showSwapsSometime: false,
  showTicketsSometime: false,
  showCommissionRebateSometime: false
};

export const statisticLoaderData: ProgramStatistic = {
  balanceBase: amountWithCurrencyLoaderData,
  balanceGVT: amountWithCurrencyLoaderData,
  balanceSecondary: amountWithCurrencyLoaderData,
  currentValue: getRandomInteger(0, 100),
  profitPercent: getRandomInteger(0, 100),
  profitValue: getRandomInteger(0, 100),
  drawdownPercent: getRandomInteger(0, 100),
  investorsCount: getRandomInteger(0, 10),
  hasNotifications: false,
  startDate: mockDate,
  startBalance: getRandomInteger(0, 100),
  startCurrency: "GVT",
  investedAmount: getRandomInteger(0, 100),
  investedCurrency: "GVT",
  tradesCount: getRandomInteger(0, 100),
  tradesSuccessCount: getRandomInteger(0, 100),
  profitFactorPercent: getRandomInteger(0, 100),
  sharpeRatioPercent: getRandomInteger(0, 100)
};

export const personalProgramDetailsLoaderData: PersonalProgramDetailsFull = {
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

export const programDetailsLoaderData: ProgramDetailsFullOld = {
  currency: "" as CurrencyEnum,
  level: getRandomInteger(0, 100),
  levelProgress: getRandomInteger(0, 100),
  periodDuration: getRandomInteger(0, 100),
  periodStarts: mockDate,
  periodEnds: mockDate,
  entryFeeSelected: getRandomInteger(0, 100),
  entryFeeCurrent: getRandomInteger(0, 100),
  successFeeSelected: getRandomInteger(0, 100),
  successFeeCurrent: getRandomInteger(0, 100),
  stopOutLevelSelected: getRandomInteger(0, 100),
  stopOutLevelCurrent: getRandomInteger(0, 100),
  isReinvesting: false,
  isSignalProgram: false,
  signalSuccessFee: getRandomInteger(0, 100),
  signalVolumeFee: getRandomInteger(0, 100),
  leverageMin: getRandomInteger(0, 100),
  leverageMax: getRandomInteger(0, 100),
  ageDays: getRandomInteger(0, 100),
  genesisRatio: getRandomInteger(0, 100),
  investmentScale: getRandomInteger(0, 100),
  volumeScale: getRandomInteger(0, 100),
  tradesDelay: "None",
  availableInvestmentBase: getRandomInteger(0, 100),
  availableInvestmentLimit: getRandomInteger(0, 100),
  totalAvailableInvestment: getRandomInteger(0, 100),
  brokerDetails: brokerDetailsLoaderData,
  statistic: statisticLoaderData,
  personalProgramDetails: personalProgramDetailsLoaderData,
  tags: [],
  id: "",
  logo: "",
  url: "",
  color: "#fff",
  description: faker.lorem.sentences(3),
  title: faker.lorem.word(),
  ipfsHash: "",
  creationDate: mockDate,
  status: "None",
  manager: managerLoaderData
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
