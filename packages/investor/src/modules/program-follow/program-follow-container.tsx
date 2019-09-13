import { AttachToSignalProvider, SignalSubscription } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { FOLLOW_TYPE } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { rateApi } from "shared/services/api-client/rate-api";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import FollowPopupForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  getSignalInfo,
  updateAttachToSignal
} from "./services/program-follow-service";

const DEFAULT_RATE_CURRENCY = "USD";

const _ProgramFollowContainer: React.FC<Props> = ({
  id,
  signalSubscription,
  currency,
  onClose,
  onApply,
  open
}) => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);
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
  useEffect(
    () => {
      setIsPending();
      getSignalInfo(id)
        .then(setMinDeposit)
        .finally(setIsNotPending);
      rateApi
        .v10RateByFromByToGet(DEFAULT_RATE_CURRENCY, currency)
        .then(setRate);
    },
    [currency, id, setIsNotPending, setIsPending]
  );
  useEffect(
    () => {
      setType(
        signalSubscription.hasActiveSubscription
          ? FOLLOW_TYPE.EDIT
          : FOLLOW_TYPE.CREATE
      );
    },
    [signalSubscription.hasActiveSubscription]
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
        .then(() => dispatch(alertMessageActions.success(t(successMessage))))
        .then(onApply)
        .then(onClose)
        .catch(({ errorMessage }) =>
          dispatch(alertMessageActions.error(errorMessage))
        )
        .finally(() => setSubmitting(false));
    },
    [dispatch, onApply, onClose, successMessage, t, type]
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

interface Props {
  open: boolean;
  onClose(): void;
  onApply(): void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription: SignalSubscription;
}

const ProgramFollowContainer = React.memo(_ProgramFollowContainer);
export default ProgramFollowContainer;
