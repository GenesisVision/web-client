import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Push } from "shared/components/link/link";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { CREATE_ASSET } from "shared/constants/constants";
import useApiRequest from "shared/hooks/api-request.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { TRADING_ROUTE } from "shared/routes/dashboard.routes";
import { SetSubmittingType } from "shared/utils/types";

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
