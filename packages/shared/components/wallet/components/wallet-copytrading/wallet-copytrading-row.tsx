import { CopyTradingAccountInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import Profitability from "shared/components/profitability/profitability";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { formatCurrencyValue } from "shared/utils/formatter";

import { composeWalletCurrencyUrl } from "../../wallet.routes";
import WalletCopytradingActions from "./wallet-copytrading-action-cell";

export interface ITransactionRowProps {
  wallet: CopyTradingAccountInfo;
}

class WalletCopytradingRow extends React.Component<
  ITransactionRowProps & InjectedTranslateProps
> {
  render() {
    const { t, wallet } = this.props;
    return (
      <React.Fragment>
        <TableRow className="wallet-copytrading__row">
          <TableCell className="wallet-list__cell wallet-list__cell--wallet">
            <Link
              className="wallet-list__link"
              to={{
                pathname: composeWalletCurrencyUrl(
                  wallet.currency.toLowerCase()
                ),
                state: `/ ${t("wallet-page.title")}`
              }}
            >
              <img
                src={filesService.getFileUrl(wallet.logo)}
                className="wallet-list__icon"
                alt="Icon"
              />
              {wallet.currency}
            </Link>
          </TableCell>
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--balance">
            <Profitability value={wallet.balance}>
              <NumberFormat
                value={formatCurrencyValue(wallet.balance, wallet.currency)}
                thousandSeparator=" "
                displayType="text"
              />
            </Profitability>
          </TableCell>
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--equity">
            <Profitability value={wallet.equity}>
              <NumberFormat
                value={formatCurrencyValue(wallet.equity, wallet.currency)}
                thousandSeparator=" "
                displayType="text"
              />
            </Profitability>
          </TableCell>
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--freeMargin">
            <Profitability value={wallet.freeMargin}>
              <NumberFormat
                value={formatCurrencyValue(wallet.equity, wallet.currency)}
                thousandSeparator=" "
                displayType="text"
              />
            </Profitability>
          </TableCell>
          <TableCell className="wallet-copytrading__cell wallet-copytrading__cell--actions">
            <WalletCopytradingActions />
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default WalletCopytradingRow;
