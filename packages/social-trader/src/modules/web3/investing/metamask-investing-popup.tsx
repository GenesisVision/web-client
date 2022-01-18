import Dialog, { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import dynamic from "next/dynamic";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const MetamaskInvestingForm = dynamic(
  () => import("./metamask-investing-form")
);

interface Props extends IDialogProps {
  index: number;
  currency: CurrencyEnum;
}

const _MetamaskInvestingPopup: React.FC<Props> = ({
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
            ? t("asset-details:metamask-integration.bnb.popup-title")
            : t("asset-details:metamask-integration.xDai.popup-title")
        }
      />
      <DialogBottom>
        <MetamaskInvestingForm
          currency={currency}
          index={index}
          onClose={onClose}
        />
      </DialogBottom>
    </Dialog>
  );
};

const MetamaskInvestingPopup = React.memo(_MetamaskInvestingPopup);
export default MetamaskInvestingPopup;
