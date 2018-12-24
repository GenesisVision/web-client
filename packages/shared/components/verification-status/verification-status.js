import "./verification-status.scss";

import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import Chip from "shared/components/chip/chip";

const Status = props => {
  const { t } = props;
  let value = props.checked
    ? t("verification-status.verified")
    : t("verification-status.not-verified");

  let type = props.checked ? "positive" : "negative";

  if (!props.checked) {
    switch (props.verificationStatus) {
      case "Verified":
        value = t("verification-status.verified");
        type = "positive";
        break;
      case "UnderReview":
        value = t("verification-status.under-review");
        type = "warning";
        break;
      case "Rejected":
        value = t("verification-status.rejected");
        type = "negative";
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

const VerificationStatus = translate()(Status);

VerificationStatus.propTypes = {
  checked: PropTypes.bool,
  verificationStatus: PropTypes.oneOf([
    "NotVerified",
    "Verified",
    "UnderReview",
    "Rejected"
  ])
};

VerificationStatus.defaultProps = {
  verificationStatus: "NotVerified"
};

export default VerificationStatus;
