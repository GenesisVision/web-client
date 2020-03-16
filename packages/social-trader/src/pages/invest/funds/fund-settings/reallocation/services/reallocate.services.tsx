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
}) => {
  return assetsApi.updateFundAssets(id, authService.getAuthArg(), {
    body: assets
  });
};
export const alert = (
  // TODO What is it?..
  type: ALERT_ACTIONS_FIELDS,
  text: string,
  translate = false
) => (dispatch: MiddlewareDispatch) =>
  dispatch(alertMessageActions[type](text, translate));
