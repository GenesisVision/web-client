import styled from "styled-components";
import {
  $backgroundColor,
  $secondaryBackgroundColor
} from "utils/style/colors";
import { adaptivePadding } from "utils/style/mixins";
import { $paddingUpperMedium, $paddingXxsmall } from "utils/style/sizes";

export const GoogleAuthStepContainer = styled.div<{
  altColor?: boolean;
  mobile?: boolean;
}>`
  box-sizing: border-box;
  flex: 1 0 ${({ mobile }) => (mobile ? "320px" : "280px")};
  width: ${({ mobile }) => (mobile ? "320px" : "280px")};
  padding: 29px 28px ${({ mobile }) => (mobile ? "30px" : "50px")};
  ${({ altColor }) =>
    altColor && `background-color: ${$secondaryBackgroundColor};`};
`;

export const GoogleAuthStepCount = styled.div`
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.6px;
  margin-bottom: 10px;
`;

export const GoogleAuthStepTitle = styled.div`
  letter-spacing: 0.1px;
  margin-bottom: ${$paddingUpperMedium}px;
`;

export const GoogleAuthStepQR = styled.div`
  margin-bottom: 40px;
`;

export const GoogleAuthStepText = styled.p`
  font-size: 14px;
  letter-spacing: 0.4px;
  opacity: 0.5;
  margin-bottom: 27px;
`;

export const GoogleAuthStepAltCode = styled.div`
  ${adaptivePadding("bottom", $paddingXxsmall)};
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.7px;
`;

export const GoogleAuthStepLink = styled.a`
  display: inline-flex;
  margin-bottom: 25px;
`;

export const GoogleAuthStyledContainer = styled.div<{ desktop?: boolean }>`
  background-color: ${$backgroundColor};
  ${({ desktop }) => desktop && "width: 895px; max-width: 895px;"};
`;

export const GoogleAuthHeader = styled.div`
  padding: 50px 30px 0;
`;

export const GoogleAuthSteps = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

export const GoogleAuthButtons = styled.div`
  margin-bottom: 20px;
`;
