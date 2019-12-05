import * as faker from "faker";
import { AssetInfo } from "gv-api-web";
import platformApi from "services/api-client/platform-api";
import { tableLoaderCreator } from "utils/helpers";

const getTag = () => ({ label: faker.lorem.word() });

export const getActiveLoaderData = (active?: string): AssetInfo => ({
  logo: "",
  symbol: "",
  chartSymbol: "",
  name: active || faker.finance.currencyName(),
  description: faker.lorem.words(50),
  tags: tableLoaderCreator(getTag)
});

export const fetchActive = ({ active }: { active: string }) =>
  platformApi.getPlatformAssetInfo(active);
