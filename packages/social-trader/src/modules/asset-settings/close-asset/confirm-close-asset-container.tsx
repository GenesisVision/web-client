import Dialog from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import {
  CLOSEABLE_ASSET,
  CloseableAssetType
} from "modules/asset-settings/close-asset/close-asset";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { useCallback } from "react";
import { useTFAStatus } from "utils/2fa";
import { postponeCallback } from "utils/hook-form.helpers";

import {
  closeFund,
  closeProgram,
  closeTradingAccount,
  closeTradingExchangeAccount
} from "../services/asset-settings.service";
import { ICloseAssetFormValues } from "./close-asset-form";

const CloseAssetForm = dynamic(() => import("./close-asset-form"));

interface Props {
  assetName?: string;
  asset: CloseableAssetType;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  id: string;
}

const getMethod = (asset: CloseableAssetType) => {
  switch (asset) {
    case "ExchangeAccount":
      return closeTradingExchangeAccount;
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
    case CLOSEABLE_ASSET.EXCHANGE_PROGRAM:
    case CLOSEABLE_ASSET.PROGRAM:
    case "SignalProgram":
    case "Program":
    default:
      return closeProgram;
  }
};

const _ConfirmCloseAssetContainer: React.FC<Props> = ({
  assetName,
  asset,
  open,
  onClose,
  onApply,
  id
}) => {
  const { twoFactorEnabled } = useTFAStatus();
  const { sendRequest, errorMessage } = useApiRequest({
    request: getMethod(asset),
    successMessage: `asset-settings:close-asset.notifications.${asset.toLowerCase()}`,
    middleware: [onApply, postponeCallback(onClose)]
  });
  const handleSubmit = useCallback(
    ({ twoFactorCode }: ICloseAssetFormValues) => {
      return sendRequest({ id, twoFactorCode });
    },
    [id]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <CloseAssetForm
        errorMessage={errorMessage}
        assetName={assetName}
        asset={asset}
        onSubmit={handleSubmit}
        onCancel={onClose}
        twoFactorEnabled={twoFactorEnabled!}
      />
    </Dialog>
  );
};

const ConfirmCloseAssetContainer = React.memo(_ConfirmCloseAssetContainer);
export default ConfirmCloseAssetContainer;
