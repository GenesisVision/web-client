import "./wallet-balance.scss";

import GVTabs from "gv-react-components/dist/gv-tabs";
import GVTab from "gv-react-components/dist/gv-tabs/gv-tab";
import * as React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";
import Table from "shared/components/table/components/table";

import Surface from "../../../surface/surface";
import TableContainer from "../../../table/components/table-container";
import { WALLET_TRANSACTIONS_COLUMNS } from "../wallet-transactions/wallet-transactions.constants";

const WalletBalanceLoader = () => (
  <div className="wallet-balance">
    <SvgLoader height="72" width="250">
      <rect x="0" y="0" width="120" height="32" rx="8" ry="8" />
      <rect x="130" y="0" width="100" height="32" rx="8" ry="8" />
    </SvgLoader>
    <div className="wallet-balance__loader-row">
      <WalletLoaderStat />
      <WalletLoaderStatIndicator />
      <WalletLoaderStatIndicator />
      <WalletLoaderStatIndicator />
    </div>
    <Surface className="wallet-container">
      <div className="wallet-container__header">
        <div className="wallet-container__tabs">
          <SvgLoader height="15" width="120">
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
            <SvgLoader height="20" width="100">
              <rect x="0" y="0" width="100" height="15" rx="8" ry="8" />
            </SvgLoader>
          </span>
        )}
      />
    </Surface>
  </div>
);

const WalletLoaderStat = () => (
  <div className="wallet-balance__loader-stat">
    <SvgLoader height="70" width="200">
      <rect x="0" y="0" width="40" height="15" rx="8" ry="8" />
      <rect x="0" y="25" width="140" height="20" rx="8" ry="8" />
      <rect x="0" y="55" width="100" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

const WalletLoaderStatIndicator = () => (
  <div className="wallet-balance__loader-stat">
    <SvgLoader height="70" width="200">
      <circle cx="20" cy="37" r="20" />
      <rect x="60" y="0" width="40" height="15" rx="8" ry="8" />
      <rect x="60" y="25" width="140" height="20" rx="8" ry="8" />
      <rect x="60" y="55" width="100" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export default WalletBalanceLoader;
