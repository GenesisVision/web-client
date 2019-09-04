import {
  AttachToSignalProvider,
  SignalSubscription,
  WalletData
} from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { Dispatch, bindActionCreators, compose } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { FOLLOW_TYPE } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import {
  AlertActionCreator,
  alertMessageActions
} from "shared/modules/alert-message/actions/alert-message-actions";
import { rateApi } from "shared/services/api-client/rate-api";
import {
  CurrencyEnum,
  ResponseError,
  SetSubmittingType
} from "shared/utils/types";

import FollowPopupForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  getSignalInfo,
  updateAttachToSignal
} from "./services/program-follow-service";

const _ProgramFollowContainer: React.FC<Props> = ({
  id,
  signalSubscription,
  currency,
  onClose,
  service,
  onApply,
  wallets,
  open
}) => {
  const [t] = useTranslation();
  const [rate, setRate] = useState<number>(1);
  const [minDeposit, setMinDeposit] = useState<number | undefined>(undefined);
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();
  const [type, setType] = useState<FOLLOW_TYPE>(
    signalSubscription.hasActiveSubscription
      ? FOLLOW_TYPE.EDIT
      : FOLLOW_TYPE.CREATE
  );
  const [successMessage] = useState<string>(
    type === FOLLOW_TYPE.CREATE
      ? "follow-program.create-success-alert-message"
      : "follow-program.edit-success-alert-message"
  );
  useEffect(() => {
    setIsPending();
    getSignalInfo(id)
      .then(setMinDeposit)
      .finally(setIsNotPending);
    rateApi.v10RateByFromByToGet("USD", currency).then(setRate);
  }, []);
  useEffect(
    () => {
      setType(
        signalSubscription.hasActiveSubscription
          ? FOLLOW_TYPE.EDIT
          : FOLLOW_TYPE.CREATE
      );
    },
    [signalSubscription]
  );
  const handleSubmit = useCallback(
    (
      id: string,
      requestParams: AttachToSignalProvider,
      setSubmitting: SetSubmittingType
    ) => {
      const submitMethod =
        type === FOLLOW_TYPE.CREATE ? attachToSignal : updateAttachToSignal;
      submitMethod(id, requestParams)
        .then(() => service.alertSuccess(t(successMessage)))
        .then(onApply)
        .then(onClose)
        .catch(({ errorMessage }: ResponseError) => {
          service.alertError(errorMessage);
          setSubmitting(false);
        });
    },
    [type]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <FollowPopupForm
        rate={rate}
        condition={!isPending && !!wallets.length}
        loader={<DialogLoader />}
        signalSubscription={signalSubscription}
        minDeposit={minDeposit!}
        id={id}
        currency={currency}
        wallets={wallets}
        submitMethod={handleSubmit}
      />
    </Dialog>
  );
};

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  wallets: walletsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      alertError: alertMessageActions.error,
      alertSuccess: alertMessageActions.success
    },
    dispatch
  )
});

interface DispatchProps {
  service: { alertError: AlertActionCreator; alertSuccess: AlertActionCreator };
}

interface StateProps {
  wallets: WalletData[];
}

interface OwnProps {
  open: boolean;
  onClose(): void;
  onApply(): void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription: SignalSubscription;
}

interface Props extends DispatchProps, StateProps, OwnProps {}

const ProgramFollowContainer = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramFollowContainer);
export default ProgramFollowContainer;
