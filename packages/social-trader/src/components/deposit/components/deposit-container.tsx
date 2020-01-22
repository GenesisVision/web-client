import Dialog, { IDialogProps } from "components/dialog/dialog";
import { ASSET } from "constants/constants";
import { WalletBaseData } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import dynamic from "next/dynamic";
import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import {
  fetchAvailableWallets,
  TWalletsAvailableData
} from "pages/wallet/services/wallet.services";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { gvInvestFeeSelector } from "reducers/platform-reducer";
import { CurrencyEnum } from "utils/types";

const DepositPopup = dynamic(() => import("./deposit-popup"));

const _DepositContainer: React.FC<Props> = ({
  title,
  availableToInvest,
  entryFee,
  minDeposit,
  asset,
  id,
  open,
  hasEntryFee,
  onClose,
  currency,
  onApply,
  ownAsset
}) => {
  const wallets: WalletBaseData[] = useSelector(walletsSelector).map(
    ({ currency, available, id, logo, title }) => ({
      currency,
      available,
      id,
      logo,
      rate: 1,
      title
    })
  );
  const gvCommission = useSelector(gvInvestFeeSelector);
  const stateCurrency = useSelector(currencySelector);
  const { data, sendRequest: getInvestInfo } = useApiRequest<
    TWalletsAvailableData
  >({
    request: fetchAvailableWallets
  });
  useEffect(() => {
    id && open && getInvestInfo({ currency: stateCurrency });
  }, [open]);
  const fees = { gvCommission, entryFee };
  if (!wallets.length) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DepositPopup
        title={title}
        ownAsset={ownAsset}
        availableToInvest={availableToInvest}
        fees={fees}
        minDeposit={minDeposit}
        loaderData={wallets}
        id={id}
        onClose={onClose}
        onApply={onApply}
        data={data!}
        asset={asset}
        hasEntryFee={hasEntryFee}
        currency={currency || stateCurrency}
      />
    </Dialog>
  );
};

interface Props extends IDialogProps {
  title: string;
  availableToInvest?: number;
  entryFee?: number;
  minDeposit: number;
  asset: ASSET;
  id: string;
  onApply: () => void;
  hasEntryFee?: boolean;
  currency?: CurrencyEnum;
  ownAsset?: boolean;
}

const DepositContainer = React.memo(_DepositContainer);
export default DepositContainer;
