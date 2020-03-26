import { AssetInfo } from "gv-api-web";
import platformApi from "services/api-client/platform-api";
import { api } from "services/api-client/swagger-custom-client";
import {
  getRandomWord,
  getRandomWords,
  tableLoaderCreator
} from "utils/helpers";

const getTag = () => ({ label: getRandomWord() });

export const getActiveLoaderData = (active?: string): AssetInfo => ({
  socialLinks: [],
  logo: "",
  symbol: "",
  chartSymbol: "",
  name: active || getRandomWord(3),
  description: getRandomWords(50),
  tags: tableLoaderCreator(getTag)
});

export const fetchActive = ({ active }: { active: string }) =>
  api.platform().getPlatformAssetInfo(active);
