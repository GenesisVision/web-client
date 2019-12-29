import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

const SocialLinksBlockLoader = React.memo(() => (
  <div className="social-links-block">
    <SvgLoader height={35} width={200}>
      <circle cx="16" cy="16" r="16" />
      <circle cx="58" cy="16" r="16" />
      <circle cx="100" cy="16" r="16" />
      <circle cx="142" cy="16" r="16" />
      <circle cx="184" cy="16" r="16" />
    </SvgLoader>
  </div>
));

export default SocialLinksBlockLoader;
