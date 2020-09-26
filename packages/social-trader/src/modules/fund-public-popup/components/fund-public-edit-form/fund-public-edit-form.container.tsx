import useApiRequest from "hooks/api-request.hook";
import FundPublicEdit from "modules/fund-public-popup/components/fund-public-edit-form/fund-public-edit";
import { makeFundPublic } from "modules/fund-public-popup/components/fund-public-edit-form/fund-public-edit-form.service";
import { IFundPublicFormValues } from "modules/fund-public-popup/components/fund-public-edit-form/fund-public.validators";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { createFundInfoSelector } from "reducers/platform-reducer";
import { postponeCallback } from "utils/hook-form.helpers";

interface Props {
  id: string;
  inDialog?: boolean;
  onApply: VoidFunction;
}

const _FundPublicEditFormContainer: React.FC<Props> = ({
  id,
  inDialog,
  onApply
}) => {
  const { sendRequest } = useApiRequest({
    middleware: [postponeCallback(onApply)],
    request: makeFundPublic
    // successMessage: "fund-settings:make-public-fund-form.success-alert-message"
  });
  const handleOnSubmit = useCallback((values: IFundPublicFormValues) => {
    return sendRequest({ id, ...values });
  }, []);
  const createFundInfo = useSelector(createFundInfoSelector);
  return (
    <FundPublicEdit
      createFundInfo={createFundInfo}
      inDialog={inDialog}
      onSubmit={handleOnSubmit}
    />
  );
};

export const FundPublicEditFormContainer = React.memo(
  _FundPublicEditFormContainer
);
