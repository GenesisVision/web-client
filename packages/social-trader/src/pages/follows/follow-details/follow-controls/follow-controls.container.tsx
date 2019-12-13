import {
  fetchSubscriptions,
  SignalSubscriptionLoaderData
} from "components/details/details-description-section/details-investment/details-investment.service";
import useApiRequest from "hooks/api-request.hook";
import FollowControls from "pages/follows/follow-details/follow-controls/follow-controls";
import { FollowDetailsDataType } from "pages/follows/follow-details/follow-details.types";
import { ProgramDescriptionDataType } from "pages/programs/program-details/program-details.types";
import * as React from "react";
import { useCallback } from "react";

const _FollowControlsContainer: React.FC<Props> = ({ description }) => {
  const { data, sendRequest } = useApiRequest({
    request: fetchSubscriptions,
    fetchOnMount: true,
    fetchOnMountData: description.id
  });
  const updateInfo = useCallback(() => {
    sendRequest(description.id);
  }, [description.id]);
  return (
    <FollowControls
      loaderData={[SignalSubscriptionLoaderData]}
      onApply={updateInfo}
      data={data}
      description={description}
    />
  );
};

interface Props {
  description: ProgramDescriptionDataType;
}

const FollowControlsContainer = React.memo(_FollowControlsContainer);
export default FollowControlsContainer;
