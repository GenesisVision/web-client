import "./wallet-widget.scss";

import { WalletsGrandTotal } from "gv-api-web";
import { getRandomInteger } from "utils/helpers";

export const WalletWidgetLoaderData: WalletsGrandTotal = {
  currency: "GVT",
  available: getRandomInteger(),
  invested: getRandomInteger(),
  trading: getRandomInteger(),
  total: getRandomInteger()
};
