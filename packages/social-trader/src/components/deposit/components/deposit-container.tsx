import Dialog, { IDialogProps } from "components/dialog/dialog";
import FormError from "components/form/form-error/form-error";
import {
  fetchBaseWallets,
  TWalltetsBaseData
} from "components/wallet/services/wallet.services";
import useApiRequest from "hooks/api-request.hook";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { gvInvestFeeSelector } from "reducers/platform-reducer";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "utils/types";

import DepositPopup from "./deposit-popup";
import { DepositInfoLoaderData } from "./deposit.loader";
import { TAssetDeposit } from "./deposit.types";

const _DepositContainer: React.FC<Props> = ({
  availableToInvest,
  entryFee,
  minDeposit,
  assetInvest,
  asset,
  id,
  open,
  hasEntryFee,
  onClose,
  currency,
  onApply,
  ownAsset
}) => {
  const gvCommission = useSelector(gvInvestFeeSelector);
  const stateCurrency = useSelector(currencySelector);
  const { data, sendRequest: getInvestInfo, errorMessage } = useApiRequest<
    TWalltetsBaseData
  >({
    request: fetchBaseWallets
  });
  useEffect(() => {
    id && open && getInvestInfo({ currency: stateCurrency });
  }, [open]);
  const fees = { gvCommission, entryFee };
  return (
    <Dialog open={open} onClose={onClose}>
      <DepositPopup
        ownAsset={ownAsset}
        availableToInvest={availableToInvest}
        fees={fees}
        minDeposit={minDeposit}
        loaderData={DepositInfoLoaderData}
        id={id}
        onClose={onClose}
        assetInvest={assetInvest}
        onApply={onApply}
        data={data!}
        asset={asset}
        hasEntryFee={hasEntryFee}
        currency={currency || stateCurrency}
      />
      <FormError error={errorMessage} />
    </Dialog>
  );
};

interface Props extends IDialogProps {
  availableToInvest?: number;
  entryFee?: number;
  minDeposit: number;
  asset: ASSET;
  id: string;
  onApply: () => void;
  assetInvest: TAssetDeposit;
  hasEntryFee?: boolean;
  currency?: CurrencyEnum;
  ownAsset?: boolean;
}

const DepositContainer = React.memo(_DepositContainer);
export default DepositContainer;
