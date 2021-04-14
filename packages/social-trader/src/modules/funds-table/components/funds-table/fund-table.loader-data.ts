import {
  mockDate,
  ownerLoaderData
} from "components/details/details.loader-data";
import { FundAssetPercent, FundDetailsListItem } from "gv-api-web";
import {
  getRandomColor,
  getRandomInteger,
  tableLoaderCreator
} from "utils/helpers";

const assetLoaderDataCreator = (): FundAssetPercent => ({
  asset: "GVT",
  name: "Genesis Vision",
  percent: getRandomInteger(0, 100),
  logoUrl: "",
  url: "genesis-vision-token"
});
const assetsLoaderDataCreator = (): FundAssetPercent[] =>
  new Array(getRandomInteger(1, 5))
    .fill("")
    .map(() => assetLoaderDataCreator());

export const fundDetailsLoaderDataCreator = (): FundDetailsListItem => ({
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
  index: 0,
  logoUrl: "",
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

export const fundListLoaderDataWithCount = (
  count?: number
): FundDetailsListItem[] =>
  tableLoaderCreator(fundDetailsLoaderDataCreator, count);

export const userFundListLoaderData: FundDetailsListItem[] = fundListLoaderDataWithCount(
  4
);

export const fundListLoaderData: FundDetailsListItem[] = fundListLoaderDataWithCount();
