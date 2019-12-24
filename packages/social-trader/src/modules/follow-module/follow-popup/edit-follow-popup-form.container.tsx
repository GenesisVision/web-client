import { SignalSubscription } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { useGetRate } from "hooks/get-rate.hook";
import FollowParams, {
  FollowParamsFormValues
} from "modules/follow-module/follow-popup/follow-popup-params";
import FollowTop from "modules/follow-module/follow-popup/follow-popup-top";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { subscribeFixedCurrenciesSelector } from "reducers/platform-reducer";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

import { getUpdateAttachMethod } from "../services/follow-module-service";

const DEFAULT_RATE_CURRENCY = "USD";

const _EditFollowModuleFormContainer: React.FC<Props> = ({
  tradingAccountId,
  id,
  signalSubscription,
  currency,
  onClose,
  onApply
}) => {
  const subscribeFixedCurrencies = useSelector(
    subscribeFixedCurrenciesSelector
  );
  const { sendRequest: submitChanges } = useApiRequest({
    request: getUpdateAttachMethod(signalSubscription.isExternal),
    successMessage: "follow-program.edit-success-alert-message",
    middleware: [onApply, onClose]
  });

  const { rate, getRate } = useGetRate();

  useEffect(() => {
    currency && getRate({ from: DEFAULT_RATE_CURRENCY, to: currency });
  }, [currency]);

  const submit = useCallback(
    (values: FollowParamsFormValues, setSubmitting: SetSubmittingType) => {
      const requestParams = {
        ...values,
        tradingAccountId
      };
      submitChanges({ id, requestParams }, setSubmitting);
    },
    [id, tradingAccountId]
  );
  return (
    <>
      <FollowTop step={"params"} />
      <FollowParams
        subscribeFixedCurrencies={subscribeFixedCurrencies}
        rate={rate}
        currency={currency}
        paramsSubscription={signalSubscription}
        onSubmit={submit}
      />
    </>
  );
};

interface Props {
  tradingAccountId: string;
  onClose: () => void;
  onApply: () => void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription: SignalSubscription;
}

const EditFollowModuleFormContainer = React.memo(
  _EditFollowModuleFormContainer
);
export default EditFollowModuleFormContainer;
