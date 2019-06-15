import "./wallet-balance.scss";

import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import translate from "react-i18next/src/translate";
import Surface from "shared/components/surface/surface";
import SvgLoader from "shared/components/svg-loader/svg-loader";
import Table from "shared/components/table/components/table";

import { WALLET_TRANSACTIONS_COLUMNS } from "../wallet-tables/wallet-transactions/wallet-transactions.constants";
import WalletSettingsLoader from "./wallet-settings-loader";

const _WalletBalanceLoader: React.FC<InjectedTranslateProps> = ({ t }) => (
  <>
    <div className="wallet-balance__wrapper">
      <h1 className="wallet-balance__title">{t("wallet-page.title")}</h1>
      <WalletSettingsLoader />
    </div>
    <div className="wallet-balance__wrapper">
      <WalletLoaderStat />
      <WalletLoaderStatIndicator />
      <WalletLoaderStatIndicator />
      <WalletLoaderStatIndicator />
    </div>
    <Surface className="wallet-container">
      <div className="wallet-container__header">
        <div className="wallet-container__tabs">
          <SvgLoader height={15} width={120}>
            <rect x="0" y="0" width="50" height="13" rx="8" ry="8" />
            <rect x="60" y="0" width="60" height="13" rx="8" ry="8" />
          </SvgLoader>
        </div>
      </div>
      <Table
        columns={WALLET_TRANSACTIONS_COLUMNS}
        isPending
        renderHeader={() => (
          <span className={`wallet-transactions__cell`}>
            <SvgLoader height={20} width={100}>
              <rect x="0" y="0" width="100" height="15" rx="8" ry="8" />
            </SvgLoader>
          </span>
        )}
      />
    </Surface>
  </>
);
const WalletBalanceLoader = translate()(_WalletBalanceLoader);

const WalletLoaderStat = () => (
  <div className="wallet-balance__loader-stat">
    <SvgLoader height={70} width={200}>
      <rect x="0" y="0" width="40" height="15" rx="8" ry="8" />
      <rect x="0" y="25" width="140" height="20" rx="8" ry="8" />
      <rect x="0" y="55" width="100" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

const WalletLoaderStatIndicator = () => (
  <div className="wallet-balance__loader-stat">
    <SvgLoader height={70} width={200}>
      <circle cx="20" cy="37" r="20" />
      <rect x="60" y="0" width="40" height="15" rx="8" ry="8" />
      <rect x="60" y="25" width="140" height="20" rx="8" ry="8" />
      <rect x="60" y="55" width="100" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export default WalletBalanceLoader;
