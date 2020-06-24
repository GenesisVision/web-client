import { Push } from "components/link/link";
import { CREATE_ASSET } from "constants/constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { useAlerts } from "hooks/alert.hook";
import useApiRequest from "hooks/api-request.hook";
import { TErrorMessage } from "hooks/error-message.hook";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TRADING_ROUTE } from "routes/dashboard.routes";

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
  const { successAlert } = useAlerts();
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
  const checkConditionMiddleware = (data: any) => {
    if (!condition || condition(data)) {
      dispatch(fetchWallets(currency));
      successAlert(
        `create-${asset.toLowerCase()}-page.notifications.create-success`
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
