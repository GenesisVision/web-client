import {
  CancelablePromise,
  FundAssetPart,
  FundAssetPartWithIcon
} from "gv-api-web";
import {
  ALLERT_ACTIONS_FIELDS,
  alertMessageActions
} from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

export const updateAssets = (id: string, assets: FundAssetPartWithIcon[]) => (
  dispatch: MiddlewareDispatch
): CancelablePromise<void> => {
  const authorization = authService.getAuthArg();
  return managerApi
    .v10ManagerFundsByIdAssetsUpdatePost(id, authorization, {
      assets: (assets as unknown) as FundAssetPart[] //TODO remove when update api
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.reallocate.success-alert-message",
          true
        )
      );
    });
};
export const alert = (
  type: ALLERT_ACTIONS_FIELDS,
  text: string,
  translate = false
) => (dispatch: MiddlewareDispatch) =>
  dispatch(alertMessageActions[type](text, translate));
