import "./wallet-balance/wallet-balance.scss";

import WalletImage from "components/avatar/wallet-image/wallet-image";
import Page from "components/page/page";
import SvgLoader from "components/svg-loader/svg-loader";
import faker from "faker";
import { WalletBaseData } from "gv-api-web";
import * as React from "react";

import { getRandomInteger } from "../../../utils/helpers";
import WalletBalanceButtonsLoader from "./wallet-balance/wallet-balance-buttons-loader";
import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";

const WalletLoader = () => (
  <Page title={""}>
    <div className="wallet-balance">
      <WalletTitleLoader />
      <WalletBalanceLoader />
    </div>
  </Page>
);

const WalletTitleLoader: React.FC = () => (
  <div className="wallet-balance__wrapper">
    <h1 className="wallet-balance__title">
      <SvgLoader width={210} height={32}>
        <rect x="0" y="0" width="100" height="32" rx="8" ry="8" />
        <rect x="110" y="0" width="100" height="32" rx="8" ry="8" />
      </SvgLoader>
      <WalletImage
        imageClassName="wallet-balance__title-icon"
        alt={""}
        url={""}
      />
    </h1>
    <WalletBalanceButtonsLoader />
  </div>
);

export const getWalletBaseLoaderData = (): WalletBaseData => ({
  id: faker.lorem.word(),
  title: faker.lorem.word(),
  logo: faker.lorem.word(),
  currency: "GVT",
  available: getRandomInteger(0, 100),
  rate: getRandomInteger(0, 100)
});

export default WalletLoader;
