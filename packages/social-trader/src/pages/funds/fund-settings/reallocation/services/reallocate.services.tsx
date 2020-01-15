import { FundAssetPart } from "gv-api-web";
import {
  ALERT_ACTIONS_FIELDS,
  alertMessageActions
} from "modules/alert-message/actions/alert-message-actions";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

export const updateAssets = ({
  id,
  assets
}: {
  id: string;
  assets: FundAssetPart[];
}) => (dispatch: MiddlewareDispatch): Promise<void> => {
  const authorization = authService.getAuthArg();
  return assetsApi
    .updateFundAssets(id, authorization, {
      body: assets
    })
    .then(() => {
      dispatch(
        alertMessageActions.success("reallocate.success-alert-message", true)
      );
    });
};
export const alert = (
  // TODO What is it?..
  type: ALERT_ACTIONS_FIELDS,
  text: string,
  translate = false
) => (dispatch: MiddlewareDispatch) =>
  dispatch(alertMessageActions[type](text, translate));
