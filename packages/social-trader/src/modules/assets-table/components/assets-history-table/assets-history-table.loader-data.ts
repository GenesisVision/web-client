import {
  getRandomColor,
  tableLoaderCreator
} from "utils/helpers";
import { CoinsHistoryEvent } from "gv-api-web";

export const assetLoaderDataCreator = (): CoinsHistoryEvent => ({
  date: new Date(),
  trade: {
    date: new Date(),
    soldAmount: 0,
    soldAsset: {
      id: "",
      asset: "GVT",
      name: "Genesis Vision",
      logoUrl: "",
      url: "genesis-vision-token",
      color: getRandomColor(),
      provider: "Undefined",
      description: ""
    },
    boughtAmount: 0,
    boughtAsset: {
      id: "",
      asset: "GVT",
      name: "Genesis Vision",
      logoUrl: "",
      url: "genesis-vision-token",
      color: getRandomColor(),
      provider: "Undefined",
      description: ""
    },
    commission: 0,
    commissionCurrency: "GVT"
  }
});

export const assetsHistoryLoaderDataWithCount = (
  count?: number
): CoinsHistoryEvent[] => tableLoaderCreator(assetLoaderDataCreator, count);
