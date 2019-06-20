import "./reallocate-container.scss";

import {
  CancelablePromise,
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
  state = { errorMessage: "", assets: [] };

  getFillAssets = (
    target: PlatformAsset[],
    data: FundAssetPartWithIcon[]
  ): FundAssetPartWithIcon[] => {
    const fillAssets = target.map(item => ({ ...item, percent: 0 }));
    data.forEach(dataItem => {
      const targetAsset = fillAssets.find(x => x.name === dataItem.name);
      if (targetAsset) {
        targetAsset.percent = dataItem.percent;
      }
    });
    return fillAssets;
  };

  componentDidMount() {
    const assets = this.getFillAssets(this.props.fundAssets, this.props.assets);
    this.setState({
      assets: assets
    });
  }
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
    const { open } = this.props;
    const { assets } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        {assets.length ? (
          <ReallocateForm
            assets={assets}
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
  fundAssets: fundAssetsSelector(state)
});

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    updateAssets: (id: string, assets: FundAssetPartWithIcon[]) =>
      dispatch(updateAssets(id, assets))
  }
});

interface Props extends DispatchProps, OwnProps, StateProps {}

interface StateProps {
  fundAssets: PlatformAsset[];
}

interface OwnProps {
  open: boolean;
  onClose: () => void;
  assets: FundAssetPartWithIcon[];
  id: string;
  onApply: () => void;
}

interface DispatchProps {
  service: {
    updateAssets: (
      id: string,
      assets: FundAssetPartWithIcon[]
    ) => CancelablePromise<void>;
  };
}

interface State {
  errorMessage: string;
  assets: FundAssetPartWithIcon[];
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
