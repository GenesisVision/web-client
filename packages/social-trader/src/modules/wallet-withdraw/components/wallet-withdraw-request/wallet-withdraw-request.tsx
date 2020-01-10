import "./wallet-withdraw-request.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import PaperPlan from "media/paper-plane.svg";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const WalletWithdrawRequest: React.FC<WithTranslation> = ({ t }) => (
  <div className="dialog__top dialog-withdraw-request">
    <ImageBaseElement
      className="dialog-withdraw-request__image"
      src={PaperPlan}
      alt="Confirm withdrawal"
    />
    <p>{t("wallet-withdraw.withdraw-request")}</p>
  </div>
);

export default translate()(React.memo(WalletWithdrawRequest));
