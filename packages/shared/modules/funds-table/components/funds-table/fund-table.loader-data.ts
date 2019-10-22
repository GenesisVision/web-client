import faker from "faker";
import { FundAssetPercent, FundDetailsOld, FundsListOld } from "gv-api-web";
import {
  managerLoaderData,
  mockDate
} from "shared/components/details/details.loader-data";
import {
  personalFundDetailsFull,
  statisticListLoaderData
} from "shared/components/funds/fund-details/fund-details.loader-data";
import { getRandomInteger } from "shared/utils/helpers";
import { tableLoaderCreator } from "shared/utils/helpers";

const assetLoaderDataCreator = (): FundAssetPercent => ({
  asset: "GVT",
  name: faker.lorem.word(),
  percent: getRandomInteger(0, 100),
  icon: ""
});
const assetsLoaderDataCreator = (): FundAssetPercent[] =>
  new Array(getRandomInteger(1, 5))
    .fill("")
    .map(() => assetLoaderDataCreator());

export const fundDetailsLoaderDataCreator = (): FundDetailsOld => ({
  totalAssetsCount: 0,
  topFundAssets: assetsLoaderDataCreator(),
  dashboardAssetsDetails: {
    share: getRandomInteger(0, 100)
  },
  statistic: statisticListLoaderData,
  personalDetails: personalFundDetailsFull,
  id: "",
  logo: "",
  url: "",
  color: "#858585",
  title: faker.lorem.word(),
  description: "",
  status: "None",
  creationDate: mockDate,
  manager: managerLoaderData,
  chart: []
});

export const fundListLoaderData: FundDetailsOld[] = tableLoaderCreator(
  fundDetailsLoaderDataCreator
);

export const fundTableLoaderData: FundsListOld = {
  funds: fundListLoaderData,
  total: fundListLoaderData.length
};
