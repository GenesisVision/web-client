import "./gvt-fees.scss";

import Dialog from "components/dialog/dialog";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { FeesTradingDiscount } from "routes/ssr/landing-page/components/fees-info/fees-trading";

const _GVTFees: React.FC<Props> = ({ open, onClose }) => {
  const [t] = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} className="gvt-fees">
      <div className="gvt-fees__container">
        <FeesTradingDiscount dark />
      </div>
    </Dialog>
  );
};

interface Props {
  open: boolean;
  onClose(): void;
}
const GVTFees = React.memo(_GVTFees);
export default GVTFees;
