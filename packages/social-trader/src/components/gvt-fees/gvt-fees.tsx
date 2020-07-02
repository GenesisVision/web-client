import Dialog from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import { Row } from "components/row/row";
import {
  FeesTradingDiscountInfo,
  FeesTradingDiscountTable
} from "pages/landing-page/components/fees-info/fees-trading-discount";
import * as React from "react";
import { useTranslation } from "react-i18next";

import styles from "./gvt-fees.module.scss";

const _GVTFees: React.FC<Props> = ({ open, onClose }) => {
  const [t] = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} className={styles["gvt-fees"]}>
      <DialogTop title={t("labels.gvt-fees-title")} />
      <DialogBottom className={styles["gvt-fees__container"]}>
        <Row wide>
          <FeesTradingDiscountInfo withoutOffset dark />
        </Row>
        <Row wide size={"large"} onlyOffset>
          <FeesTradingDiscountTable withoutOffset dark />
        </Row>
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
