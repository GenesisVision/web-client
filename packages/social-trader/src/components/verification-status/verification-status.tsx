import Chip, { CHIP_TYPE } from "components/chip/chip";
import { ClockIcon } from "components/icon/clock-icon";
import { ErrorIcon } from "components/icon/error-icon";
import { OkIcon } from "components/icon/ok-icon";
import { UserVerificationStatus } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export enum VERIFICATION_STATUS {
  NOT_VERIFIED = "NotVerified",
  VERIFIED = "Verified",
  UNDER_REVIEW = "UnderReview",
  REJECTERD = "Rejected"
}

export interface IStatusProps {
  checked?: boolean;
  verificationStatus?: UserVerificationStatus;
}

const IconContainer = styled.div`
  width: 15px;
  height: 15px;
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  &:before {
    margin-right: 5px;
    height: 10px;
    overflow: hidden;
    line-height: 8px;
  }
`;

const _VerificationStatus: React.FC<IStatusProps> = ({
  checked,
  verificationStatus = VERIFICATION_STATUS.NOT_VERIFIED
}) => {
  const [t] = useTranslation();
  let Icon, type, value;
  if (checked) {
    Icon = OkIcon;
    type = CHIP_TYPE.POSITIVE;
    value = t("profile-page:verification-status.verified");
  } else {
    switch (verificationStatus) {
      case VERIFICATION_STATUS.VERIFIED:
        Icon = OkIcon;
        value = t("profile-page:verification-status.verified");
        type = CHIP_TYPE.POSITIVE;
        break;
      case VERIFICATION_STATUS.UNDER_REVIEW:
        Icon = ClockIcon;
        value = t("profile-page:verification-status.under-review");
        type = CHIP_TYPE.WARNING;
        break;
      case VERIFICATION_STATUS.REJECTERD:
        Icon = ErrorIcon;
        value = t("profile-page:verification-status.rejected");
        type = CHIP_TYPE.NEGATIVE;
        break;
      default:
        Icon = ErrorIcon;
        value = t("profile-page:verification-status.not-verified");
        type = CHIP_TYPE.NEGATIVE;
    }
  }

  return (
    <Container>
      <Chip type={type}>
        <IconContainer>
          <Icon />
        </IconContainer>
        {value}
      </Chip>
    </Container>
  );
};

const VerificationStatus = React.memo(_VerificationStatus);
export default VerificationStatus;
