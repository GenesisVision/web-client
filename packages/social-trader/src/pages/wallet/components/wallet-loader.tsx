import "./wallet-balance/wallet-balance.scss";

import { WalletBaseData } from "gv-api-web";
import * as React from "react";
import { getRandomInteger, getRandomWord } from "utils/helpers";

export const getWalletBaseLoaderData = (): WalletBaseData => ({
  id: getRandomWord(),
  title: getRandomWord(),
  logo: getRandomWord(),
  currency: "GVT",
  available: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
});

export const getWalletBaseLoaderDataWithETHCurrency = (): WalletBaseData => ({
  id: getRandomWord(),
  title: getRandomWord(),
  logo: getRandomWord(),
  currency: "ETH",
  available: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
});
