import {
  DashboardTradingAsset,
  MakeSelfManagedFundPublicRequest
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const generateDetailsForPublicFundCardOption = ({
  id,
  publicInfo: { fundDetails }
}: DashboardTradingAsset): MakeSelfManagedFundPublicRequest => {
  return {
    fundId: id,
    description: "",
    entryFee: fundDetails?.entryFeeCurrent,
    exitFee: fundDetails?.exitFeeCurrent
  };
};

export const makeFundPublic = (body: MakeSelfManagedFundPublicRequest) => {
  return api.assets().makeSelfManagedFundPublic({
    body
  });
};
