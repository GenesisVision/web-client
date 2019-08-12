/*
import "./reallocate-container.scss";

import {
  CancelablePromise,
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset
} from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import useErrorMessage from "shared/hooks/error-message.hook";
import { fundAssetsSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { MiddlewareDispatch } from "shared/utils/types";

import ReallocateForm, {
  IReallocateFormValues
} from "./components/reallocate-form";
import { updateAssets } from "./services/reallocate.services";

const _ReallocateContainer: React.FC<Props> = ({
  open,
  fundAssets,
  platformAssets,
  service,
  id,
  onApply,
  onClose
}) => {
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const handleApply = useCallback(
    (values: IReallocateFormValues) => {
      service
        .updateAssets(id, values.assets)
        .then(() => {
          handleClose();
          onApply();
        })
        .catch(setErrorMessage);
    },
    [id]
  );
  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  return (
    <Dialog open={open} onClose={handleClose}>
      <ReallocateForm
        condition={!!fundAssets.length}
        loader={<DialogLoader />}
        fundAssets={fundAssets}
        platformAssets={platformAssets}
        onSubmit={handleApply}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

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

const ReallocateContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ReallocateContainer);
export default ReallocateContainer;
*/
