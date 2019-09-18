import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WalletWidget from "shared/components/wallet-widget/wallet-widget";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { currencySelector } from "shared/reducers/account-settings-reducer";

import { grandTotalSelector } from "../wallet/reducers/wallet.reducers";
import { WalletWidgetLoader } from "./wallet-widget.loader";

const _WalletWidgetContainer: React.FC<Props> = ({ className }) => {
  const currency = useSelector(currencySelector);
  const info = useSelector(grandTotalSelector);
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(fetchWallets(currency));
    },
    [currency]
  );

  return (
    <WalletWidget
      condition={!!info}
      loader={<WalletWidgetLoader className={className} />}
      className={className}
      info={info!}
    />
  );
};

interface Props {
  className?: string;
}

const WalletWidgetContainer = React.memo(_WalletWidgetContainer);
export default WalletWidgetContainer;
