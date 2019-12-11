import Dialog from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { twoFactorEnabledSelector } from "reducers/2fa-reducer";
import { SetSubmittingType } from "utils/types";

import {
  closeFund,
  closeProgram,
  closeTradingAccount
} from "../services/asset-settings.service";
import CloseAssetForm, { ICloseAssetFormValues } from "./close-asset-form";

const _ConfirmCloseAssetContainer: React.FC<Props> = ({
  asset,
  open,
  onClose,
  onApply,
  id
}) => {
  const twoFactorEnabled = useSelector(twoFactorEnabledSelector);
  const { sendRequest } = useApiRequest({
    request: getMethod(asset),
    successMessage: `asset-settings.close-asset.notifications.${asset.toLowerCase()}`,
    middleware: [onApply, onClose]
  });
  const handleSubmit = useCallback(
    (
      { twoFactorCode }: ICloseAssetFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      sendRequest({ id, twoFactorCode }, setSubmitting);
    },
    [id]
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

const getMethod = (asset: CLOSEABLE_ASSET) => {
  switch (asset) {
    case CLOSEABLE_ASSET.TRADING_ACCOUNT:
      return closeTradingAccount;
    case CLOSEABLE_ASSET.FUND:
      return closeFund;
    case CLOSEABLE_ASSET.PROGRAM:
    default:
      return closeProgram;
  }
};

interface Props {
  asset: CLOSEABLE_ASSET;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  id: string;
}

const ConfirmCloseAssetContainer = React.memo(_ConfirmCloseAssetContainer);
export default ConfirmCloseAssetContainer;
