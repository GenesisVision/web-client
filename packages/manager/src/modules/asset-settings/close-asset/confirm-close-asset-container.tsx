import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import { twoFactorEnabledSelector } from "shared/reducers/2fa-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import { TCloseAsset, closeFund, closeProgram } from "../services/asset-settings.service";
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
    [id, asset]
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
