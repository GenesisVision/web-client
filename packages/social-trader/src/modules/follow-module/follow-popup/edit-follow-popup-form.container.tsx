import { SignalSubscription } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { useGetRate } from "hooks/get-rate.hook";
import FollowParams, {
  FollowParamsFormValues
} from "modules/follow-module/follow-popup/follow-popup-params";
import FollowTop from "modules/follow-module/follow-popup/follow-popup-top";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { subscribeFixedCurrenciesSelector } from "reducers/platform-reducer";
import { postponeCallback } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import { getUpdateAttachMethod } from "../services/follow-module-service";

const DEFAULT_RATE_CURRENCY = "USD";

const _EditFollowModuleFormContainer: React.FC<Props> = ({
  title,
  renderAssetPopup,
  tradingAccountId,
  id,
  signalSubscription,
  currency,
  onClose,
  onApply
}) => {
  const [t] = useTranslation();
  const subscribeFixedCurrencies = useSelector(
    subscribeFixedCurrenciesSelector
  );
  const { sendRequest: submitChanges, errorMessage } = useApiRequest({
    request: getUpdateAttachMethod(signalSubscription.isExternal),
    successMessage: "follow-program.edit-success-alert-message",
    middleware: [onApply, postponeCallback(onClose)]
  });

  const { rate, getRate } = useGetRate();

  useEffect(() => {
    currency && getRate({ from: DEFAULT_RATE_CURRENCY, to: currency });
  }, [currency]);

  const submit = useCallback(
    (values: FollowParamsFormValues) => {
      const requestParams = {
        ...values,
        tradingAccountId
      };
      return submitChanges({ id, requestParams });
    },
    [id, tradingAccountId]
  );
  // return (
  //   <>
  //     <FollowTop step={"params"} />
  //     <FollowParams
  //       errorMessage={errorMessage}
  //       subscribeFixedCurrencies={subscribeFixedCurrencies}
  //       rate={rate}
  //       currency={currency}
  //       paramsSubscription={signalSubscription}
  //       onSubmit={submit}
  //     />
  //   </>
  // );

  return renderAssetPopup(
    <FollowTop title={title} header={t("follow-program.edit-title")} />,
    <FollowParams
      errorMessage={errorMessage}
      subscribeFixedCurrencies={subscribeFixedCurrencies}
      rate={rate}
      currency={currency}
      paramsSubscription={signalSubscription}
      onSubmit={submit}
    />
  );
};

interface Props {
  title: string;
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
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
