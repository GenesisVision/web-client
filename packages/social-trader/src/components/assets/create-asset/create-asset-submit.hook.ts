import { Push } from "components/link/link";
import { CREATE_ASSET } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import { TErrorMessage } from "hooks/error-message.hook";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { TRADING_ROUTE } from "routes/dashboard.routes";
import { sendEventToGA } from "utils/ga";

import {
  createAsset,
  ICreateAssetSettingsFormValues
} from "./create-asset-service";

type TUseCreateAssetSubmitProps = {
  condition?: (data: any | null) => boolean;
  asset: CREATE_ASSET;
};

type TUseCreateAssetSubmitOutput = {
  errorMessage: TErrorMessage;
  handleCreate: (data: ICreateAssetSettingsFormValues) => void;
  isPending: boolean;
};

const useCreateAssetSubmit = ({
  condition,
  asset
}: TUseCreateAssetSubmitProps): TUseCreateAssetSubmitOutput => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const checkConditionMiddleware = (data: any) => {
    if (!condition || condition(data)) {
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
  const { sendRequest, isPending, errorMessage } = useApiRequest({
    request: createAsset,
    middleware: [checkConditionMiddleware]
  });
  const handleCreate = useCallback(
    (data: ICreateAssetSettingsFormValues) => {
      return sendRequest({ data, asset });
    },
    [asset]
  );
  return { handleCreate, isPending, errorMessage };
};
export default useCreateAssetSubmit;
