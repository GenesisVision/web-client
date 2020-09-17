import { $paddingXsmall } from "components/gv-styles/gv-sizes";
import { PopoverContent } from "components/popover/popover-content";
import RequestColumn from "components/request-line/request-column";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetInvestmentRequest } from "gv-api-web";
import React from "react";
import styled from "styled-components";

interface Props {
  data: AssetInvestmentRequest[];
  handleCancel: () => void;
}

const StyledPopoverContent = styled(PopoverContent)`
  padding: 0 ${$paddingXsmall}px;
  max-height: 300px;
  overflow: auto;
`;

const _AssetStatusRequests: React.FC<Props> = ({
  data: requests,
  handleCancel
}) => {
  return (
    <StyledPopoverContent type={"list"}>
      {requests.map(request => (
        <RequestColumn request={request} onApplyCancelRequest={handleCancel} />
      ))}
    </StyledPopoverContent>
  );
};

const AssetStatusRequests = withBlurLoader(React.memo(_AssetStatusRequests));
export default AssetStatusRequests;
