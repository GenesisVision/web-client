import Dialog from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "./gvt-fees.module.scss";

const FeesTradingDiscount = dynamic(() =>
  import("pages/landing-page/components/fees-info/fees-trading-discount")
);

const _GVTFees: React.FC<Props> = ({ open, onClose }) => {
  const [t] = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} className={styles["gvt-fees"]}>
      <DialogTop title={t("gvt-fees.titles.main")} />
      <DialogBottom className={styles["gvt-fees__container"]}>
        <FeesTradingDiscount dark />
      </DialogBottom>
    </Dialog>
  );
};

interface Props {
  open: boolean;
  onClose(): void;
}
const GVTFees = React.memo(_GVTFees);
export default GVTFees;
