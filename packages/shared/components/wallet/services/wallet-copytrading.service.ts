import { CopyTradingAccountInfo } from "gv-api-web";

import { TableItems } from "../../table/helpers/mapper";
import { fetchCopytradingAccounts } from "./wallet.services";

export const fetchWalletCopytradingAccount = (symbol: string = "") => {
  return fetchCopytradingAccounts().then(
    (data: TableItems<CopyTradingAccountInfo>) => {
      return data.items.find(
        x => x.currency.toUpperCase() === symbol.toUpperCase()
      );
    }
  );
};
