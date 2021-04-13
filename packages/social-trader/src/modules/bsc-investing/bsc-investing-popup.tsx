import Dialog, { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import React from "react";
import { useTranslation } from "react-i18next";

import BSCInvestingForm from "./bsc-investing-form";

interface Props extends IDialogProps {
  id: string;
}

const _BSCInvestingPopup: React.FC<Props> = ({ open, onClose, id }) => {
  const [t] = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTop title={t("asset-details:bsc-integration.popup-title")} />
      <DialogBottom>
        <BSCInvestingForm id={id} />
      </DialogBottom>
    </Dialog>
  );
};

const BSCInvestingPopup = React.memo(_BSCInvestingPopup);
export default BSCInvestingPopup;
