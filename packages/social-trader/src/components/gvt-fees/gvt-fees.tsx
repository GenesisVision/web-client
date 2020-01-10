import "./gvt-fees.scss";

import Dialog from "components/dialog/dialog";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";

const FeesTradingDiscount = dynamic(() =>
  import("routes/ssr/landing-page/components/fees-info/fees-trading-discount")
);

const _GVTFees: React.FC<Props> = ({ open, onClose }) => {
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
