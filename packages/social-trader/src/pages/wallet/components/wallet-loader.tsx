import { WalletBaseData } from "gv-api-web";
import { getRandomInteger, getRandomWord } from "utils/helpers";

export const getWalletBaseLoaderData = (): WalletBaseData => ({
  id: getRandomWord(),
  title: getRandomWord(),
  logo: getRandomWord(),
  logoUrl: "",
  currency: "GVT",
  available: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
});
