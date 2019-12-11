import "./wallet-balance/wallet-balance.scss";

import SvgLoader from "components/svg-loader/svg-loader";
import * as faker from "faker";
import { WalletData, WalletSummary } from "gv-api-web";
import * as React from "react";
import { getRandomInteger } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletSettingsLoader from "./wallet-settings/wallet-settings-loader";
import WalletTablesLoader from "./wallet-tables/wallet-tables-loader";

const WalletContainerLoader = () => (
  <div className="wallet-balance">
    <WalletTitleLoader />
    <WalletBalanceLoader />
    <WalletTablesLoader />
  </div>
);

const WalletTitleLoader: React.FC = () => (
  <div className="wallet-balance__wrapper">
    <h1 className="wallet-balance__title">
      <SvgLoader height={15} width={100}>
        <rect x="0" y="0" width="100" height="15" rx="8" ry="8" />
      </SvgLoader>
    </h1>
    <WalletSettingsLoader />
  </div>
);

export const walletDataCreator = (): WalletData => ({
  availableCcy: getRandomInteger(1, 1000),
  investedCcy: getRandomInteger(1, 1000),
  tradingCcy: getRandomInteger(1, 1000),
  pendingCcy: getRandomInteger(1, 1000),
  totalCcy: getRandomInteger(1, 1000),
  id: faker.lorem.word(),
  title: faker.lorem.word(),
  logo: faker.lorem.word(),
  isDepositEnabled: false,
  isWithdrawalEnabled: false,
  withdrawalCommission: getRandomInteger(1, 1000),
  depositAddress: faker.lorem.word(),
  currency: "GVT" as CurrencyEnum,
  available: getRandomInteger(1, 1000),
  invested: getRandomInteger(1, 1000),
  trading: getRandomInteger(1, 1000),
  total: getRandomInteger(1, 1000),
  availableCcy: getRandomInteger(1, 1000),
  investedCcy: getRandomInteger(1, 1000),
  pendingCcy: getRandomInteger(1, 1000),
  totalCcy: getRandomInteger(1, 1000),
  tradingCcy: getRandomInteger(1, 1000),
  pending: getRandomInteger(1, 1000)
});

export const walletMultiSummaryLoaderData: WalletSummary = {
  grandTotal: {
    currency: "GVT",
    available: getRandomInteger(1, 1000),
    invested: getRandomInteger(1, 1000),
    trading: getRandomInteger(1, 1000),
    total: getRandomInteger(1, 1000)
  },
  wallets: Array(4)
    .fill("")
    .map(walletDataCreator),
  payFeesWithGvt: false
};

export default WalletContainerLoader;
