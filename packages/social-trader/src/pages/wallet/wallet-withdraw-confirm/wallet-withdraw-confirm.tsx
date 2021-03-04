import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useEffect } from "react";

import { WALLET_EXTERNAL_ROUTE } from "../wallet.paths";
import { confirmWithdraw } from "./services/wallet-withdraw-confirm.services";

const _WalletWithdrawConfirm: React.FC<Props> = ({ requestId, code }) => {
  const { data, sendRequest } = useApiRequest({
    request: confirmWithdraw,
    successMessage: "wallet-withdraw:confirmation.success"
  });

  useEffect(() => {
    if (data) Push(WALLET_EXTERNAL_ROUTE);
  }, [data]);

  useEffect(() => {
    if (requestId && code) {
      sendRequest({ requestId, code });
    } else {
      Push(NOT_FOUND_PAGE_ROUTE);
    }
  }, []);
  return null;
};

interface Props {
  requestId: string;
  code: string;
}

const WalletWithdrawConfirm = React.memo(_WalletWithdrawConfirm);
export default WalletWithdrawConfirm;
