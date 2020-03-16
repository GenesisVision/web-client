import { ToType } from "components/link/link";
import { Row } from "components/row/row";
import SocialLinksBlock from "components/social-links-block/social-links-block";
import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";

import { DetailsStrategy } from "./details-strategy.block";
import { DetailsSubtitle } from "./details-subtitle.block";

const _DetailsInfo: React.FC<Props> = ({
  descriptionTitle,
  title,
  subtitleUrl,
  subtitle,
  socialLinks,
  description,
  children
}) => {
  return (
    <div className="details-description__info">
      <h1 className="details-description__heading">{title}</h1>
      {subtitle && (
        <Row>
          <DetailsSubtitle to={subtitleUrl} text={subtitle} />
        </Row>
      )}
      {socialLinks && (
        <Row>
          <SocialLinksBlock socialLinks={socialLinks} />
        </Row>
      )}
      {children && (
        <div className="details-description__info-block">{children}</div>
      )}
      {description && (
        <DetailsStrategy title={descriptionTitle} description={description} />
      )}
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  descriptionTitle?: string;
  title: string;
  subtitleUrl?: ToType;
  subtitle?: string;
  socialLinks?: SocialLinkViewModel[];
  description?: string;
}

export const DetailsInfo = React.memo(_DetailsInfo);
