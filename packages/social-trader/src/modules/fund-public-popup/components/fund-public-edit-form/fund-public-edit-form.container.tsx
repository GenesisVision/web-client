import FundPublicEdit from "modules/fund-public-popup/components/fund-public-edit-form/fund-public-edit";
import { IFundPublicFormValues } from "modules/fund-public-popup/components/fund-public-edit-form/fund-public.validators";
import React from "react";
import { useSelector } from "react-redux";
import { createFundInfoSelector } from "reducers/platform-reducer";

interface Props {
  inDialog?: boolean;
  onSubmit: (values: IFundPublicFormValues) => void;
}

const _FundPublicEditFormContainer: React.FC<Props> = ({
  inDialog,
  onSubmit
}) => {
  const createFundInfo = useSelector(createFundInfoSelector);
  return (
    <FundPublicEdit
      createFundInfo={createFundInfo}
      inDialog={inDialog}
      onSubmit={onSubmit}
    />
  );
};

export const FundPublicEditFormContainer = React.memo(
  _FundPublicEditFormContainer
);
