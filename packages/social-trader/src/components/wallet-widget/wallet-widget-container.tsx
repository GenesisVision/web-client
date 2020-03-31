import WalletWidget from "components/wallet-widget/wallet-widget";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { grandTotalSelector } from "pages/wallet/reducers/wallet.reducers";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WalletWidgetLoaderData } from "./wallet-widget.txt-loader";

const _WalletWidgetContainer: React.FC = () => {
  const currency = useAccountCurrency();
  const info = useSelector(grandTotalSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWallets(currency));
  }, [currency]);

  return <WalletWidget loaderData={WalletWidgetLoaderData} data={info!} />;
};

const WalletWidgetContainer = React.memo(_WalletWidgetContainer);
export default WalletWidgetContainer;
