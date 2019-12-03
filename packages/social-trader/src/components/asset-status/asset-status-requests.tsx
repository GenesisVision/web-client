import "./asset-status.scss";

import RequestLine from "components/request-line/request-line";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetInvestmentRequest } from "gv-api-web";
import React from "react";

const _AssetStatusRequests: React.FC<Props> = ({
  data: requests,
  handleCancel
}) => {
  return (
    <div className="request-popover">
      {requests.map(request => (
        <RequestLine
          successFee={
            request.programRequestDetails &&
            request.programRequestDetails.successFee
          } //TODO check it
          exitFee={
            request.fundRequestDetails && request.fundRequestDetails.exitFee
          } //TODO check it
          request={request}
          onApplyCancelRequest={handleCancel}
        />
      ))}
    </div>
  );
};

interface Props {
  data: AssetInvestmentRequest[];
  handleCancel: () => void;
}

const AssetStatusRequests = withBlurLoader(React.memo(_AssetStatusRequests));
export default AssetStatusRequests;
