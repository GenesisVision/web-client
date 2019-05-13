import "./asset-edit.scss";

import * as React from "react";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";

import AssetEditForm, { IAssetEditFormOwnProps } from "./asset-edit-form";

const AssetEditPopup: React.FC<Props> = React.memo(
  ({ info, onSubmit, serverError, type }) => {
    return info ? (
      <AssetEditForm
        info={info}
        onSubmit={onSubmit}
        serverError={serverError}
        type={type}
      />
    ) : (
      <DialogLoader />
    );
  }
);

interface Props extends IAssetEditFormOwnProps {}

export default AssetEditPopup;
