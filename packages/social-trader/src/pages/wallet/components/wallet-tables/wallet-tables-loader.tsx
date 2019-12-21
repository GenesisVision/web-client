import Surface from "components/surface/surface";
import SvgLoader from "components/svg-loader/svg-loader";
import Table from "components/table/components/table";
import * as React from "react";

import { WALLET_TRANSACTIONS_COLUMNS } from "./wallet-transactions/wallet-transactions.constants";

const WalletTablesLoader: React.FC = () => (
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
);

export default WalletTablesLoader;
