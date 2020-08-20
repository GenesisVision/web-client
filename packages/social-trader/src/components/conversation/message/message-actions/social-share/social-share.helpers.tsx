import SocialLinkImage from "components/avatar/social-link/social-link";
import { RowItem } from "components/row-item/row-item";
import { SocialLinkType, UsersSocialLinkInfo } from "gv-api-web";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from "react-share";
import { safeGetElemFromArray } from "utils/helpers";

import styles from "./social-share.module.scss";

const _EmptySocialShare: React.FC = () => {
  return null;
};
export const EmptySocialShare = React.memo(_EmptySocialShare);

export type SocialShareToComponentType = {
  socialShareType: SocialLinkType;
  Component: React.FC<any>;
};

export const socialShareComponentsMap: SocialShareToComponentType[] = [
  { socialShareType: "Facebook", Component: FacebookShareButton },
  { socialShareType: "Twitter", Component: TwitterShareButton },
  { socialShareType: "LinkedIn", Component: LinkedinShareButton },
  { socialShareType: "Email", Component: EmailShareButton },
  { socialShareType: "Instagram", Component: EmptySocialShare },
  { socialShareType: "Undefined", Component: EmptySocialShare },
  { socialShareType: "Telegram", Component: EmptySocialShare },
  { socialShareType: "Youtube", Component: EmptySocialShare },
  { socialShareType: "WeChat", Component: EmptySocialShare },
  { socialShareType: "Website", Component: EmptySocialShare },
  { socialShareType: "Reddit", Component: EmptySocialShare },
  { socialShareType: "GitHub", Component: EmptySocialShare },
  { socialShareType: "Medium", Component: EmptySocialShare }
];

export const generateSocialShareComponent = (
  { type, logoUrl, name }: UsersSocialLinkInfo,
  componentsMap: SocialShareToComponentType[],
  shareUrl: string
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ socialShareType }) => socialShareType === type
  );
  if (Component === EmptySocialShare) return <></>;
  return (
    <RowItem size={"small"} className={styles["social-share__item"]} key={name}>
      <Component url={shareUrl}>
        <SocialLinkImage url={logoUrl} alt={name} />
      </Component>
    </RowItem>
  );
};
