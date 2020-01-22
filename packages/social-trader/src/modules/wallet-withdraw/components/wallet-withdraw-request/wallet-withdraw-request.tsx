import "./wallet-withdraw-request.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import { DialogTop } from "components/dialog/dialog-top";
import PaperPlan from "media/paper-plane.svg";
import * as React from "react";
import { useTranslation } from "react-i18next";

const WalletWithdrawRequest: React.FC = () => {
  const [t] = useTranslation();
  return (
    <DialogTop>
      <div className="dialog-withdraw-request">
        <ImageBaseElement
          className="dialog-withdraw-request__image"
          src={PaperPlan}
          alt="Confirm withdrawal"
        />
        <p>{t("wallet-withdraw.withdraw-request")}</p>
      </div>
    </DialogTop>
  );
};

export default React.memo(WalletWithdrawRequest);
