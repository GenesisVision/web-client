import { CancelablePromise } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { ASSET } from "shared/constants/constants";
import {
  CurrencyEnum,
  MiddlewareDispatch,
  ResponseError
} from "shared/utils/types";

import AssetEditForm, {
  IAssetEditFormValues,
  TAssetEditFormSubmit
} from "./components/asset-edit-form";
import { editAsset } from "./services/asset-edit.services";

class _AssetEditContainer extends React.PureComponent<Props, State> {
  state = { serverError: "" };

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ serverError: "" });
    onClose();
  };

  handleEdit: TAssetEditFormSubmit = (values, setSubmitting) => {
    const { service, info, onApply, type } = this.props;
    service
      .editAsset(info.id, values, type)
      .then(() => {
        this.handleClose();
        onApply && onApply();
      })
      .catch((error: ResponseError) => {
        this.setState({ serverError: error.errorMessage });
        setSubmitting(false);
      });
  };

  render() {
    const { info, open, type } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <AssetEditForm
          type={type}
          condition={!!info}
          loader={<DialogLoader />}
          info={info}
          onSubmit={this.handleEdit}
          serverError={this.state.serverError}
        />
      </Dialog>
    );
  }
}

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
    ) => CancelablePromise<void>;
  };
}

interface Props extends OwnProps, DispatchProps {}

interface State {
  serverError: string;
}

const AssetEditContainer = connect<null, DispatchProps, OwnProps>(
  undefined,
  mapDispatchToProps
)(_AssetEditContainer);
export default AssetEditContainer;
