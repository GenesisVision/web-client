import "./wallet-copytrading.scss";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { fetchCopytradingAccounts } from "../../services/wallet.services";
import WalletCopytradingRow from "./wallet-copytrading-row";
import { WALLET_COPYTRADING_COLUMNS } from "./wallet-copytrading.constants";

const WalletCopytrading: React.FC<InjectedTranslateProps> = ({ t }) => (
  <div className="wallet-copytrading">
    <TableModule
      paging={DEFAULT_PAGING}
      getItems={fetchCopytradingAccounts}
      columns={WALLET_COPYTRADING_COLUMNS}
      renderHeader={column => (
        <span
          className={`wallet-copytrading__cell wallet-copytrading__cell--${
            column.name
          }`}
        >
          {t(`wallet-page.copytrading.${column.name}`)}
        </span>
      )}
      renderBodyRow={wallet => <WalletCopytradingRow wallet={wallet} />}
    />
  </div>
);

export default React.memo(translate()(WalletCopytrading));
