import { Push } from "components/link/link";
import { CREATE_ASSET } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { TRADING_ROUTE } from "routes/dashboard.routes";
import { SetSubmittingType } from "utils/types";

import {
  createAsset,
  ICreateAssetSettingsFormValues
} from "./create-asset-service";

type TUseCreateAssetSubmitProps = {
  condition?: (data: any | null) => boolean;
  asset: CREATE_ASSET;
};

type TUseCreateAssetSubmitOutput = (
  data: ICreateAssetSettingsFormValues,
  setSubmitting: SetSubmittingType
) => void;

const useCreateAssetSubmit = ({
  condition,
  asset
}: TUseCreateAssetSubmitProps): TUseCreateAssetSubmitOutput => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const checkConditionMiddleware = (data: any) => {
    if (!condition || !!condition(data)) {
      dispatch(fetchWallets(currency));
      dispatch(
        alertMessageActions.success(
          `create-${asset.toLowerCase()}-page.notifications.create-success`,
          true
        )
      );
      Push(TRADING_ROUTE);
    }
  };
  const { sendRequest } = useApiRequest({
    request: createAsset,
    middleware: [checkConditionMiddleware]
  });
  return useCallback(
    (data: ICreateAssetSettingsFormValues, setSubmitting) => {
      setSubmitting(true);
      sendRequest({ data, asset });
    },
    [asset]
  );
};
export default useCreateAssetSubmit;
