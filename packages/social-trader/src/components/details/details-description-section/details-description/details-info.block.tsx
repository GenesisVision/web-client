import "./details-description.scss";

import { ToType } from "components/link/link";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";

import { DetailsStrategy } from "./details-strategy.block";
import { DetailsSubtitle } from "./details-subtitle.block";

const _DetailsInfo: React.FC<Props> = ({
  title,
  subtitleUrl,
  subtitle,
  socialLinks,
  description,
  children
}) => {
  return (
    <div className="details-description__info">
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
  subtitleUrl?: ToType;
  subtitle?: string;
  socialLinks?: SocialLinkViewModel[];
  description?: string;
}

export const DetailsInfo = React.memo(_DetailsInfo);
