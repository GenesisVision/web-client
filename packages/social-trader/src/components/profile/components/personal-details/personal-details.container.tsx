import PersonalDetails from "components/profile/components/personal-details/personal-details";
import { fetchProfile } from "components/profile/services/profile.service";
import { ProfileFullViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";

const _PersonalDetailsContainer: React.FC = () => {
  const { sendRequest, data, isPending } = useApiRequest<ProfileFullViewModel>({
    fetchOnMount: true,
    request: fetchProfile
  });
  const onUpdate = useCallback(async () => await sendRequest(), []);
  return (
    <PersonalDetails
      condition={!!data}
      info={data!}
      onUpdate={onUpdate}
      isPending={isPending}
    />
  );
};

const PersonalDetailsContainer = React.memo(_PersonalDetailsContainer);
export default PersonalDetailsContainer;
