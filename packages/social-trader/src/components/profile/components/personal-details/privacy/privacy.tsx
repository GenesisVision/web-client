import PrivacyForm, {
  IPrivacyFormValues
} from "components/profile/components/personal-details/privacy/privacy.form";
import { IPrivacyData } from "components/profile/components/personal-details/privacy/privacy.types";
import { updatePrivacy } from "components/profile/services/profile.service";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";

interface Props {
  isPending: boolean;
  onUpdate: () => void;
  data: IPrivacyData;
}

const _Privacy: React.FC<Props> = ({ data, onUpdate, isPending }) => {
  const { sendRequest, errorMessage } = useApiRequest({
    middleware: [onUpdate],
    request: updatePrivacy,
    successMessage: "profile-page:success-edit"
  });
  const handleSubmit = useCallback(
    (values: IPrivacyFormValues) => sendRequest(values),
    []
  );
  return (
    <PrivacyForm
      onSubmit={handleSubmit}
      isPending={isPending}
      data={data}
      errorMessage={errorMessage}
    />
  );
};

export const Privacy = React.memo(_Privacy);
