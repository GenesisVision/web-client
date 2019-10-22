import "./wallet-balance/wallet-balance.scss";

import * as faker from "faker";
import { CopyTradingAccountInfo, WalletMultiSummary } from "gv-api-web";
import * as React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";
import { getRandomInteger, tableLoaderCreator } from "shared/utils/helpers";

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

export const walletDataCreator = () => ({
  id: faker.lorem.word(),
  title: faker.lorem.word(),
  logo: faker.lorem.word(),
  rateToGVT: getRandomInteger(1, 1000),
  isDepositEnabled: false,
  isWithdrawalEnabled: false,
  withdrawalCommission: getRandomInteger(1, 1000),
  depositAddress: faker.lorem.word(),
  currency: "GVT",
  available: getRandomInteger(1, 1000),
  invested: getRandomInteger(1, 1000),
  pending: getRandomInteger(1, 1000),
  total: getRandomInteger(1, 1000),
  currencyCcy: "GVT",
  availableCcy: getRandomInteger(1, 1000),
  investedCcy: getRandomInteger(1, 1000),
  pendingCcy: getRandomInteger(1, 1000),
  totalCcy: getRandomInteger(1, 1000)
});

export const walletMultiSummaryLoaderData: WalletMultiSummary = {
  grandTotal: {
    currency: "GVT",
    available: getRandomInteger(1, 1000),
    invested: getRandomInteger(1, 1000),
    pending: getRandomInteger(1, 1000),
    total: getRandomInteger(1, 1000),
    currencyCcy: "GVT",
    availableCcy: getRandomInteger(1, 1000),
    investedCcy: getRandomInteger(1, 1000),
    pendingCcy: getRandomInteger(1, 1000),
    totalCcy: getRandomInteger(1, 1000)
  },
  wallets: Array(4)
    .fill("")
    .map(walletDataCreator),
  payFeesWithGvt: false
};

export const getAccountLoaderData = (): CopyTradingAccountInfo => ({
  id: "",
  currency: "",
  logo: "",
  title: faker.lorem.word(),
  balance: getRandomInteger(0, 100),
  equity: getRandomInteger(0, 100),
  freeMargin: getRandomInteger(0, 100),
  marginLevel: getRandomInteger(0, 100),
  available: getRandomInteger(0, 100),
  personalInfo: {
    isOwnSignal: false,
    isFavorite: false
  }
});

export const AccountsLoaderData: CopyTradingAccountInfo[] = tableLoaderCreator(
  getAccountLoaderData,
  4
);

export default WalletContainerLoader;
