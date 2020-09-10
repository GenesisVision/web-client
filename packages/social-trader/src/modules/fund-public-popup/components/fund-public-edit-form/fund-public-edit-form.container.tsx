import useApiRequest from "hooks/api-request.hook";
import FundPublicEdit from "modules/fund-public-popup/components/fund-public-edit-form/fund-public-edit";
import { makeFundPublic } from "modules/fund-public-popup/components/fund-public-edit-form/fund-public-edit-form.service";
import { IFundPublicFormValues } from "modules/fund-public-popup/components/fund-public-edit-form/fund-public.validators";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { createFundInfoSelector } from "reducers/platform-reducer";

interface Props {
  inDialog?: boolean;
  id: string;
  showFields?: boolean;
  successFee?: number;
  volumeFee?: number;
  onApply?: VoidFunction;
}

const _FundPublicEditFormContainer: React.FC<Props> = ({
  inDialog,
  id,
  onApply = () => {}
}) => {
  const createFundInfo = useSelector(createFundInfoSelector);
  const { sendRequest, errorMessage } = useApiRequest({
    middleware: [onApply],
    request: makeFundPublic,
    successMessage: "fund-settings:make-public-fund-form.success-alert-message"
  });
  const changeSignaling = useCallback(
    (values: IFundPublicFormValues) =>
      sendRequest({
        ...values,
        id
      }),
    [id]
  );
  return (
    <FundPublicEdit
      createFundInfo={createFundInfo}
      editError={!!errorMessage}
      inDialog={inDialog}
      onSubmit={changeSignaling}
    />
  );
};

export const FundPublicEditFormContainer = React.memo(
  _FundPublicEditFormContainer
);
