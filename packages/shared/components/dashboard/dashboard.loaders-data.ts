import faker from "faker";
import { InvestmentEventViewModel, ProgramRequests } from "gv-api-web";

export const inRequestsLoaderData: ProgramRequests = {
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
    assetType: "None"
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
> = Array(5)
  .fill("")
  .map(investmentEventViewModelCreator);
