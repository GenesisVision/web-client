import { CancelablePromise, FundAssetPart } from "gv-api-web";
import {
  ALERT_ACTIONS_FIELDS,
  alertMessageActions
} from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

export const updateAssets = ({
  id,
  assets
}: {
  id: string;
  assets: FundAssetPart[];
}) => (dispatch: MiddlewareDispatch): CancelablePromise<void> => {
  const authorization = authService.getAuthArg();
  return managerApi
    .updateFundAssets(id, authorization, {
      assets
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "reallocate.success-alert-message",
          true
        )
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
