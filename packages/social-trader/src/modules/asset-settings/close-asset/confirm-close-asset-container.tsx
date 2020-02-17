import Dialog from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import {
  CLOSEABLE_ASSET,
  CloseableAssetType
} from "modules/asset-settings/close-asset/close-asset";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { twoFactorEnabledSelector } from "reducers/2fa-reducer";
import { getPostponedOnCallback } from "utils/hook-form.helpers";

import {
  closeFund,
  closeProgram,
  closeTradingAccount
} from "../services/asset-settings.service";
import { ICloseAssetFormValues } from "./close-asset-form";

const CloseAssetForm = dynamic(() => import("./close-asset-form"));

const _ConfirmCloseAssetContainer: React.FC<Props> = ({
  assetName,
  asset,
  open,
  onClose,
  onApply,
  id
}) => {
  const twoFactorEnabled = useSelector(twoFactorEnabledSelector);
  const { sendRequest, errorMessage } = useApiRequest({
    request: getMethod(asset),
    successMessage: `asset-settings.close-asset.notifications.${asset.toLowerCase()}`,
    middleware: [onApply, getPostponedOnCallback(onClose)]
  });
  const handleSubmit = useCallback(
    ({ twoFactorCode }: ICloseAssetFormValues) => {
      return sendRequest({ id, twoFactorCode });
    },
    [id]
  );
  return (
    <Dialog open={open} onClose={onClose} className="dialog--wider">
      <CloseAssetForm
        errorMessage={errorMessage}
        assetName={assetName}
        asset={asset}
        onSubmit={handleSubmit}
        onCancel={onClose}
        twoFactorEnabled={twoFactorEnabled}
      />
    </Dialog>
  );
};

const getMethod = (asset: CloseableAssetType) => {
  switch (asset) {
    case "Follow":
    case "TradingAccount":
    case "Trading-account":
    case "SignalTradingAccount":
    case "ExternalTradingAccount":
    case "ExternalSignalTradingAccount":
    case CLOSEABLE_ASSET.TRADING_ACCOUNT:
      return closeTradingAccount;
    case CLOSEABLE_ASSET.FUND:
      return closeFund;
    case CLOSEABLE_ASSET.PROGRAM:
    case "SignalProgram":
    case "Program":
    default:
      return closeProgram;
  }
};

interface Props {
  assetName?: string;
  asset: CloseableAssetType;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  id: string;
}

const ConfirmCloseAssetContainer = React.memo(_ConfirmCloseAssetContainer);
export default ConfirmCloseAssetContainer;
