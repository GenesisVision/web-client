import Dialog, { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import BSCInvestingForm from "./bsc-investing-form";

interface Props extends IDialogProps {
  index: number;
  currency: CurrencyEnum;
}

const _BSCInvestingPopup: React.FC<Props> = ({
  open,
  onClose,
  index,
  currency
}) => {
  const [t] = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTop
        title={
          currency === "BNB"
            ? t("asset-details:bsc-integration.bnb.popup-title")
            : t("asset-details:bsc-integration.xDai.popup-title")
        }
      />
      <DialogBottom>
        <BSCInvestingForm currency={currency} index={index} onClose={onClose} />
      </DialogBottom>
    </Dialog>
  );
};

const BSCInvestingPopup = React.memo(_BSCInvestingPopup);
export default BSCInvestingPopup;
