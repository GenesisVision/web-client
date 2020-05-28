import ImageBaseElement from "components/avatar/image-base.element";
import { DialogTop } from "components/dialog/dialog-top";
import PaperPlan from "media/paper-plane.svg";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "./wallet-withdraw-request.module.scss";

const WalletWithdrawRequest: React.FC = () => {
  const [t] = useTranslation();
  return (
    <DialogTop>
      <div className={styles["dialog-withdraw-request"]}>
        <ImageBaseElement
          className={styles["dialog-withdraw-request__image"]}
          src={PaperPlan}
          alt="Confirm withdrawal"
        />
        <p>{t("wallet-withdraw.withdraw-request")}</p>
      </div>
    </DialogTop>
  );
};

export default React.memo(WalletWithdrawRequest);
