import { PopoverContent } from "components/popover/popover-content";
import RequestLine from "components/request-line/request-line";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetInvestmentRequest } from "gv-api-web";
import React from "react";

import styles from "./asset-status.module.scss";

const _AssetStatusRequests: React.FC<Props> = ({
  data: requests,
  handleCancel
}) => {
  return (
    <PopoverContent type={"list"} className={styles["request-popover"]}>
      {requests.map(request => (
        <RequestLine request={request} onApplyCancelRequest={handleCancel} />
      ))}
    </PopoverContent>
  );
};

interface Props {
  data: AssetInvestmentRequest[];
  handleCancel: () => void;
}

const AssetStatusRequests = withBlurLoader(React.memo(_AssetStatusRequests));
export default AssetStatusRequests;
