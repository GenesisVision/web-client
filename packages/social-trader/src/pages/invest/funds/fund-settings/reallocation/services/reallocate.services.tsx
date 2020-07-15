import { FundAssetPart } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const getTradingAssets = () => {
  return api.platform().getAllPlatformTradingAssets();
};

export const updateAssets = ({
  id,
  assets
}: {
  id: string;
  assets: FundAssetPart[];
}) => {
  return api.assets().updateFundAssets(id, {
    body: assets
  });
};
