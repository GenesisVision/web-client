import "./asset-status.scss";

import { ProgramRequest } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import RequestLine from "shared/components/request-line/request-line";
import { ASSET } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";

import { CancelRequestPropsType } from "../dashboard/dashboard.constants";
import {
  cancelRequestDispatch,
  getAssetRequests
} from "./services/asset-status.service";

const _AssetStatusRequests: React.FC<Props> = ({
  successFee,
  entryFee,
  exitFee,
  id,
  asset,
  onCancel,
  handleCloseDropdown
}) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const role = useRole();
  const [requests, setRequests] = useState<Array<ProgramRequest> | undefined>(
    undefined
  );
  useEffect(
    () => {
      getAssetRequests(id, role, asset).then(setRequests);
    },
    [id, role, asset]
  );

  const handleCancel = useCallback(() => {
    handleCloseDropdown();
    if (onCancel) onCancel();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <div>{t("program-details-page.description.requests-completed")}</div>
    );

  return (
    <div className="request-popover">
      {requests.map(request => (
        <RequestLine
          successFee={request.successFee}
          exitFee={request.exitFee}
          key={request.id}
          request={request}
          cancelRequest={(values: CancelRequestPropsType) => {
            dispatch(cancelRequestDispatch(values));
          }}
          asset={asset}
          onApplyCancelRequest={handleCancel}
        />
      ))}
    </div>
  );
};

interface Props {
  successFee?: number;
  exitFee?: boolean;
  entryFee?: number;
  id: string;
  asset: ASSET;
  onCancel: () => void;
  handleCloseDropdown: () => void;
}

const AssetStatusRequests = React.memo(_AssetStatusRequests);
export default AssetStatusRequests;
