import { InvestmentEventViewModel } from "gv-api-web";
import {
  getRandomColor,
  getRandomWord,
  getRandomWords,
  tableLoaderCreator
} from "utils/helpers";

const investmentEventViewModelCreator = (): InvestmentEventViewModel => ({
  title: getRandomWords(6),
  icon: "",
  date: new Date(),
  assetDetails: {
    programDetails: { level: 0, levelProgress: 0 },
    id: "",
    logo: "",
    color: getRandomColor(),
    title: getRandomWord(),
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

export const DashboardPortfolioEventsLoaderData: Array<InvestmentEventViewModel> = tableLoaderCreator(
  investmentEventViewModelCreator
);
