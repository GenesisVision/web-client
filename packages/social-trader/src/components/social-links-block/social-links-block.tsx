import "./social-links-block.scss";

import SocialLinkImage from "components/avatar/social-link/social-link";
import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";

const _SocialLinksBlock: React.FC<Props> = ({ socialLinks }) => {
  return (
    <div className="social-links-block">
      {socialLinks.map(socialLink => {
        const value = "value" in socialLink ? socialLink.value : 0;
        return (
          <a
            title={socialLink.name}
            key={socialLink.type}
            href={socialLink.url + value}
            target="_blank"
            rel="noopener noreferrer"
            className="social-links-block__social-link"
          >
            <SocialLinkImage url={socialLink.logo} alt={socialLink.name} />
          </a>
        );
      })}
    </div>
  );
};

const SocialLinksBlock = React.memo(_SocialLinksBlock);
export default SocialLinksBlock;

interface Props {
  socialLinks: Array<SocialLinkViewModel>;
}
