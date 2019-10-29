import { push } from "connected-react-router";
import { ManagerProgramCreateResult } from "gv-api-web";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { ASSET } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import {
  createAsset,
  ICreateAssetSettingsFormValues
} from "./create-asset-service";

type TUseCreateAssetSubmitProps = {
  condition?: (data: ManagerProgramCreateResult) => boolean;
  asset: ASSET;
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
  return useCallback(
    (
      data: ICreateAssetSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      createAsset(data, asset)
        .then(data => {
          if (!condition || !!condition(data)) {
            dispatch(push(DASHBOARD_ROUTE));
            dispatch(
              alertMessageActions.success(
                `create-${asset.toLowerCase()}-page.notifications.create-success`,
                true
              )
            );
          }
        })
        .catch((error: ResponseError) => {
          dispatch(alertMessageActions.error(error.errorMessage));
        })
        .finally(() => {
          dispatch(fetchWallets(currency));
          setSubmitting(false);
        });
    },
    []
  );
};
export default useCreateAssetSubmit;
