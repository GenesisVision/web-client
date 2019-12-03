import "./asset-status.scss";

import AssetStatusRequests from "components/asset-status/asset-status-requests";
import { AssetInvestmentRequest } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { getInRequestsLoadersData } from "pages/dashboard/dashboard.loaders-data";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ASSET } from "shared/constants/constants";

import { getAssetRequests } from "./services/asset-status.service";

const _AssetStatusRequestsContainer: React.FC<Props> = ({
  successFee,
  entryFee,
  exitFee,
  id,
  asset,
  onCancel,
  handleCloseDropdown
}) => {
  const [t] = useTranslation();
  const { data: requests } = useApiRequest<AssetInvestmentRequest[]>({
    request: getAssetRequests,
    fetchOnMount: true,
    fetchOnMountData: id
  });

  const handleCancel = useCallback(() => {
    handleCloseDropdown();
    if (onCancel) onCancel();
  }, []);

  if (requests && requests.length === 0)
    return (
      <div>{t("program-details-page.description.requests-completed")}</div>
    );

  return (
    <AssetStatusRequests
      loaderData={getInRequestsLoadersData()}
      data={requests!}
      handleCancel={handleCancel}
    />
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

const AssetStatusRequestsContainer = React.memo(_AssetStatusRequestsContainer);
export default AssetStatusRequestsContainer;
