import {
  managerLoaderData,
  mockDate
} from "components/details/details.loader-data";
import { FollowDetailsListItem } from "gv-api-web";
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
const tagsLoaderDataCreator = () => tableLoaderCreator(tagLoaderDataCreator);

export const followDetailsLoaderDataCreator = (): FollowDetailsListItem => ({
  tradesCount: 0,
  subscribersCount: 0,
  leverageMax: 0,
  leverageMin: 0,
  isExternal: false,
  brokerType: "BinanceFollow",
  brokerId: "",
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
  owner: managerLoaderData
});

export const userFollowListLoaderData = tableLoaderCreator(
  followDetailsLoaderDataCreator,
  4
);

export const followListLoaderData = tableLoaderCreator(
  followDetailsLoaderDataCreator
);
