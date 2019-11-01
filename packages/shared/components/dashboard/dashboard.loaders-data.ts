import faker from "faker";
import { InvestmentEventViewModel, ProgramRequestsOld } from "gv-api-web";
import { tableLoaderCreator } from "shared/utils/helpers";

export const inRequestsLoaderData: ProgramRequestsOld = {
  requests: [],
  total: 0,
  totalValue: 0
};

const investmentEventViewModelCreator = (): InvestmentEventViewModel => ({
  title: faker.lorem.words(6),
  icon: "",
  date: new Date(),
  assetDetails: {
    id: "",
    logo: "",
    color: faker.internet.color(),
    title: faker.lorem.word(),
    url: "",
    assetType: "None",
    programDetails: {
      level: 1,
      levelProgress: 100
    }
  },
  amount: 0,
  currency: "GVT",
  changeState: "NotChanged",
  extendedInfo: [],
  feesInfo: [],
  totalFeesAmount: 0,
  totalFeesCurrency: "GVT"
});

export const DashboardPortfolioEventsLoaderData: Array<
  InvestmentEventViewModel
> = tableLoaderCreator(investmentEventViewModelCreator);
