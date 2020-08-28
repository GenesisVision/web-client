import SocialLink from "media/social-link.svg";
import * as React from "react";
import styled from "styled-components";

import ImageBase, { IImageProps } from "../image-base";

const StyledImageBase = styled(ImageBase)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const _SocialLinkImage: React.FC<IImageProps> = ({ url, alt }) => (
  <StyledImageBase src={url} alt={alt} defaultImage={SocialLink} />
);

const SocialLinkImage = React.memo(_SocialLinkImage);
export default SocialLinkImage;
