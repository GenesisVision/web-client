import Dialog, { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import React from "react";
import { useTranslation } from "react-i18next";

import BSCInvestingForm from "./bsc-investing-form";

interface Props extends IDialogProps {
  index: string;
}

const _BSCInvestingPopup: React.FC<Props> = ({ open, onClose, index }) => {
  const [t] = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTop title={t("asset-details:bsc-integration.popup-title")} />
      <DialogBottom>
        <BSCInvestingForm index={index} onClose={onClose} />
      </DialogBottom>
    </Dialog>
  );
};

const BSCInvestingPopup = React.memo(_BSCInvestingPopup);
export default BSCInvestingPopup;
