import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "services/auth-service";
import filesService from "shared/services/file-service";
import { managerApiProxy } from "services/api-client/manager-api";
import { FUND, PROGRAM } from "../asset-edit.constants";

export const editAsset = (id, editAssetData, type) => dispatch => {
  const authorization = authService.getAuthArg();
  const editMethod =
    type === PROGRAM
      ? managerApiProxy.v10ManagerProgramsByIdUpdatePost
      : managerApiProxy.v10ManagerFundsByIdUpdatePost;
  let data = editAssetData;
  let promise = Promise.resolve(null);
  if (data.logo.cropped) {
    promise = filesService.uploadFileProxy(data.logo.cropped, authorization);
  }
  return promise
    .then(response => {
      data = {
        ...data,
        logo: response || data.logo.id
      };
      return editMethod(id, authorization, { model: data });
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          (type === PROGRAM && "edit-program.notifications.edit-success") ||
            (type === FUND && "edit-fund.notifications.edit-success"),
          true
        )
      );
    });
};
