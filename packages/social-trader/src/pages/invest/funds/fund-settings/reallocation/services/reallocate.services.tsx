import { FundAssetPart } from "gv-api-web";
import {
  ALERT_ACTIONS_FIELDS,
  alertMessageActions
} from "modules/alert-message/actions/alert-message-actions";
import { api } from "services/api-client/swagger-custom-client";
import { MiddlewareDispatch } from "utils/types";

export const updateAssets = ({
  id,
  assets
}: {
  id: string;
  assets: FundAssetPart[];
}) => {
  return api.assets().updateFundAssets(id, {
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
