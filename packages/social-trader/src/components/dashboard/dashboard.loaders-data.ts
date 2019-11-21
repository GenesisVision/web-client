import faker from "faker";
import { InvestmentEventViewModel } from "gv-api-web";
import { tableLoaderCreator } from "utils/helpers";

const investmentEventViewModelCreator = (): InvestmentEventViewModel => ({
  title: faker.lorem.words(6),
  icon: "",
  date: new Date(),
  assetDetails: {
    programDetails: { level: 0, levelProgress: 0 },
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
> = tableLoaderCreator(investmentEventViewModelCreator);
