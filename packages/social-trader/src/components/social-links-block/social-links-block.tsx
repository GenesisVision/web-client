import "./social-links-block.scss";

import SocialLinkImage from "components/avatar/social-link/social-link";
import { SocialLinkViewModel } from "gv-api-web";
import { useAmp } from "next/amp";
import Head from "next/head";
import * as React from "react";

const _SocialLinksBlock: React.FC<Props> = ({ socialLinks }) => {
  const isAmp = useAmp();
  return (
    <div className="social-links-block">
      {isAmp && (
        <Head>
          <style amp-custom={true}>
            {`
            .social-links-block__social-link {
              margin-right: 10px;
            }
          `}
          </style>
        </Head>
      )}
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
