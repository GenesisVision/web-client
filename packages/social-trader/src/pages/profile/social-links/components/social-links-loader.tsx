import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

const SocialLinkLoader: React.FC = () => (
  <SvgLoader height={80} width={300}>
    <rect x="50" y="5" rx="3" ry="3" width="80" height="10" />
    <rect x="50" y="25" rx="3" ry="3" width="220" height="25" />
    <circle cx="15" cy="30" r="15" />
  </SvgLoader>
);

const SocialLinksLoader: React.FC = () => (
  <div className="social-links-loader">
    <SocialLinkLoader />
    <SocialLinkLoader />
    <SocialLinkLoader />
    <SocialLinkLoader />
    <SocialLinkLoader />
    <SocialLinkLoader />
  </div>
);

export default React.memo(SocialLinksLoader);
