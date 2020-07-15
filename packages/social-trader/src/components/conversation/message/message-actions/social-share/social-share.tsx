import { Row } from "components/row/row";
import { useLocation } from "hooks/location";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socialLinkTypesSelector } from "reducers/platform-reducer";
import { composePostDetailsUrl } from "routes/social.routes";

import {
  generateSocialShareComponent,
  socialShareComponentsMap
} from "./social-share.helpers";

interface Props {
  url: string;
}

const _SocialShare: React.FC<Props> = ({ url }) => {
  const socialLinkTypes = useSelector(socialLinkTypesSelector);
  const { location } = useLocation();

  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    if (location) setShareUrl(location.origin + composePostDetailsUrl(url));
  }, [location]);

  return (
    <Row wrap>
      {socialLinkTypes.map(socialLink =>
        generateSocialShareComponent(
          socialLink,
          socialShareComponentsMap,
          shareUrl
        )
      )}
    </Row>
  );
};

export const SocialShare = React.memo(_SocialShare);
