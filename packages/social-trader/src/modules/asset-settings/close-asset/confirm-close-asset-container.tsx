import Dialog from "components/dialog/dialog";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { twoFactorEnabledSelector } from "reducers/2fa-reducer";
import { RootState } from "reducers/root-reducer";
import { bindActionCreators, compose, Dispatch } from "redux";
import { ASSET } from "shared/constants/constants";
import { SetSubmittingType } from "utils/types";

import {
  closeFund,
  closeProgram,
  TCloseAsset
} from "../services/asset-settings.service";
import CloseAssetForm, { ICloseAssetFormValues } from "./close-asset-form";

const _ConfirmCloseAssetContainer: React.FC<Props> = ({
  asset,
  open,
  twoFactorEnabled,
  onClose,
  service: { closeProgram, closeFund },
  onApply,
  id
}) => {
  const handleSubmit = useCallback(
    (
      { twoFactorCode }: ICloseAssetFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      const method = asset === ASSET.FUND ? closeFund : closeProgram;
      const onSuccess = () => {
        onApply();
        onClose();
      };
      const onError = () => setSubmitting(false);
      method({
        onSuccess,
        onError,
        id,
        opts: {
          twoFactorCode
        }
      });
    },
    [asset, id]
  );
  return (
    <Dialog open={open} onClose={onClose} className="dialog--wider">
      <CloseAssetForm
        asset={asset}
        onSubmit={handleSubmit}
        onCancel={onClose}
        twoFactorEnabled={twoFactorEnabled}
      />
    </Dialog>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  twoFactorEnabled: twoFactorEnabledSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      closeProgram,
      closeFund
    },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, StateProps {}

interface OwnProps {
  asset: ASSET;
  open: boolean;
  onClose(): void;
  onApply(): void;
  id: string;
}

interface StateProps {
  twoFactorEnabled: boolean;
}

interface DispatchProps {
  service: {
    closeProgram: TCloseAsset;
    closeFund: TCloseAsset;
  };
}

const ConfirmCloseAssetContainer = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ConfirmCloseAssetContainer);
export default ConfirmCloseAssetContainer;
