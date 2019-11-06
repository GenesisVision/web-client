import faker from "faker";
import {
  FundAssetPercent,
  FundDetailsList,
  ItemsViewModelFundDetailsList
} from "gv-api-web";
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

export const fundDetailsLoaderDataCreator = (): FundDetailsList =>
  new FundDetailsList({
    totalAssetsCount: 0,
    topFundAssets: assetsLoaderDataCreator(),
    // dashboardAssetsDetails: {
    //   share: getRandomInteger(0, 100)
    // },
    // statistic: statisticListLoaderData,
    personalDetails: personalFundDetailsFull,
    id: "",
    logo: "",
    url: "",
    color: "#858585",
    title: faker.lorem.word(),
    description: "",
    status: "None",
    creationDate: mockDate,
    // manager: managerLoaderData,
    chart: {
      profit: 0,
      drawdown: 0,
      chart: []
    }
  });

export const fundListLoaderData: FundDetailsList[] = tableLoaderCreator(
  fundDetailsLoaderDataCreator
);

export const fundTableLoaderData: ItemsViewModelFundDetailsList = {
  items: fundListLoaderData,
  total: fundListLoaderData.length
};
