import { CancelablePromise, ProgramUpdate } from "gv-api-web";
import { ASSET } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import { ManagerThunk } from "shared/utils/types";

import { IAssetEditFormValues } from "../components/asset-edit-form";

export const editAsset = (
  id: string,
  editAssetData: IAssetEditFormValues,
  type: ASSET
): ManagerThunk<CancelablePromise<void>> => dispatch => {
  const authorization = authService.getAuthArg();
  const editMethod =
    type === ASSET.PROGRAM
      ? managerApi.v10ManagerProgramsByIdUpdatePost
      : managerApi.v10ManagerFundsByIdUpdatePost;
  let data = editAssetData;
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if (data.logo.image)
    promise = filesService.uploadFile(data.logo.image.cropped, authorization);

  return promise
    .then(response => {
      data = {
        ...data,
        logo: response || data.logo.id
      };
      return editMethod(id, authorization, { model: data as ProgramUpdate }); //TODO ask backend to change ProgramUpdate logo type
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          (type === ASSET.PROGRAM &&
            "manager.edit-program.notifications.edit-success") ||
            (type === ASSET.FUND &&
              "manager.edit-fund.notifications.edit-success") ||
            "",
          true
        )
      );
    });
};
