import { CoinsAsset } from "gv-api-web";
import {
  getRandomColor,
  getRandomInteger,
  tableLoaderCreator
} from "utils/helpers";

const assetLoaderDataCreator = (): CoinsAsset => ({
  price: 0,
  change24Volume: 0,
  marketCap: 0,
  asset: "GVT",
  name: "Genesis Vision",
  change24Percent: getRandomInteger(0, 100),
  logoUrl: "",
  url: "genesis-vision-token",
  chart: {
    chart: [
      {
        date: 0,
        value: 0
      }
    ],
    lastPrice: 0,
    changePercent: 0
  },
  color: getRandomColor(),
  id: "",
  description: "",
  provider: "Undefined",
  details: {
    name: "Genesis Vision Token",
    symbol: "GVT",
    logoUrl: "",
    description: "",
    chartSymbol: "",
    lastModified: new Date(),
    tags: [
      {
        name: "CRYPTO",
        color: "#B7C400"
      }
    ],
    socialLinks: []
  },
  averagePrice: 0,
  profitCurrent: 0,
  amount: 0
});

export const assetsPortfolioListLoaderDataWithCount = (
  count?: number
): CoinsAsset[] => tableLoaderCreator(assetLoaderDataCreator, count);
