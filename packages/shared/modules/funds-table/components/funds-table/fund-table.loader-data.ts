import {
  FundAssetPercent,
  FundDetailsList,
  ItemsViewModelFundDetailsList
} from "gv-api-web";
import {
  mockDate,
  ownerLoaderData
} from "shared/components/details/details.loader-data";
import { getRandomColor, getRandomInteger } from "shared/utils/helpers";
import { tableLoaderCreator } from "shared/utils/helpers";

const assetLoaderDataCreator = (): FundAssetPercent => ({
  asset: "GVT",
  name: "Genesis Vision",
  percent: getRandomInteger(0, 100),
  icon: ""
});
const assetsLoaderDataCreator = (): FundAssetPercent[] =>
  new Array(getRandomInteger(1, 5))
    .fill("")
    .map(() => assetLoaderDataCreator());

export const fundDetailsLoaderDataCreator = (): FundDetailsList => ({
  totalAssetsCount: 0,
  topFundAssets: assetsLoaderDataCreator(),
  investorsCount: getRandomInteger(0, 100),
  owner: ownerLoaderData,
  balance: {
    currency: "GVT",
    amount: getRandomInteger(0, 100)
  },
  personalDetails: {
    isFavorite: false,
    isOwnAsset: false
  },
  id: "",
  logo: "",
  url: "",
  color: getRandomColor(),
  title: "Fund name",
  description: "",
  status: "None",
  creationDate: mockDate,
  statistic: {
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
