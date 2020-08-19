import { $secondaryColor } from "components/gv-styles/gv-colors/gv-colors";
import { $avatarSize, $smallAvatarSize } from "components/gv-styles/gv-sizes";
import { $boxShadow1 } from "components/gv-styles/gv-style-constants";
import { UserAvatarIcon } from "components/icon/user-avatar-icon";
import { withStyles } from "decorators/withStyles";
import * as React from "react";
import styled, { css } from "styled-components";
import { height, transition, width } from "utils/style/style-mixins";

import ImageBase, { IImageProps } from "../image-base";

interface Props extends IImageProps {
  middle?: boolean;
  big?: boolean;
}

const style = css<Props>`
  ${transition("background-color")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  overflow: hidden;
  background-color: ${$secondaryColor};
  object-fit: cover;
  box-shadow: ${$boxShadow1};
  ${({ big, middle }) => {
    if (big)
      return `
    ${width($avatarSize)}
    ${height($avatarSize)}
    `;
    if (middle)
      return `
    ${width($avatarSize / 1.5)}
    ${height($avatarSize / 1.5)}
    `;
    return `
    ${width($smallAvatarSize)}
    ${height($smallAvatarSize)}
    `;
  }}
`;

const StyledUserIcon = styled(UserAvatarIcon)`
  height: 40%;
`;

const StyledImageBase = styled(ImageBase)`
  width: 100%;
  height: auto;
`;

const _ProfileAvatar: React.FC<Props> = ({ url, alt, className }) => {
  return (
    <div className={className}>
      <StyledImageBase
        src={url}
        alt={alt}
        DefaultImageComponent={StyledUserIcon}
      />
    </div>
  );
};

const ProfileAvatar = withStyles<Props>({ dynamicStyles: style })(
  React.memo(_ProfileAvatar)
);
export default ProfileAvatar;
