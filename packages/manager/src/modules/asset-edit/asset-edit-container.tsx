import React, { useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { ASSET } from "shared/constants/constants";
import useErrorMessage from "shared/hooks/error-message.hook";
import { CurrencyEnum, MiddlewareDispatch } from "shared/utils/types";

import AssetEditForm, {
  IAssetEditFormValues,
  TAssetEditFormSubmit
} from "./components/asset-edit-form";
import { editAsset } from "./services/asset-edit.services";

const _AssetEditContainer: React.FC<Props> = ({
  service,
  info,
  onApply,
  open,
  onClose,
  type
}) => {
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  const handleEdit: TAssetEditFormSubmit = useCallback(
    (values, setSubmitting) => {
      service
        .editAsset(info.id, values, type)
        .then(() => {
          handleClose();
          onApply && onApply();
        })
        .catch(error => {
          setErrorMessage(error);
          setSubmitting(false);
        });
    },
    []
  );
  return (
    <Dialog open={open} onClose={handleClose}>
      <AssetEditForm
        type={type}
        condition={!!info}
        loader={<DialogLoader />}
        info={info}
        onSubmit={handleEdit}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    editAsset: (id, editAssetData, type) =>
      dispatch(editAsset(id, editAssetData, type))
  }
});

export interface IAssetEditInfo extends IAssetEditFormValues {
  id: string;
  currency?: CurrencyEnum;
}

interface OwnProps {
  open: boolean;
  info: IAssetEditInfo;
  onClose: () => void;
  onApply: () => void;
  type: ASSET;
}

interface DispatchProps {
  service: {
    editAsset: (
      id: string,
      editAssetData: IAssetEditFormValues,
      type: ASSET
    ) => Promise<void>;
  };
}

interface Props extends OwnProps, DispatchProps {}

const AssetEditContainer = compose<React.ComponentType<OwnProps>>(
  connect<null, DispatchProps, OwnProps>(
    undefined,
    mapDispatchToProps
  ),
  React.memo
)(_AssetEditContainer);
export default AssetEditContainer;
