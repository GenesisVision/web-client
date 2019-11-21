import { Push } from "components/link/link";
import { fetchWallets } from "components/wallet/services/wallet.services";
import useApiRequest from "hooks/api-request.hook";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { TRADING_ROUTE } from "routes/dashboard.routes";
import { CREATE_ASSET } from "shared/constants/constants";
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
  const { sendRequest } = useApiRequest({ request: createAsset });
  return useCallback(
    (
      data: ICreateAssetSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      sendRequest({ data, asset }).then(data => {
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
      });
    },
    []
  );
};
export default useCreateAssetSubmit;
