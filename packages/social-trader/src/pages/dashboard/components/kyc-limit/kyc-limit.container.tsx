import { LimitWithoutKyc } from "gv-api-web";
import { KYCLimitView } from "pages/dashboard/components/kyc-limit/kyc-limit.view";
import React from "react";

export interface IKYCLimitContainerProps {
  limitWithoutKyc?: LimitWithoutKyc;
}

const _KYCLimitContainer: React.FC<IKYCLimitContainerProps> = ({
  limitWithoutKyc
}) => {
  if (!limitWithoutKyc) return null;
  const { limit, invested, currency } = limitWithoutKyc;
  return <KYCLimitView limit={limit} invested={invested} currency={currency} />;
};

export const KYCLimitContainer = React.memo(_KYCLimitContainer);
