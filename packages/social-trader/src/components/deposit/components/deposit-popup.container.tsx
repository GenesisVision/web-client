import DepositPopup, {
  IDepositContainerProps
} from "components/deposit/components/deposit-popup";
import { WalletData } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import {
  fetchAvailableWallets,
  TWalletsAvailableData
} from "pages/wallet/services/wallet.services";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export interface IDepositPopupContainerProps extends IDepositContainerProps {}

const _DepositPopupContainer: React.FC<IDepositPopupContainerProps> = props => {
  const stateWallets: WalletData[] = useSelector(walletsSelector);

  const currency = useAccountCurrency();
  const { data, sendRequest: getInvestInfo } = useApiRequest<
    TWalletsAvailableData
  >({
    name: "DepositPopupContainer",
    cache: true,
    fetchOnMountData: { currency },
    fetchOnMount: true,
    request: fetchAvailableWallets
  });

  useEffect(() => {
    getInvestInfo({ currency });
  }, [currency, props.id]);

  const wallets = useMemo(
    () =>
      stateWallets.map(({ currency, available, id, title, logoUrl }) => ({
        currency,
        available,
        id,
        logoUrl,
        rate: 1,
        title
      })),
    [stateWallets]
  );

  return <DepositPopup {...props} data={data!} loaderData={wallets} />;
};

const DepositPopupContainer = React.memo(_DepositPopupContainer);
export default DepositPopupContainer;
