import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import ImageBase from "components/avatar/image-base";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Crashable from "decorators/crashable";
import { AssetDetails } from "gv-api-web";
import SocialLink from "media/social-link.svg";
import React from "react";
import styled, { css } from "styled-components";
import { getAssetLink } from "utils/compose-url";
import { $panelBackgroundColor } from "utils/style/colors";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { adaptiveMargin, height, lineHeight, width } from "utils/style/mixins";
import { $dividerText, $smallAvatarSize } from "utils/style/sizes";

interface Props {
  assetDetails: AssetDetails;
  icon: string;
  withAsset?: boolean;
}
const $typeSize = 18;
const $transitionSize = $typeSize / $dividerText;

const Container = styled.div<{ withAsset?: boolean }>`
  position: relative;
  ${({ withAsset }) => {
    if (withAsset)
      return `
      width: ${$smallAvatarSize}px;
      height: ${$smallAvatarSize}px;
    `;
  }};
`;

const photoStyle = css`
  display: block;
  ${adaptiveMargin("right", $transitionSize)};
  box-sizing: border-box;
  ${height(32)};
  ${width(32)};
  border: solid 2px ${$panelBackgroundColor};
  border-radius: 50%;
  background-color: #27323a;
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
  ${lineHeight(28)};
  text-align: center;
  overflow: hidden;
`;

const StyledLink = styled(Link)`
  ${photoStyle}
`;

const PhotoContainer = styled.div`
  ${photoStyle}
`;

const Type = styled.div<{ withAsset?: boolean }>`
  box-sizing: border-box;
  border-radius: 50%;
  text-align: center;
  & img {
    ${height(28)};
    ${width(28)};
  }
  ${({ withAsset }) => {
    if (withAsset)
      return `
      position: absolute;
      top: ${$transitionSize}px;
      left: ${$transitionSize}px;
      z-index: 1;
      ${mediaBreakpointLandscapePhone(`
        top: ${$typeSize}px;
        left: ${$typeSize}px;
      `)}
    `;
  }};
`;

const _PortfolioEventLogo: React.FC<Props> = ({
  withAsset = true,
  assetDetails,
  icon
}) => {
  const { contextTitle } = useToLink();
  const to = getAssetLink(
    assetDetails.url,
    assetDetails.assetType,
    contextTitle
  );
  const renderAvatar = () => (
    <AssetAvatar
      size={"full"}
      url={assetDetails.logoUrl}
      alt={assetDetails.title}
      color={assetDetails.color}
    />
  );
  return (
    <Container withAsset={!!icon && withAsset}>
      {withAsset &&
        ((assetDetails.url && (
          <StyledLink to={to}>{renderAvatar()}</StyledLink>
        )) || <PhotoContainer>{renderAvatar()}</PhotoContainer>)}
      {icon && (
        <Type withAsset={withAsset}>
          <ImageBase src={icon} alt={"event logo"} defaultImage={SocialLink} />
        </Type>
      )}
    </Container>
  );
};

const PortfolioEventLogo = React.memo(Crashable(_PortfolioEventLogo));
export default PortfolioEventLogo;
