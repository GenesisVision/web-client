import "./wallet-settings.scss";

import { GVButton, GVSwitch } from "gv-react-components";
import React from "react";
import GVTFees from "shared/components/gvt-fees/gvt-fees";

const WalletSettings = ({
  isOpenGVTFees,
  isPayFeesWithGvt,
  name,
  label,
  isPending,
  handleOpenGVTFees,
  handleCloseGVTFees,
  handleSwitch
}) => (
  <div className="wallet-settings">
    <GVButton
      variant="text"
      type="button"
      color="secondary"
      className="wallet-settings__question"
      onClick={handleOpenGVTFees}
    >
      ?
    </GVButton>
    <div className="wallet-settings__label">{label}</div>
    <GVSwitch
      className="wallet-settings__switch"
      name={name}
      value={isPayFeesWithGvt}
      disabled={isPending}
      color="primary"
      onChange={handleSwitch}
    />
    <GVTFees open={isOpenGVTFees} onClose={handleCloseGVTFees} />
  </div>
);

export default WalletSettings;
