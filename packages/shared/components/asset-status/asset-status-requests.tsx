import { ProgramRequest } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import DashboardRequest from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-request";
import { ASSET } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";

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
    <>
      {requests.map(request => (
        <DashboardRequest
          successFee={
            request.successFee && request.successFee !== successFee
              ? request.successFee
              : undefined
          }
          exitFee={
            request.exitFee && request.exitFee !== exitFee
              ? request.exitFee
              : undefined
          }
          entryFee={
            request.entryFee !== entryFee ? request.entryFee : undefined
          }
          key={request.id}
          request={request}
          cancelRequest={dispatch(cancelRequestDispatch)}
          asset={asset}
          onApplyCancelRequest={handleCancel}
        />
      ))}
    </>
  );
};

interface Props {
  successFee?: number;
  exitFee?: number;
  entryFee?: number;
  id: string;
  asset: ASSET;
  onCancel: () => void;
  handleCloseDropdown: () => void;
}

const AssetStatusRequests = React.memo(_AssetStatusRequests);
export default AssetStatusRequests;
