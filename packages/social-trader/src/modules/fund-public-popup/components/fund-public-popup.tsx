import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import { FundPublicEditFormContainer } from "modules/fund-public-popup/components/fund-public-edit-form/fund-public-edit-form.container";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
  onApply: VoidFunction;
  name: string;
}

const _FundPublicPopup: React.FC<Props> = ({ id, onApply, name }) => {
  const [t] = useTranslation();
  return (
    <>
      <DialogTop
        title={t("dashboard-page:trading.actions.make-public-fund")}
        subtitle={name}
      />
      <DialogBottom>
        <FundPublicEditFormContainer id={id} inDialog onApply={onApply} />
      </DialogBottom>
    </>
  );
};

const FundPublicPopup = React.memo(_FundPublicPopup);
export default FundPublicPopup;
