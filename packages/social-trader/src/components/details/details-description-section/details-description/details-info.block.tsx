import "./details-description.scss";

import { ToType } from "components/link/link";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";

import { DetailsManager } from "./details-manager.block";
import { DetailsStrategy } from "./details-strategy.block";

const _DetailsInfo: React.FC<Props> = ({
  title,
  to,
  username,
  socialLinks,
  description,
  children
}) => {
  return (
    <div className="asset-details-description__info">
      <h1 className="title-small-padding">{title}</h1>
      {to && username && <DetailsManager to={to} username={username} />}
      {socialLinks && <SocialLinksBlock socialLinks={socialLinks} />}
      {children}
      {description && <DetailsStrategy description={description} />}
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  to?: ToType;
  username?: string;
  socialLinks?: SocialLinkViewModel[];
  description?: string;
}

export const DetailsInfo = React.memo(_DetailsInfo);
