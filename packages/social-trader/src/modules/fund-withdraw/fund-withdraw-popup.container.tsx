import { DialogError } from "components/dialog/dialog-error";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";

import {
  FundWithdrawPopup,
  IFundWithdrawPopupProps
} from "./fund-withdraw-popup";
import { FundWithdrawLoaderData } from "./fund-withdraw.loader";
import { getFundWithdrawInfo } from "./services/fund-withdraw.services";

const _FundWithdrawPopupContainer: React.FC<IFundWithdrawPopupProps> = ({
  onApply,
  id,
  onClose
}) => {
  const { data, errorMessage } = useApiRequest({
    request: () => getFundWithdrawInfo({ id }),
    fetchOnMount: true
  });
  return (
    <>
      <FundWithdrawPopup
        onApply={onApply}
        onClose={onClose}
        id={id}
        loaderData={FundWithdrawLoaderData}
        data={data!}
      />
      <DialogError error={errorMessage} />
    </>
  );
};

const FundWithdrawPopupContainer = React.memo(_FundWithdrawPopupContainer);
export default FundWithdrawPopupContainer;
