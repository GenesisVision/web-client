import "./reallocate-container.scss";

import {
  CancelablePromise,
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset
} from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { fundAssetsSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { MiddlewareDispatch } from "shared/utils/types";

import ReallocateForm, {
  IReallocateFormValues
} from "./components/reallocate-form";
import { updateAssets } from "./services/reallocate.services";

class _ReallocateContainer extends React.PureComponent<Props, State> {
  state = { errorMessage: "" };

  handleApply = (values: IReallocateFormValues) => {
    const { service, id, onApply } = this.props;
    service
      .updateAssets(id, values.assets)
      .then(() => {
        this.handleClose();
        onApply();
      })
      .catch(error => {
        this.setState({ errorMessage: error.errorMessage });
      });
  };
  handleClose = () => {
    this.setState({ errorMessage: "" });
    this.props.onClose();
  };

  render() {
    const { open, fundAssets, platformAssets } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        {fundAssets.length ? (
          <ReallocateForm
            fundAssets={fundAssets}
            platformAssets={platformAssets}
            onSubmit={this.handleApply}
            errorMessage={this.state.errorMessage}
          />
        ) : (
          <DialogLoader />
        )}
      </Dialog>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  platformAssets: fundAssetsSelector(state)
});

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    updateAssets: (id: string, assets: FundAssetPart[]) =>
      dispatch(updateAssets(id, assets))
  }
});

interface Props extends DispatchProps, OwnProps, StateProps {}

interface StateProps {
  platformAssets: PlatformAsset[];
}

interface OwnProps {
  open: boolean;
  onClose: () => void;
  fundAssets: FundAssetPartWithIcon[];
  id: string;
  onApply: () => void;
}

interface DispatchProps {
  service: {
    updateAssets: (
      id: string,
      assets: FundAssetPart[]
    ) => CancelablePromise<void>;
  };
}

interface State {
  errorMessage: string;
}

const ReallocateContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_ReallocateContainer);
export default ReallocateContainer;
