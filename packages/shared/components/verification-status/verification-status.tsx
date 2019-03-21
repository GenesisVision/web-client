import "./verification-status.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";

export enum VERIFICATION_STATUS {
  NOT_VERIFED = "NotVerified",
  VERIFED = "Verified",
  UNDER_REVIEW = "UnderReview",
  REJECTERD = "Rejected"
}

interface IStatusProps {
  checked: boolean;
  verificationStatus: VERIFICATION_STATUS;
}

const VerificationStatus: React.FC<IStatusProps & InjectedTranslateProps> = ({
  t,
  checked,
  verificationStatus = VERIFICATION_STATUS.NOT_VERIFED
}) => {
  let type, value;
  if (checked) {
    type = CHIP_TYPE.POSITIVE;
    value = t("verification-status.verified");
  } else {
    switch (verificationStatus) {
      case "Verified":
        value = t("verification-status.verified");
        type = CHIP_TYPE.POSITIVE;
        break;
      case "UnderReview":
        value = t("verification-status.under-review");
        type = CHIP_TYPE.WARNING;
        break;
      case "Rejected":
        value = t("verification-status.rejected");
        type = CHIP_TYPE.NEGATIVE;
        break;
      default:
        value = t("verification-status.not-verified");
    }
  }

  return (
    <Chip type={type} className={`verification verification--${type}`}>
      {value}
    </Chip>
  );
};

export default translate()(VerificationStatus);
