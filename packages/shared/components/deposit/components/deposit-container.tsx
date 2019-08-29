import { FundInvestInfo, ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { fetchBaseWallets } from "shared/components/wallet/services/wallet.services";
import { ASSET } from "shared/constants/constants";
import useErrorMessage from "shared/hooks/error-message.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import DepositPopup from "./deposit-popup";
import { TAssetInvestCreator, TGetAssetInfoCreator } from "./deposit.types";

const _DepositContainer: React.FC<Props> = ({
  asset,
  id,
  open,
  hasEntryFee,
  onClose,
  currency,
  stateCurrency,
  fetchInfo,
  service,
  onApply
}) => {
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const [wallets, setWallets] = useState<WalletBaseData[] | undefined>(
    undefined
  );
  const [investInfo, setInvestInfo] = useState<
    ProgramInvestInfo | FundInvestInfo | undefined
  >(undefined);
  useEffect(() => {
    service
      .fetchBaseWallets()
      .then(setWallets)
      .catch(setErrorMessage);
    fetchInfo(id, currency || stateCurrency)
      .then(setInvestInfo)
      .catch(setErrorMessage);
  }, []);
  const closePopup = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  const handleInvest = useCallback(
    (
      amount: number,
      currency: CurrencyEnum,
      setSubmitting: SetSubmittingType
    ) => {
      service
        .assetInvest(id, amount, currency)
        .then(onApply)
        .then(closePopup)
        .catch(setErrorMessage)
        .finally(() => {
          setSubmitting(false);
        });
    },
    [id]
  );
  return (
    <Dialog open={open} onClose={closePopup}>
      <DepositPopup
        condition={!!wallets && !!investInfo}
        loader={<DialogLoader />}
        wallets={wallets!}
        investInfo={investInfo!}
        asset={asset}
        hasEntryFee={hasEntryFee}
        currency={currency || stateCurrency}
        invest={handleInvest}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  stateCurrency: currencySelector(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { assetInvest }: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      assetInvest,
      fetchBaseWallets
    },
    dispatch
  )
});

interface OwnProps extends IDialogProps {
  asset: ASSET;
  id: string;
  onApply(): void;
  fetchInfo: ReturnType<TGetAssetInfoCreator>;
  assetInvest: ReturnType<TAssetInvestCreator>;
  hasEntryFee?: boolean;
  currency?: CurrencyEnum;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  assetInvest: ReturnType<TAssetInvestCreator>;
  fetchBaseWallets: typeof fetchBaseWallets;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface StateProps {
  stateCurrency: CurrencyEnum;
}

interface Props extends OwnProps, DispatchProps, StateProps {}

const DepositContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_DepositContainer);
export default DepositContainer;
