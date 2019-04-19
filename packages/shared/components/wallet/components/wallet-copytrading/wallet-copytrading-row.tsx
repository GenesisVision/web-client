import { CopyTradingAccountInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Profitability from "shared/components/profitability/profitability";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { formatCurrencyValue } from "shared/utils/formatter";

import { composeWalletCopytradingCurrencyUrl } from "../../wallet.routes";
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
                pathname: composeWalletCopytradingCurrencyUrl(
                  wallet.currency.toLowerCase()
                ),
                state: `/ ${t("wallet-copytrading-page.title")}`
              }}
            >
              <WalletImage
                url={wallet.logo}
                alt={wallet.currency}
                imageClassName="wallet-list__icon"
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

export default translate()(WalletCopytradingRow);
