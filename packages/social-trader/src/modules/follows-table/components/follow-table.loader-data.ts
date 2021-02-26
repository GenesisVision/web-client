import {
  mockDate,
  ownerLoaderData
} from "components/details/details.loader-data";
import { BrokerDetails, FollowDetailsListItem } from "gv-api-web";
import {
  personalProgramDetailsLoaderData,
  statisticListLoaderData
} from "pages/invest/programs/program-details/program-details.loader-data";
import {
  getRandomColor,
  getRandomWord,
  tableLoaderCreator
} from "utils/helpers";

const tagLoaderDataCreator = () => ({
  name: getRandomWord(),
  color: getRandomColor()
});
export const tagsLoaderDataCreator = () =>
  tableLoaderCreator(tagLoaderDataCreator);

export const brokerDetailsLoaderData: BrokerDetails = {
  id: "",
  logoUrl: "",
  name: getRandomWord(),
  type: "BinanceFollow",
  isKycRequired: false,
  showSwaps: false,
  showTickets: false,
  showCommissionRebate: false,
  isSignalsAvailable: false,
  isKycRequiredSometime: false,
  showSwapsSometime: false,
  showTicketsSometime: false,
  showCommissionRebateSometime: false
};

export const followDetailsLoaderDataCreator = (): FollowDetailsListItem => ({
  tradesCount: 0,
  subscribersCount: 0,
  leverageMax: 0,
  leverageMin: 0,
  successFee: 0,
  volumeFee: 0,
  isExternal: false,
  brokerDetails: brokerDetailsLoaderData,
  balance: { amount: 0, currency: "GVT" },
  currency: "GVT",
  statistic: statisticListLoaderData,
  personalDetails: personalProgramDetailsLoaderData,
  tags: tagsLoaderDataCreator(),
  id: "",
  logoUrl: "",
  url: "",
  color: getRandomColor(),
  title: getRandomWord(),
  description: "",
  status: "None",
  creationDate: mockDate,
  owner: ownerLoaderData
});

export const userFollowListLoaderData = tableLoaderCreator(
  followDetailsLoaderDataCreator,
  4
);

export const followListLoaderData = tableLoaderCreator(
  followDetailsLoaderDataCreator
);
