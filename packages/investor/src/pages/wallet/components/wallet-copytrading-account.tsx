import { CopyTradingAccountInfo } from "gv-api-web";
import { GVButton } from "gv-react-components";
import CopytradingTablesSection from "modules/copytrading-tables/components/copytrading-tables-section";
import React, { Component, ComponentType, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { compose } from "redux";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import NotFoundPage from "shared/components/not-found/not-found";
import Page from "shared/components/page/page";
import WalletBalanceLoader from "shared/components/wallet/components/wallet-balance/wallet-balance-loader";
import ConvertIcon from "shared/media/convert.svg";
import RootState from "shared/reducers/root-reducer";

import { fetchWalletCopytradingAccount } from "../services/wallet-copytrading.service";
import WalletCopytradingBalance from "./wallet-copytrading-balance";

interface IWalletCopytradingAccountOwnProps {
  preferredCurrency: string;
  walletCurrency: string;
}

interface IWalletCopytradingAccountProps
  extends IWalletCopytradingAccountOwnProps,
    InjectedTranslateProps {}
interface IWalletCopytradingAccountState {
  wallet?: CopyTradingAccountInfo;
  isPending: boolean;
  hasError: boolean;
}

class WalletCopytradingAccount extends Component<
  IWalletCopytradingAccountProps,
  IWalletCopytradingAccountState
> {
  constructor(props: IWalletCopytradingAccountProps) {
    super(props);
    this.state = {
      wallet: undefined,
      isPending: false,
      hasError: false
    };
  }

  componentDidMount() {
    this.setState({ isPending: true });

    fetchWalletCopytradingAccount(this.props.walletCurrency)
      .then(data => {
        if (!data) {
          this.setState({ hasError: true, isPending: false });
        } else {
          this.setState({ wallet: data });
        }
      })
      .catch(() => this.setState({ isPending: false }));
  }

  render() {
    const { t } = this.props;
    const { wallet, hasError } = this.state;

    if (hasError) {
      return <NotFoundPage />;
    }

    if (!wallet) return <WalletBalanceLoader />;

    return (
      <Page title={t("wallet-copytrading-page.title")}>
        <div className="wallet-balance">
          <div className="wallet-balance__wrapper">
            <h1 className="wallet-balance__title">
              {wallet.currency}
              <span>&nbsp;{t("wallet-copytrading-page.title")}&nbsp;</span>
              <WalletImage
                url={"" /*wallet.logo*/}
                imageClassName="wallet-transactions__icon"
                alt={wallet.currency}
              />
            </h1>
            <div className="wallet-balance__buttons">
              <GVButton
                color="secondary"
                variant="outlined"
                onClick={/*handleTransfer*/ () => {}}
              >
                <Fragment>
                  <img
                    className="wallet-balance__button-icon"
                    src={ConvertIcon}
                    alt="Convert Icon"
                  />
                  {t("wallet-page.transfer")}
                </Fragment>
              </GVButton>
            </div>
          </div>
          <WalletCopytradingBalance wallet={wallet} />
        </div>
        <CopytradingTablesSection title={t("wallet-copytrading-page.title")} />
      </Page>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<{ currency: string }>
) => {
  const { currency: walletCurrency } = ownProps.match.params;
  const { currency: preferredCurrency } = state.accountSettings;

  return { preferredCurrency, walletCurrency };
};

export default compose<ComponentType<void>>(
  connect(mapStateToProps),
  translate()
)(WalletCopytradingAccount);
