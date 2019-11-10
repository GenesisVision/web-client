import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Push } from "shared/components/link/link";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { TRADING_ROUTE } from "shared/routes/dashboard.routes";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

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
  return useCallback(
    (
      data: IConvertAssetSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      convertAsset(data, fromTo)
        .then((data: any) => {
          if (!condition || !!condition(data)) {
            Push(TRADING_ROUTE);
            dispatch(
              alertMessageActions.success(
                `convert-${fromTo.assetFrom.toLowerCase()}-${fromTo.assetTo.toLowerCase()}-page.notifications.create-success`,
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
export default useConvertAssetSubmit;
