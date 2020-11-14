import useApiRequest from "hooks/api-request.hook";
import * as React from "react";

import {
  FundWithdrawPopup,
  IFundWithdrawPopupProps
} from "./fund-withdraw-popup";
import { FundWithdrawLoaderData } from "./fund-withdraw.loader";
import { getFundWithdrawInfo } from "./services/fund-withdraw.services";

const _FundWithdrawPopupContainer: React.FC<IFundWithdrawPopupProps> = ({
  infoMessage,
  onApply,
  id,
  onClose
}) => {
  const { data, errorMessage } = useApiRequest({
    name: "FundWithdrawPopupContainer",
    cache: true,
    request: () => getFundWithdrawInfo({ id }),
    fetchOnMount: true
  });
  if (!data) return null;
  return (
    <>
      <FundWithdrawPopup
        infoMessage={infoMessage}
        errorMessage={errorMessage}
        onApply={onApply}
        onClose={onClose}
        id={id}
        loaderData={FundWithdrawLoaderData}
        data={data!}
      />
    </>
  );
};

const FundWithdrawPopupContainer = React.memo(_FundWithdrawPopupContainer);
export default FundWithdrawPopupContainer;
