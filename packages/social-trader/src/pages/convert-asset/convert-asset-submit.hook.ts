import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Push } from "shared/components/link/link";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import useApiRequest from "shared/hooks/api-request.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { TRADING_ROUTE } from "shared/routes/dashboard.routes";
import { SetSubmittingType } from "shared/utils/types";

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
  const { sendRequest } = useApiRequest({ request: convertAsset });
  return useCallback(
    (
      data: IConvertAssetSettingsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      sendRequest({ data, fromTo }, setSubmitting).then((data: any) => {
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
      });
    },
    []
  );
};
export default useConvertAssetSubmit;
