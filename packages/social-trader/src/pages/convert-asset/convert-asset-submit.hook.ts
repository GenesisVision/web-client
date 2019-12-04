import { Push } from "components/link/link";
import { fetchWallets } from "components/wallet/services/wallet.services";
import useApiRequest from "hooks/api-request.hook";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { TRADING_ROUTE } from "routes/dashboard.routes";
import { SetSubmittingType } from "utils/types";

import { TAssetFromTo } from "./convert-asset.types";
import {
  convertAsset,
  IConvertAssetSettingsFormValues
} from "./services/convert-asset.service";

type TUseConvertAssetSubmitProps = {
  condition?: (data: any | null) => boolean;
  fromTo: TAssetFromTo;
};

type TUseConvertAssetSubmitOutput = (
  data: IConvertAssetSettingsFormValues,
  setSubmitting: SetSubmittingType
) => void;

const useConvertAssetSubmit = ({
  condition,
  fromTo
}: TUseConvertAssetSubmitProps): TUseConvertAssetSubmitOutput => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const checkConditionMiddleware = (data: any) => {
    if (!condition || !!condition(data)) {
      dispatch(
        alertMessageActions.success(
          `convert-${fromTo.assetFrom.toLowerCase()}-${fromTo.assetTo.toLowerCase()}-page.notifications.create-success`,
          true
        )
      );
      dispatch(fetchWallets(currency));
      Push(TRADING_ROUTE);
    }
  };
  const { sendRequest } = useApiRequest({
    middleware: [checkConditionMiddleware],
    request: convertAsset
  });
  return useCallback(
    (
      data: IConvertAssetSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      sendRequest({ data, fromTo }, setSubmitting);
    },
    []
  );
};
export default useConvertAssetSubmit;
