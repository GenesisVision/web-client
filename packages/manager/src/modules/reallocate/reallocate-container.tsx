import "./reallocate-container.scss";

import {
  CancelablePromise,
  FundAssetPartWithIcon,
  PlatformAsset,
  PlatformAssets
} from "gv-api-web";
import * as createFundService from "pages/create-fund/services/create-fund.service";
import * as React from "react";
import { connect } from "react-redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
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
      fillAssets.forEach(targetItem => {
        targetItem.percent =
          targetItem.name === dataItem.name ? dataItem.percent : 0;
      });
    });
    return fillAssets;
  };

  componentDidMount() {
    createFundService.fetchAssets().then((response: PlatformAssets) => {
      const assets = this.getFillAssets(response.assets, this.props.assets);
      this.setState({
        assets: assets
      });
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

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    updateAssets: (id: string, assets: FundAssetPartWithIcon[]) =>
      dispatch(updateAssets(id, assets))
  }
});

interface Props extends DispatchProps, OwnProps {}

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

const ReallocateContainer = connect<null, DispatchProps, OwnProps, State>(
  undefined,
  mapDispatchToProps
)(_ReallocateContainer);
export default ReallocateContainer;
